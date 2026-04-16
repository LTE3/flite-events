export type UserRole = "user" | "promoter" | "admin";
export type EventStatus = "draft" | "published" | "sold_out" | "cancelled" | "past";
export type TicketStatus = "valid" | "used" | "cancelled" | "refunded";
export type PromoterStatus = "pending" | "active" | "suspended";
export type Category = "music" | "nightlife" | "fitness" | "food_drink" | "connections" | "art" | "comedy";

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  end_time?: string;
  venue: string;
  address: string;
  city: string;
  borough?: string;
  image_url: string;
  price: number;
  tickets_total: number;
  tickets_left: number;
  category: Category;
  featured: boolean;
  status: EventStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
  tiers?: TicketTier[];
}

export interface Ticket {
  id: string;
  event_id: string;
  user_id: string;
  email: string;
  quantity: number;
  qr_code: string;
  status: TicketStatus;
  tier_id?: string;
  tier_name?: string;
  stripe_session_id?: string;
  purchased_at: string;
  checked_in_at?: string;
  event?: Event;
}

export interface TicketTier {
  id: string;
  event_id: string;
  name: string;
  price: number;       // in cents
  quantity: number;
  sold: number;
  sort_order: number;
}

export interface GuestListEntry {
  id: string;
  event_id: string;
  name: string;
  plus_ones: number;
  note?: string;
  checked_in: boolean;
  checked_in_at?: string;
  created_at: string;
}

export interface Promoter {
  id: string;
  user_id: string;
  code: string;
  commission_rate: number;
  parent_promoter_id?: string;
  total_sales: number;
  total_earned: number;
  status: PromoterStatus;
  stripe_account_id?: string;
  stripe_onboarded: boolean;
}
