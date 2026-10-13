import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { SiteStateProvider } from "@/context/SiteState";
import { site } from "@/data/site";
import { Sprite } from "@/components/Icons";
import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import AppBar from "@/components/mobile/AppBar";
import TabBar from "@/components/mobile/TabBar";
import BookSheet from "@/components/mobile/BookSheet";
import { fontVars } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Highness Construction" },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    url: "/",
    images: [{ url: "/img/hero-tower.jpg", width: 1242, height: 870, alt: "Shakti Paradise towers in Chinhat at dusk" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/img/hero-tower.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F0E8",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // set by src/middleware.ts from the user-agent: phones get the mobile layout at any width
  const device = (await headers()).get("x-device") === "mobile" ? "mobile" : "desktop";
  return (
    <html lang="en" className={fontVars} data-device={device} suppressHydrationWarning>
      <head>
        {/* Enables the .reveal fade-up only when JavaScript runs */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <Sprite />
        <a className="sr" href="#main">
          Skip to content
        </a>
        <SiteStateProvider>
          <TopBar />
          <Nav />
          {/* phone app shell (hidden on desktop/tablet by CSS); replaces the old StickyBar */}
          <AppBar />
          {children}
          <Footer />
          <TabBar />
          <BookSheet />
        </SiteStateProvider>
        <Reveal />
      </body>
    </html>
  );
}
