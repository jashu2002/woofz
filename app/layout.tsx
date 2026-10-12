import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/navigation/Navbar";
import { CartDrawer } from "@/components/navigation/CartDrawer";
import { Cursor } from "@/components/ui/Cursor";
import { Footer } from "@/components/sections/Footer";
import { PageTransition } from "@/components/animations/PageTransition";

const serifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WOofe — Luxury Dog Lifestyle & Architectural Furniture",
  description:
    "Unofficial concept redesign for WOofe. Premium luxury dog furniture, orthopedic beds, and tactile textiles designed for modern Scandinavian interiors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifDisplay.variable} ${inter.variable} h-full antialiased selection:bg-terracotta selection:text-ivory`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-charcoal font-sans-ui overflow-x-hidden">
        <CartProvider>
          <Cursor />
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

