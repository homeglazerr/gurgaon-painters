import Link from "next/link";
import { getSiteUrl } from "../site-url";

const contentWidths = { "4xl": "56rem", "6xl": "72rem", "7xl": "80rem" };

export default function Breadcrumbs({ items, inline = false, onDark = false, width = "7xl" }) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(siteUrl && item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <div className={inline ? "relative z-30" : "pointer-events-none absolute inset-x-0 top-[6rem] z-30"}>
      <div
        className={inline ? "" : "mx-auto w-full px-5 sm:px-8 lg:px-12"}
        style={!inline ? { maxWidth: `calc(${contentWidths[width] || contentWidths["7xl"]} + 6rem)` } : undefined}
      >
        <nav
          aria-label="Breadcrumb"
          className={`pointer-events-auto flex max-w-full items-center gap-2 overflow-x-auto whitespace-nowrap text-xs ${onDark ? "text-white/75" : "text-[#69645b]"}`}
        >
          {items.map((item, index) => (
            <span key={`${item.label}-${index}`} className="inline-flex shrink-0 items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-[#c2410c]">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className={`font-semibold ${onDark ? "text-white" : "text-[#29251f]"}`}>{item.label}</span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-[#c2410c]">{item.label}</Link>
              )}
            </span>
          ))}
        </nav>
      </div>
      {items.length > 1 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
    </div>
  );
}
