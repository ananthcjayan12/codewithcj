import { createClient } from '@supabase/supabase-js'
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { container, pageWrapper } from "@/lib/utils"

// Create a Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

interface Props {
  params: {
    slug: string
  }
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  created_at: string
  slug: string
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single() as { data: BlogPost | null }

  if (!post) {
    notFound()
  }

  return (
    <main className={pageWrapper}>
      {/* Background Elements */}
      <div className="modern-grid-bg fixed inset-0 z-0" />
      <div className="bg-shapes">
        <div className="bg-shape" />
        <div className="bg-shape" />
        <div className="bg-shape" />
      </div>

      {/* Content */}
      <div className={`${container} relative z-10 py-12`}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <article className="prose prose-lg dark:prose-invert max-w-none animate-fadeIn bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
            <header className="text-center mb-12 space-y-4 not-prose">
              <div className="flex flex-wrap justify-center gap-2">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {post.title}
              </h1>
              <p className="text-xl text-gray-600">
                {post.excerpt}
              </p>
            </header>

            <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      </div>
    </main>
  )
}

// Generate static params for all published posts
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')

  return posts?.map((post) => ({
    slug: post.slug,
  })) || []
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour