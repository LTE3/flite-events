import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | PulseTix",
  description: "Manage events, tickets, promoters, and door operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
