import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | PulseTix",
  description: "PulseTix terms of use.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
