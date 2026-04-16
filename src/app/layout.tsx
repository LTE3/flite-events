import type { Metadata } from "next";
import { Albert_Sans, Bricolage_Grotesque } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AIChatbot } from "@/components/chat/ai-chatbot";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${albertSans.variable} ${bricolage.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <AIChatbot />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
