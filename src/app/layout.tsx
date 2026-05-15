import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { localBusinessJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "CHINAPAL — Pièces compatibles pour voitures chinoises au Maroc | Chery Geely Haval MG BYD",
    template: "%s | CHINAPAL",
  },
  description: "CHINAPAL : pièces automobiles compatibles pour voitures chinoises au Maroc. Chery, Geely, MG, Haval, BYD, DFSK, JAC, Great Wall, BAIC, Dongfeng, Jetour, FAW. Devis WhatsApp en 24h, livraison partout au Maroc.",
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: "/" },
  openGraph: {
    title: "CHINAPAL — Pièces compatibles pour voitures chinoises au Maroc",
    description: "Pièces Chery, Geely, MG, Haval, BYD, JAC et DFSK au Maroc. Vérification VIN, devis WhatsApp et livraison nationale depuis Casablanca.",
    url: getSiteUrl(),
    siteName: "CHINAPAL",
    locale: "fr_MA",
    type: "website",
    images: [{ url: "/images/chinapal-logo.jpg", width: 1200, height: 630, alt: "CHINAPAL pièces automobiles chinoises au Maroc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHINAPAL — Pièces voitures chinoises Maroc",
    description: "Vérification VIN, devis WhatsApp et livraison nationale pour pièces de voitures chinoises au Maroc.",
    images: ["/images/chinapal-logo.jpg"],
  },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
      </body>
    </html>
  );
}
