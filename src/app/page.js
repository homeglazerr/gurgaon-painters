import Features from "./components/Features";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import Services from "./components/Services";
import { getSiteUrl } from "./site-url";

export default function Home() {
  const siteUrl = getSiteUrl();
  const services = [
    "Interior Painting",
    "Exterior Painting",
    "Wall Texture Painting",
    "Waterproofing",
    "Wood Polish and Metal Finishes",
    "Commercial Painting",
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Gurgaon Painters",
        ...(siteUrl
          ? { url: siteUrl }
          : {}),
        inLanguage: "en-IN",
      },
      {
        "@type": "Organization",
        "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
        name: "Gurgaon Painters",
        telephone: "+91 97172 56514",
        parentOrganization: {
          "@type": "Organization",
          name: "Home Glazer",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91 97172 56514",
          contactType: "customer service",
        },
        ...(siteUrl ? { url: siteUrl } : {}),
      },
      ...services.map((name) => ({
        "@type": "Service",
        name,
        serviceType: name,
        areaServed: [
          { "@type": "City", name: "Gurgaon" },
          { "@type": "City", name: "Gurugram" },
        ],
        provider: {
          "@type": "Organization",
          "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
          ...(!siteUrl ? { name: "Gurgaon Painters" } : {}),
        },
      })),
    ],
  };

  return (
    <main className="min-h-screen bg-[#f6f6f4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Features />
      <Contact />
      <Footer />
    </main>
  );
}
