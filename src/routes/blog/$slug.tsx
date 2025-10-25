import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { formatDate } from "@/lib/blog";
import { getPostBySlug } from "@/lib/blog.server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const post = await getPostBySlug({ data: params.slug });
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.post.title} - isak.dev`,
      },
      {
        name: "description",
        content: loaderData?.post.description || "",
      },
    ],
  }),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-brand-primary px-6 py-12 md:px-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Link
            to="/blog"
            className="text-brand-text hover:text-brand-muted transition-colors text-lg font-bold lowercase"
          >
            ← back to blog
          </Link>
        </div>

        <article>
          <header className="mb-12">
            <time className="text-brand-text/60 text-sm font-bold uppercase tracking-wide block mb-4">
              {formatDate(post.date)}
            </time>
            <h1 className="text-4xl md:text-6xl font-black text-brand-text mb-4 tracking-tight lowercase">
              {post.title}
            </h1>
            <p className="text-xl text-brand-text/80 font-medium lowercase">
              {post.description}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: () => null,
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-black text-brand-text mb-4 mt-10 lowercase">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-3 mt-8 lowercase">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-brand-text/90 mb-6 leading-relaxed lowercase">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-brand-text underline hover:text-brand-muted transition-colors font-bold"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href?.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 space-y-2 text-brand-text/90">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-2 text-brand-text/90">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="lowercase leading-relaxed">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-black text-brand-text">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-brand-text">{children}</em>
                ),
                code: ({ className, children }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-brand-text/10 text-brand-text px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className={`${className} text-sm`}>{children}</code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="bg-[#0d1117] text-[#e6edf3] p-6 rounded-lg overflow-x-auto mb-6 border border-brand-text/10">
                    {children}
                  </pre>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt || ""}
                    className="w-full rounded-lg my-8 border-2 border-brand-text/20"
                  />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brand-text/40 pl-6 my-6 italic text-brand-text/80">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="border-brand-text/20 my-12" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 pt-8 border-t border-brand-text/20">
          <Link
            to="/blog"
            className="text-brand-text hover:text-brand-muted transition-colors text-lg font-bold lowercase"
          >
            ← back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
