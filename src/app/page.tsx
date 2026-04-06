import Link from "next/link";
import { Search, Ticket, QrCode, ScanLine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import { sampleEvents } from "@/lib/sample-events";

const categories = ["All", "Music", "Nightlife", "Fitness", "Food & Drink", "Connections", "Art", "Comedy"];

const steps = [
  { icon: Search, title: "Browse Events", desc: "Discover the hottest parties and exclusive events across NYC." },
  { icon: Ticket, title: "Get Tickets", desc: "Select your event and purchase securely through our platform." },
  { icon: QrCode, title: "Receive QR Code", desc: "Instant email delivery with your unique QR code ticket." },
  { icon: ScanLine, title: "Scan & Enter", desc: "Present your QR code at the door for instant verification." },
];

export default function Home() {
  const featured = sampleEvents.filter((e) => e.featured);
  const weekend = sampleEvents.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative px-6 pt-24 pb-16 text-center overflow-hidden">
        <div className="absolute top-[-100px] left-[-80px] w-72 h-72 rounded-full bg-accent/30 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-80px] w-72 h-72 rounded-full bg-accent-2/30 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4">
            Experience The{" "}
            <span className="gradient-text">Nightlife</span>
          </h1>
          <p className="text-lg text-text-dim mb-9 max-w-xl mx-auto">
            Get instant access to the hottest clubs, rooftop parties, and underground events across Manhattan, Brooklyn, and Queens.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-bg-elevated border border-white/10 rounded-full px-5 py-1.5 max-w-xl mx-auto focus-within:border-accent transition-colors">
            <Search size={20} className="text-text-dim shrink-0" />
            <input
              type="text"
              placeholder="Search events, venues, artists..."
              className="flex-1 bg-transparent border-none outline-none text-text text-sm px-3 py-2.5 placeholder:text-[#555]"
            />
            <Button size="sm">Search</Button>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="px-6 pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  i === 0
                    ? "bg-text text-bg border-text"
                    : "bg-bg-elevated text-text-dim border-white/[0.08] hover:text-text hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* This Weekend */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-7 flex-wrap">
            <h2 className="text-2xl font-extrabold">This Weekend</h2>
            <div className="flex gap-1">
              {["Friday", "Saturday", "Sunday"].map((day, i) => (
                <button
                  key={day}
                  className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    i === 0
                      ? "bg-text text-bg border-text"
                      : "border-white/[0.12] text-text-dim hover:text-text hover:border-white/25"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <Link href="/events" className="ml-auto text-accent text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekend.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-7 flex-wrap">
            <h2 className="text-2xl font-extrabold">Trending Near You</h2>
            <Link href="/events" className="ml-auto text-accent text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-black">
                  {i + 1}
                </div>
                <step.icon size={28} className="mx-auto mb-3 text-accent" />
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-text-dim">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-10 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-bg-elevated border border-white/[0.06] rounded-3xl p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(108,99,255,0.15),transparent_60%),radial-gradient(ellipse_at_70%_50%,rgba(0,229,160,0.15),transparent_60%)] pointer-events-none" />
            <h2 className="relative text-3xl sm:text-4xl font-black leading-tight mb-4">
              Build community.
              <br />
              <span className="gradient-text">Not a guest list.</span>
            </h2>
            <p className="relative text-text-dim text-lg max-w-md mx-auto mb-7">
              Host your next event on PulseTix and reach thousands of locals looking for their next experience.
            </p>
            <Link href="/admin/create-event">
              <Button size="lg" className="relative">Start Hosting</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
