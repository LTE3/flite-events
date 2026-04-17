import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Door Check-In | PulseTix",
  description: "Scan QR codes and manage guest list check-ins.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
