-- PulseTix Database Migration
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'promoter', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- 2. EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  time TIME NOT NULL,
  end_time TIME,
  venue TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'New York',
  borough TEXT,
  image_url TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,  -- in cents
  tickets_total INTEGER NOT NULL DEFAULT 100,
  tickets_left INTEGER NOT NULL DEFAULT 100,
  category TEXT NOT NULL DEFAULT 'music' CHECK (category IN ('music', 'nightlife', 'fitness', 'food_drink', 'connections', 'art', 'comedy')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold_out', 'cancelled', 'past')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-generate slug from title
CREATE OR REPLACE FUNCTION generate_event_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := LOWER(REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
    NEW.slug := TRIM(BOTH '-' FROM NEW.slug);
    -- Append random suffix to avoid collisions
    NEW.slug := NEW.slug || '-' || SUBSTRING(gen_random_uuid()::text, 1, 6);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_event_slug ON events;
CREATE TRIGGER set_event_slug
  BEFORE INSERT ON events
  FOR EACH ROW EXECUTE FUNCTION generate_event_slug();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_event_updated_at ON events;
CREATE TRIGGER set_event_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 3. TICKETS
-- ============================================================
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  email TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  qr_code TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled', 'refunded')),
  stripe_session_id TEXT,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  checked_in_at TIMESTAMPTZ
);

-- Decrement tickets_left when ticket is created
CREATE OR REPLACE FUNCTION decrement_tickets_left()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET tickets_left = tickets_left - NEW.quantity
  WHERE id = NEW.event_id AND tickets_left >= NEW.quantity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Not enough tickets available';
  END IF;

  -- Auto mark as sold_out
  UPDATE events SET status = 'sold_out'
  WHERE id = NEW.event_id AND tickets_left = 0 AND status = 'published';

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_ticket_created ON tickets;
CREATE TRIGGER on_ticket_created
  AFTER INSERT ON tickets
  FOR EACH ROW EXECUTE FUNCTION decrement_tickets_left();

-- ============================================================
-- 4. PROMOTERS
-- ============================================================
CREATE TABLE IF NOT EXISTS promoters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0.1500,
  parent_promoter_id UUID REFERENCES promoters(id),
  total_sales INTEGER NOT NULL DEFAULT 0,
  total_earned NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  stripe_account_id TEXT,
  stripe_onboarded BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 5. PROMOTER_SALES
-- ============================================================
CREATE TABLE IF NOT EXISTS promoter_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id UUID NOT NULL REFERENCES promoters(id) ON DELETE CASCADE,
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  commission_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  tier INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 6. CONTACT_MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE promoters ENABLE ROW LEVEL SECURITY;
ALTER TABLE promoter_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- EVENTS (public read, admin write)
CREATE POLICY "Anyone can read published events" ON events
  FOR SELECT USING (status = 'published' OR status = 'sold_out');
CREATE POLICY "Admins can do anything with events" ON events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- TICKETS
CREATE POLICY "Users can read own tickets" ON tickets
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can read all tickets" ON tickets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Service role can insert tickets" ON tickets
  FOR INSERT WITH CHECK (true);  -- webhook uses service role key

-- PROMOTERS
CREATE POLICY "Promoters can read own record" ON promoters
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can manage promoters" ON promoters
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Anyone can insert promoter application" ON promoters
  FOR INSERT WITH CHECK (true);

-- PROMOTER_SALES
CREATE POLICY "Promoters can read own sales" ON promoter_sales
  FOR SELECT USING (
    promoter_id IN (SELECT id FROM promoters WHERE user_id = auth.uid())
  );
CREATE POLICY "Admins can manage promoter sales" ON promoter_sales
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- CONTACT_MESSAGES (anyone can insert, only admins read)
CREATE POLICY "Anyone can submit contact form" ON contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 8. INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_qr_code ON tickets(qr_code);
CREATE INDEX IF NOT EXISTS idx_promoters_code ON promoters(code);
CREATE INDEX IF NOT EXISTS idx_promoters_user_id ON promoters(user_id);
CREATE INDEX IF NOT EXISTS idx_promoter_sales_promoter_id ON promoter_sales(promoter_id);

-- ============================================================
-- 9. SEED DATA (sample events)
-- ============================================================
INSERT INTO events (title, slug, description, date, time, end_time, venue, address, city, borough, image_url, price, tickets_total, tickets_left, category, featured, status) VALUES
('Neon Nights: Rooftop DJ Set', 'neon-nights-rooftop-dj-set', 'Experience an unforgettable night under the stars with NYC''s top DJs spinning house, techno, and everything in between. Rooftop views, premium cocktails, and vibes all night long.', '2026-04-18', '22:00', '04:00', 'Skyline Terrace', '123 Rooftop Ave', 'New York', 'Brooklyn', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 2500, 200, 152, 'music', TRUE, 'published'),
('Sunrise Yoga in the Park', 'sunrise-yoga-park', 'Start your morning right with a guided yoga flow in Prospect Park. All levels welcome. Bring your own mat.', '2026-04-18', '07:00', '08:30', 'Prospect Park', 'Grand Army Plaza', 'New York', 'Brooklyn', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80', 0, 80, 48, 'fitness', FALSE, 'published'),
('AFTER: Underground House Party', 'after-underground-house-party', 'The legendary AFTER series returns. Deep house, minimal techno, and an intimate warehouse setting. Limited capacity.', '2026-04-18', '23:00', '06:00', 'The Lot Radio', '17 Nassau Ave', 'New York', 'Williamsburg', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80', 1500, 150, 30, 'nightlife', TRUE, 'published'),
('Street Food Night Market', 'street-food-night-market', 'Over 30 food vendors from around the world. Live music, craft cocktails, and the best street food in Brooklyn.', '2026-04-18', '18:00', '23:00', 'Smorgasburg', '90 Kent Ave', 'New York', 'Downtown BK', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', 0, 500, 415, 'food_drink', FALSE, 'published'),
('Sip & Sketch: Social Drawing Night', 'sip-sketch-social-drawing', 'Grab a drink, meet new people, and unleash your inner artist. All materials provided. No experience needed.', '2026-04-18', '20:00', '22:30', 'Kinfolk Studios', '94 Wythe Ave', 'New York', 'Bushwick', 'https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&q=80', 2000, 40, 16, 'connections', FALSE, 'published'),
('Late Night Stand-Up Showcase', 'late-night-standup-showcase', 'The best up-and-coming comedians in NYC. Uncensored, unfiltered, and guaranteed laughs.', '2026-04-18', '21:00', '23:00', 'Union Hall', '702 Union St', 'New York', 'Park Slope', 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80', 1200, 120, 53, 'comedy', FALSE, 'published'),
('Warehouse Rave: Techno Edition', 'warehouse-rave-techno', 'Three rooms. Six DJs. One legendary night. The warehouse rave series that NYC can''t stop talking about.', '2026-04-19', '21:00', '06:00', 'Avant Gardner', '140 Stewart Ave', 'New York', 'East Williamsburg', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', 3500, 800, 12, 'nightlife', TRUE, 'published'),
('R&B Vibes: Live Band Night', 'rnb-vibes-live-band', 'Smooth vocals, live instrumentation, and the best R&B classics reimagined. Dress code: fly.', '2026-04-19', '20:00', '01:00', 'Brooklyn Steel', '319 Frost St', 'New York', 'Williamsburg', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80', 3000, 600, 8, 'music', TRUE, 'published'),
('Day Party: Afrobeats Edition', 'day-party-afrobeats', 'The ultimate daytime celebration. Afrobeats, amapiano, and dancehall. Outdoor patio with full bar.', '2026-04-20', '14:00', '22:00', 'Elsewhere', '599 Johnson Ave', 'New York', 'Bushwick', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80', 2000, 400, 5, 'music', TRUE, 'published');
