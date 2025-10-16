import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
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

// Get the blog directory path
function getBlogDir(): string {
  // Try different paths for different environments
  const possiblePaths = [
    path.join(process.cwd(), 'content', 'blog'), // Development
    path.join(process.cwd(), '..', 'content', 'blog'), // Some build configs
  ]

  for (const dir of possiblePaths) {
    if (existsSync(dir)) {
      return dir
    }
  }

  // Fallback
  return path.join(process.cwd(), 'content', 'blog')
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  const blogDir = getBlogDir()

  if (!existsSync(blogDir)) {
    console.warn(`Blog directory not found: ${blogDir}`)
    return []
  }

  try {
    const files = await readdir(blogDir)
    const mdFiles = files.filter((file) => file.endsWith('.md'))

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(blogDir, file)
        const fileContents = await readFile(filePath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug: data.slug as string,
          title: data.title as string,
          date: data.date as string,
          description: data.description as string,
        }
      })
    )

    // Sort by date, newest first
    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const blogDir = getBlogDir()

  if (!existsSync(blogDir)) {
    console.warn(`Blog directory not found: ${blogDir}`)
    return null
  }

  try {
    const files = await readdir(blogDir)
    const mdFiles = files.filter((file) => file.endsWith('.md'))

    for (const file of mdFiles) {
      const filePath = path.join(blogDir, file)
      const fileContents = await readFile(filePath, 'utf8')
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
  } catch (error) {
    console.error('Error reading blog post:', error)
    return null
  }
}
