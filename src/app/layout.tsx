import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { ToastProvider } from "@/components/ui/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "HPCS — Pièces d'origine pour voitures chinoises au Maroc | Chery Geely Haval MG BYD",
    template: "%s | HPCS",
  },
  description: "HPCS : pièces automobiles d'origine pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD, DFSK, JAC, Great Wall, BAIC, Dongfeng, Jetour, FAW. Devis WhatsApp en 24h, livraison partout au Maroc.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-MA">
      <body className={`${inter.variable} ${display.variable} font-sans`}>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <MobileBottomNav />
        <WhatsAppFAB />
        <ToastProvider />
      </body>
    </html>
  );
}
