import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | PulseTix",
  description: "Complete your ticket purchase securely.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
