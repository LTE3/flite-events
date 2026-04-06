import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AIChatbot } from "@/components/chat/ai-chatbot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PulseTix — NYC's Premier Nightlife Experience",
  description:
    "Discover the hottest parties and exclusive events across NYC. Get instant access with secure QR code tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
