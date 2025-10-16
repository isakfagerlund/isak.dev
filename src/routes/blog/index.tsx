import { createFileRoute, Link } from '@tanstack/react-router'
import { formatDate, type BlogPostMetadata } from '@/lib/blog'
import { getAllPosts } from '@/lib/blog.server'

export const Route = createFileRoute('/blog/')({
  component: BlogList,
  loader: async () => {
    const posts = getAllPosts()
    return { posts }
  },
  head: () => ({
    meta: [
      {
        title: 'blog - isak.dev',
      },
      {
        name: 'description',
        content: 'thoughts on software development, web technologies, and lessons learned',
      },
    ],
  }),
})

function BlogList() {
  const { posts } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-brand-primary px-6 py-12 md:px-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            to="/"
            className="text-brand-text hover:text-brand-muted transition-colors text-lg font-bold lowercase"
          >
            ← back to home
          </Link>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-brand-text mb-6 tracking-tight lowercase">
          blog
        </h1>

        <p className="text-xl md:text-2xl text-brand-text/80 font-medium mb-16 lowercase">
          thoughts on software development and web technologies
        </p>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-brand-text/60 text-lg lowercase">
              no posts yet. check back soon!
            </p>
          ) : (
            posts.map((post: BlogPostMetadata) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block group"
              >
                <article className="border-l-4 border-brand-text/20 hover:border-brand-text pl-6 py-4 transition-all">
                  <time className="text-brand-text/60 text-sm font-bold uppercase tracking-wide">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-text mt-2 mb-3 lowercase group-hover:text-brand-muted transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-brand-text/80 text-lg lowercase">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
