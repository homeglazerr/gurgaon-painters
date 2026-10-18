import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { articles, getArticle } from "../articles";
import { getSiteUrl } from "../../site-url";
import PageFAQs from "../../components/PageFAQs";
import { articleFaqs } from "../../components/page-faqs";
import { createSeoMetadata } from "../../seo";
import Breadcrumbs from "../../components/Breadcrumbs";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}/blog/${article.slug}` : undefined;
  return createSeoMetadata({
    title: article.seoTitle || article.title,
    description: article.description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: { ...(canonical ? { url: canonical } : {}), type: "article", images: [article.image] },
    twitter: { card: "summary_large_image", images: [article.image] },
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const siteUrl = getSiteUrl();
  const articleUrl = siteUrl ? `${siteUrl}/blog/${article.slug}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: siteUrl ? `${siteUrl}${article.image}` : article.image,
    mainEntityOfPage: articleUrl,
    publisher: {
      "@type": "Organization",
      name: "Gurgaon Painters by Home Glazer",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    inLanguage: "en-IN",
  };

  return (
    <main className="relative min-h-screen bg-[#f6f6f4]">
      <Navbar />
      <article className="px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
          <Breadcrumbs inline items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]} />
          <header className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2410c]">{article.category} · Gurgaon Painters guide</p>
            <h1 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#69645b]">{article.description}</p>
            <p className="mt-4 text-sm text-[#777166]">Published by Gurgaon Painters by Home Glazer</p>
          </header>
          <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-md">
            <Image src={article.image} alt={article.imageAlt} fill preload sizes="(max-width: 767px) 100vw, 896px" className="object-cover" />
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-[#514b41]">
            {article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <h2 className="pt-2 text-2xl font-semibold text-[#29251f]">What to check</h2>
            <ul className="list-disc space-y-2 pl-5">
              {article.checks.map((check) => <li key={check}>{check}</li>)}
            </ul>
            <p className="border-t border-[#29251f]/15 pt-6 text-[#69645b]">Every property is different. The right materials and repairs depend on the surface and an on-site assessment.</p>
            <Link href="/contact" className="inline-flex min-h-12 items-center rounded-full bg-[#c2410c] px-6 text-sm font-bold text-white transition-colors hover:bg-[#9a3412]">Discuss your painting project</Link>
          </div>
          <nav aria-label="More painting guides" className="mt-12 border-t border-[#29251f]/15 pt-6">
            <h2 className="text-xl font-semibold text-[#29251f]">More painting guides</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {articles.filter(({ slug: otherSlug }) => otherSlug !== article.slug).map((other) => (
                <li key={other.slug}><Link className="text-[#c2410c] hover:underline" href={`/blog/${other.slug}`}>{other.title} →</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </article>
      <PageFAQs faqs={articleFaqs[article.slug]} title="Questions about this painting guide" className="bg-white" />
      <Footer />
    </main>
  );
}
