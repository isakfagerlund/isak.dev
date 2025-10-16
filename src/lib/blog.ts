// Client-safe utilities for blog
// Server-only functions are in blog.server.ts

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  content: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  description: string
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
