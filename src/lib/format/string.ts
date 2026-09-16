export function truncate(value: string, maxLength: number, suffix = "…"): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - suffix.length)).trimEnd()}${suffix}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function pluralize(count: number, singular: string, plural: string = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

export function initials(fullName: string, maxParts = 2): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, maxParts)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
