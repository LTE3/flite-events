import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tickets | PulseTix",
  description: "View your purchased tickets and QR codes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
