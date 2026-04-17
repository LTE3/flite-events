"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const categories = [
  {
    name: "NIGHTLIFE",
    desc: "After-hours & underground",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    href: "/events?category=nightlife",
  },
  {
    name: "MUSIC",
    desc: "Live shows & DJ sets",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    href: "/events?category=music",
  },
  {
    name: "FITNESS",
    desc: "Yoga, runs & wellness",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    href: "/events?category=fitness",
  },
  {
    name: "FOOD & DRINK",
    desc: "Markets, tastings & dinners",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    href: "/events?category=food_drink",
  },
  {
    name: "CONNECTIONS",
    desc: "Socials & meetups",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=600&q=80",
    href: "/events?category=connections",
  },
  {
    name: "COMEDY",
    desc: "Stand-up & improv",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80",
    href: "/events?category=comedy",
  },
];

export function Categories() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16">
        <ScrollReveal>
          <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-4">Explore</p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-extrabold tracking-tight">
            Find Your Scene
          </h2>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pr-6 scroll-smooth">
          {/* Left padding spacer to align with max-w-7xl container */}
          <div className="flex-shrink-0 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]" aria-hidden />

          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex-shrink-0 w-[280px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.15] transition-all duration-500 snap-start block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05] saturate-[1.1]"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Thin accent line that fades in on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-[2px] mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/50">{cat.desc}</p>
              </div>
            </Link>
          ))}

          {/* Right padding spacer */}
          <div className="flex-shrink-0 pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]" aria-hidden />
        </div>
      </ScrollReveal>
    </section>
  );
}
