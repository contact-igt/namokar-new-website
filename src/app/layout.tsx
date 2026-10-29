import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Header from "@/components/Header";
import HeaderFallback from "@/components/HeaderFallback";
import QuickActions from "@/components/QuickActions";
import ReviewBadge from "@/components/ReviewBadge";
import { HOME_DESCRIPTION, HOME_TITLE, SITE } from "@/config/site";
import { buildNav, robotsFor } from "@/config/routes";
import { onlineBookingAvailable } from "@/lib/booking";
import "slick-carousel/slick/slick.css";
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
        <QuickActions />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "z4tjcr163m");`}
        </Script>
      </body>
    </html>
  );
}
