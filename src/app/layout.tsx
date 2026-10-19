import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Header from "@/components/Header";
import HeaderFallback from "@/components/HeaderFallback";
import MobileActionBar from "@/components/MobileActionBar";
import ReviewBadge from "@/components/ReviewBadge";
import { HOME_DESCRIPTION, HOME_TITLE, SITE } from "@/config/site";
import { buildNav, robotsFor } from "@/config/routes";
import { onlineBookingAvailable } from "@/lib/booking";
import "./globals.css";

const manrope = Manrope({
  variable: "--nf-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--nf-body",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION = HOME_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  robots: robotsFor("home"),
  title: HOME_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: SITE.name,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <ReviewBadge />
        <Suspense fallback={<HeaderFallback />}>
          <Header online={onlineBookingAvailable()} nav={buildNav()} />
        </Suspense>
        {children}
        <Footer />
        <MobileActionBar online={onlineBookingAvailable()} />
      </body>
    </html>
  );
}
