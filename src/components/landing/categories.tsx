"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-reveal";

const categories = [
  {
    name: "NIGHTLIFE",
    desc: "After-hours & underground",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    href: "/events?category=nightlife",
    accent: "from-purple-500 to-indigo-600",
  },
  {
    name: "MUSIC",
    desc: "Live shows & DJ sets",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    href: "/events?category=music",
    accent: "from-pink-500 to-rose-600",
  },
  {
    name: "FITNESS",
    desc: "Yoga, runs & wellness",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    href: "/events?category=fitness",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    name: "FOOD & DRINK",
    desc: "Markets, tastings & dinners",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    href: "/events?category=food_drink",
    accent: "from-amber-500 to-orange-600",
  },
  {
    name: "CONNECTIONS",
    desc: "Socials & meetups",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=600&q=80",
    href: "/events?category=connections",
    accent: "from-cyan-500 to-blue-600",
  },
  {
    name: "COMEDY",
    desc: "Stand-up & improv",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80",
    href: "/events?category=comedy",
    accent: "from-yellow-500 to-amber-600",
  },
];

export function Categories() {
  return (
    <section className="px-6 py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-4">Explore</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Find Your <span className="accent-text">Scene</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <StaggerItem key={cat.name}>
              <Link
                href={cat.href}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-2 block"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 saturate-[1.2]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                {/* Glow line on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-sm tracking-[3px] mb-1">{cat.name}</h3>
                  <p className="text-[11px] text-text-dim group-hover:text-white/70 transition-colors">{cat.desc}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
