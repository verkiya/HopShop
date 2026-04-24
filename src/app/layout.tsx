import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HopShop",
    template: "HopShop | %s",
  },
  icons: {
    icon: "/hopshop.svg",
    shortcut: "/hopshop.svg",
    apple: "/hopshop.svg",
  },
  description:
    "HopShop is a multi-tenant e-commerce platform where independent sellers launch storefronts, manage products, and scale their business with a shared infrastructure.",
  keywords: [
    "ecommerce",
    "multi-tenant",
    "marketplace",
    "online store",
    "SaaS commerce",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
