import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Consent | PulseTix",
  description: "PulseTix SMS consent and communication preferences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
