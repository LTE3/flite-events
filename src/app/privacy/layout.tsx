import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | PulseTix",
  description: "PulseTix privacy policy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
