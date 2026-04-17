import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PulseTix",
  description: "Sign in or create your PulseTix account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
