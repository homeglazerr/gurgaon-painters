import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    slug: "choose-paint-finish-for-each-room",
    category: "Planning",
    title: "How to choose the right paint finish for each room",
    description:
      "Match matte, satin, and durable finishes to how each space is used.",
    image: "/images/service-interior.webp",
    imageAlt: "Freshly painted home interior",
  },
  {
    slug: "exterior-house-repainting-checklist-gurgaon",
    category: "Exterior painting",
    title: "What to check before repainting your home's exterior",
    description:
      "Consider surface preparation, weather exposure, and repairs before painting.",
    image: "/images/service-exterior.webp",
    imageAlt: "Exterior painting work on a modern home",
  },
  {
    slug: "early-signs-wall-waterproofing-gurgaon",
    category: "Waterproofing",
    title: "Early signs that a wall may need waterproofing",
    description:
      "Learn what peeling paint, damp patches, and recurring stains may indicate.",
    image: "/images/service-waterproofing.webp",
    imageAlt: "Waterproof coating being applied to a terrace",
  },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="bg-[#f9f9f7] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <p className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#29251f]">
            <span className="h-px w-8 bg-[#c2410c]" />
            From the blog
            <span className="h-px w-8 bg-[#c2410c]" />
          </p>
          <h2
            id="blog-heading"
            className="text-4xl font-medium leading-tight tracking-[-0.045em] text-[#29251f] sm:text-5xl lg:text-6xl"
          >
            Ideas for your next paint project
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#69645b] sm:text-base sm:leading-7">
            Explore practical advice for choosing finishes, caring for walls, and planning your project.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group overflow-hidden rounded-md bg-white shadow-[0_8px_24px_rgba(35,31,24,0.08)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2410c]"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-left sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c2410c]">
                  {article.category}
                </p>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-[#29251f] sm:text-xl">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#69645b]">
                  {article.description}
                </p>
                <span className="mt-3 inline-flex text-sm font-semibold text-[#c2410c]">
                  Read article <span aria-hidden="true" className="ml-2">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c2410c] px-6 text-sm font-bold text-[#c2410c] transition-colors hover:bg-[#c2410c] hover:text-white"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
