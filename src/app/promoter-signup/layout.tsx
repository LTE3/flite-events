import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Promoter | PulseTix",
  description: "Join the PulseTix promoter network and earn commission on every ticket sold.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
