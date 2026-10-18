import { getSiteUrl } from "./site-url";

export default function sitemap() {
  const siteUrl = getSiteUrl();

  if (!siteUrl) return [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
