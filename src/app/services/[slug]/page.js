import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { services } from "../services";
import { getSiteUrl } from "../../site-url";
import PageFAQs from "../../components/PageFAQs";
import { serviceFaqs } from "../../components/page-faqs";
import { createSeoMetadata } from "../../seo";
import Breadcrumbs from "../../components/Breadcrumbs";
import { servicePageContent } from "../service-page-content";
import ServiceExperience from "../ServiceExperience";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}/services/${service.slug}` : undefined;
  return createSeoMetadata({
    title: service.seoTitle || service.title,
    description: service.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: { ...(canonical ? { url: canonical } : {}), type: "website", images: [service.image] },
    twitter: { card: "summary_large_image", images: [service.image] },
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const siteUrl = getSiteUrl();
  const serviceUrl = siteUrl ? `${siteUrl}/services/${service.slug}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": siteUrl ? `${siteUrl}/#local-business` : "#local-business",
        name: "Gurgaon Painters",
        alternateName: "Gurgaon Painters by Home Glazer",
        telephone: "+91 97172 56514",
        ...(siteUrl ? { url: siteUrl } : {}),
        areaServed: {
          "@type": "City",
          name: "Gurugram",
          alternateName: "Gurgaon",
          containedInPlace: { "@type": "AdministrativeArea", name: "Haryana" },
        },
      },
      {
        "@type": "Service",
        "@id": serviceUrl ? `${serviceUrl}/#service` : `#${service.slug}-service`,
        name: service.title,
        description: service.description,
        serviceType: service.shortTitle,
        areaServed: {
          "@type": "City",
          name: "Gurugram",
          alternateName: "Gurgaon",
          containedInPlace: { "@type": "AdministrativeArea", name: "Haryana" },
        },
        provider: { "@id": siteUrl ? `${siteUrl}/#local-business` : "#local-business" },
        ...(serviceUrl ? { url: serviceUrl } : {}),
      },
    ],
  };
  const longSections = servicePageContent[service.slug];

  return (
    <main className="relative min-h-screen bg-[#f6f6f4]">
      <Navbar />
      <article className="px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
          <Breadcrumbs inline items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.shortTitle }]} />
          <div className="mt-7 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Gurgaon &amp; Gurugram</p>
              <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl">{service.h1 || service.title}</h1>
              <p className="mt-5 text-lg leading-8 text-[#69645b]">{service.intro}</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#c2410c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#9a3412]">Request a site discussion</Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image src={service.image} alt={service.imageAlt} fill preload sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
          <ServiceExperience service={service} sections={longSections} />
          <section className="mx-auto mt-12 max-w-4xl rounded-md bg-[#29251f] px-6 py-8 text-center text-white sm:px-10 sm:py-10" aria-labelledby="service-cta-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2a17e]">Gurgaon &amp; Gurugram</p>
            <h2 id="service-cta-heading" className="mt-3 text-2xl font-semibold sm:text-3xl">Planning {service.shortTitle.toLowerCase()} for your property?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">Talk with Home Glazer about your project and arrange a free site visit.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c2410c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#9a3412]">Get a Free Site Visit</Link>
              <a href="tel:+919717256514" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#29251f]">Call +91 97172 56514</a>
            </div>
          </section>
          <nav aria-label="Other painting services" className="mt-12 border-t border-[#29251f]/15 pt-6">
            <h2 className="text-xl font-semibold text-[#29251f]">Explore other services</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {services.filter(({ slug: otherSlug }) => otherSlug !== service.slug).map((other) => <li key={other.slug}><Link className="text-sm font-semibold text-[#c2410c] hover:underline" href={`/services/${other.slug}`}>{other.shortTitle} →</Link></li>)}
            </ul>
          </nav>
        </div>
      </article>
      <PageFAQs faqs={serviceFaqs[service.slug]} title={`${service.shortTitle} FAQs`} className="bg-white" />
      <Footer />
    </main>
  );
}
