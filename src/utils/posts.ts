export const getPostLink = (slug: string) => {
  return `/posts/${slug}`;
};

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt: string): string {
  if (typeof excerpt !== "string") {
    throw new Error(
      `Failed to sanitize excerpt: invalid type ${typeof excerpt}`
    );
  }

  let sanitized = excerpt;

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, "&hellip;");

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace("....", ".");
  sanitized = sanitized.replace(".&hellip;", ".");

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, "");

  return sanitized;
}
