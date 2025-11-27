/**
 * Convert heading text to a URL-safe slug for anchor IDs
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Spaces to dashes
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-|-$/g, ''); // Trim leading/trailing dashes
}

/**
 * Convert a filename slug to a human-readable title
 * e.g., "hello-world" → "Hello World"
 */
export function humanizeSlug(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}
