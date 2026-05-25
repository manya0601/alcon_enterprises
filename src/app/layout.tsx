import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alcon Enterprise — Buy, Rent & Sell Printers | Ahmedabad",
    template: "%s | Alcon Enterprise",
  },
  description:
    "India's trusted printer & enterprise hardware solutions platform. Buy, rent, or sell printers. Cartridge subscriptions, repairs, and corporate solutions since 1999.",
  keywords: [
    "printer rental Ahmedabad",
    "printer cartridge subscription India",
    "office printer rental",
    "buy printer cartridges",
    "printer repair Ahmedabad",
    "enterprise printer solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://alconenterprise.com",
    siteName: "Alcon Enterprise",
    title: "Alcon Enterprise — India's Trusted Printer Solutions",
    description: "Buy, rent, or sell printers with enterprise support since 1999.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
