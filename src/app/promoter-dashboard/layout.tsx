import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promoter Dashboard | PulseTix",
  description: "Track your sales, earnings, and referral performance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
