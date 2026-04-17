"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const categories = [
  {
    name: "Nightlife",
    tag: "AFTER DARK",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    href: "/events?category=nightlife",
  },
  {
    name: "Music",
    tag: "LIVE & DJ",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    href: "/events?category=music",
  },
  {
    name: "Food & Drink",
    tag: "TASTE",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    href: "/events?category=food_drink",
  },
  {
    name: "Fitness",
    tag: "MOVE",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    href: "/events?category=fitness",
  },
  {
    name: "Comedy",
    tag: "LAUGH",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
    href: "/events?category=comedy",
  },
  {
    name: "Connections",
    tag: "MEET",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=800&q=80",
    href: "/events?category=connections",
  },
];

export function Categories() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 relative">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[4px] text-accent mb-3">Explore</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em]">
              Find Your Scene
            </h2>
          </div>
        </ScrollReveal>

        {/* 2-col grid on desktop, 1 col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 0.06}>
              <Link
                href={cat.href}
                className="group relative block aspect-[16/10] rounded-xl overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                  <div className="flex items-end justify-between w-full">
                    <div>
                      <span className="block text-[10px] font-bold tracking-[3px] text-accent/80 mb-1">
                        {cat.tag}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight">
                        {cat.name}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
