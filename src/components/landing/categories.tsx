import Image from "next/image";
import Link from "next/link";

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
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[3px] text-accent mb-3">Explore</p>
          <h2 className="text-3xl sm:text-4xl font-black">
            Find Your <span className="gradient-text">Scene</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-black text-sm tracking-[2px] mb-0.5">{cat.name}</h3>
                <p className="text-[11px] text-text-dim group-hover:text-text/70 transition-colors">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
