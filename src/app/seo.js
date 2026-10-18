export const SEO_TITLE_LIMIT = 60;
export const SEO_DESCRIPTION_LIMIT = 150;

function limitText(value, maxLength) {
  if (typeof value !== "string") return value;
  const text = value.trim().replace(/\s+/g, " ");
  if (text.length <= maxLength) return text;

  const limit = maxLength - 1;
  const shortened = text.slice(0, limit + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const content = lastSpace > limit * 0.6 ? shortened.slice(0, lastSpace) : shortened.slice(0, limit);
  return `${content.trim().replace(/[,:;–—-]+$/u, "")}…`;
}

export function createSeoMetadata({ title, description, openGraph = {}, twitter = {}, ...metadata }) {
  const safeTitle = limitText(title, SEO_TITLE_LIMIT);
  const safeDescription = limitText(description, SEO_DESCRIPTION_LIMIT);
  if (!safeTitle || !safeDescription) {
    throw new Error("SEO metadata requires a non-empty title and description.");
  }
  const safeOpenGraph = {
    ...openGraph,
    title: limitText(openGraph.title ?? safeTitle, SEO_TITLE_LIMIT),
    description: limitText(openGraph.description ?? safeDescription, SEO_DESCRIPTION_LIMIT),
  };
  const safeTwitter = {
    ...twitter,
    title: limitText(twitter.title ?? safeTitle, SEO_TITLE_LIMIT),
    description: limitText(twitter.description ?? safeDescription, SEO_DESCRIPTION_LIMIT),
  };

  return {
    ...metadata,
    title: { absolute: safeTitle },
    description: safeDescription,
    openGraph: safeOpenGraph,
    twitter: safeTwitter,
  };
}
