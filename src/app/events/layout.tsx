import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Events | PulseTix",
  description: "Discover the hottest parties and events across NYC. Music, nightlife, art, comedy and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
