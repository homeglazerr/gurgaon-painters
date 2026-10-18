import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "./site-url";

const siteUrl = getSiteUrl();

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Painters in Gurgaon - Gurgaon Painters by Home Glazer",
    template: "%s | Gurgaon Painters by Home Glazer",
  },
  description:
    "Looking for painters in Gurgaon? Explore home and commercial painting services, including interior and exterior painting, wall textures, waterproofing, and wood finishes.",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Gurgaon Painters by Home Glazer",
    title: "Painters in Gurgaon | Gurgaon Painters by Home Glazer",
    description:
      "Explore home and commercial painting services in Gurgaon, from interior and exterior painting to wall textures, waterproofing, and wood finishes.",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: ["/images/hero-image-two.webp"],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Painters in Gurgaon | Gurgaon Painters by Home Glazer",
    description:
      "Home and commercial painting services in Gurgaon, including interiors, exteriors, textures, and waterproofing.",
    ...(siteUrl
      ? { images: ["/images/hero-image-two.webp"] }
      : {}),
  },
  alternates: siteUrl
    ? { canonical: "/" }
    : undefined,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
