import { getSiteUrl } from "./site-url";
import { articles } from "./blog/articles";
import { services } from "./services/services";

export default function sitemap() {
  const siteUrl = getSiteUrl();

  if (!siteUrl) return [];

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/why-us`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    ...services.map(({ slug }) => ({
      url: `${siteUrl}/services/${slug}`,
      changeFrequency: "yearly",
      priority: 0.8,
    })),
    { url: `${siteUrl}/blog`, changeFrequency: "monthly", priority: 0.7 },
    ...articles.map(({ slug }) => ({
      url: `${siteUrl}/blog/${slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
