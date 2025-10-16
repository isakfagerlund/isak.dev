import fs from 'node:fs'
import path from 'node:path'
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

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPostMetadata[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'))

  const posts = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
    }
  })

  // Sort by date, newest first
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'))

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    if (data.slug === slug) {
      return {
        slug: data.slug as string,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        content,
      }
    }
  }

  return null
}
