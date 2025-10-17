import matter from 'gray-matter'

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
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  try {
    const posts = await loadPosts()

    return posts
      .map(({ content, ...metadata }): BlogPostMetadata => metadata)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await loadPosts()
    const post = posts.find((entry) => entry.slug === slug)

    return post ?? null
  } catch (error) {
    console.error('Error loading blog post:', error)
    return null
  }
}

interface LoadedPost extends BlogPost {}

let cachedPosts: LoadedPost[] | null = null

async function loadPosts(): Promise<LoadedPost[]> {
  if (cachedPosts) {
    return cachedPosts
  }

  // Dynamically import all markdown files from src/content/blog
  // Using eager: true with the raw query to get the file contents directly
  const modules = import.meta.glob('../content/blog/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>

  const posts: LoadedPost[] = []

  for (const [filePath, fileContents] of Object.entries(modules)) {
    const { data, content } = matter(fileContents)

    const slug = typeof data.slug === 'string' ? data.slug : extractSlugFromPath(filePath)

    posts.push({
      slug,
      title: ensureString(data.title, slug),
      date: ensureDateString(data.date),
      description: ensureString(data.description, ''),
      content,
    })
  }

  cachedPosts = posts
  return posts
}

function extractSlugFromPath(filePath: string): string {
  const segments = filePath.split('/')
  const fileName = segments[segments.length - 1] || ''
  return fileName.replace(/\.md$/i, '')
}

function ensureString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

function ensureDateString(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return '1970-01-01'
}
