import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | PulseTix",
  description: "Get in touch with the PulseTix team.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
