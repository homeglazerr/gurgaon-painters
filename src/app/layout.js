import { Poppins, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl } from "./site-url";
import ScrollReveal from "./components/ScrollReveal";
import CookieNotice from "./components/CookieNotice";
import WhatsAppButton from "./components/WhatsAppButton";
import { createSeoMetadata } from "./seo";

const siteUrl = getSiteUrl();

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rootSeo = createSeoMetadata({
  title: "House Painters in Gurgaon | Home Glazer",
  description: "Looking for painters in Gurgaon? Home Glazer handles interior and exterior painting, wall textures, waterproofing, and wood and metal finishes for homes and businesses.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Gurgaon Painters by Home Glazer",
    title: "House Painters in Gurgaon | Home Glazer",
    description: "Interior and exterior painting, wall textures, waterproofing, and wood and metal finishes for homes and businesses in Gurgaon.",
    ...(siteUrl ? { url: siteUrl, images: ["/images/hero-image-two.webp"] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "House Painters in Gurgaon | Home Glazer",
    description: "Painting for Gurgaon homes and businesses: interiors, exteriors, wall textures, waterproofing, and wood and metal finishes.",
    ...(siteUrl ? { images: ["/images/hero-image-two.webp"] } : {}),
  },
});

export const metadata = {
  ...rootSeo,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: rootSeo.title.absolute, template: "%s" },
  applicationName: "Gurgaon Painters by Home Glazer",
  keywords: [
    "painters in Gurgaon",
    "painters in Gurugram",
    "painting services in Gurgaon",
    "house painting services Gurgaon",
    "home painting Gurgaon",
    "interior painting Gurgaon",
    "exterior painting Gurgaon",
    "wall texture painting Gurgaon",
    "waterproofing services Gurgaon",
    "wood polish Gurgaon",
    "commercial painting Gurgaon",
    "painting contractor Gurgaon",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-97JCZ7L7L2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-97JCZ7L7L2');
          `}
        </Script>
        <ScrollReveal />
        <CookieNotice />
        <WhatsAppButton />
      </body>
    </html>
  );
}
