import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | PulseTix",
  description: "Manage your PulseTix account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
