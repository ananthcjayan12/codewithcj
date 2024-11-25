import { createClient } from '@supabase/supabase-js'
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <main className={pageWrapper}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Content */}
      <div className={`${container} relative z-10 py-24`}>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:border-yellow-500/50 transition-all duration-300 text-gray-600 hover:text-gray-900 mb-8 shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          {/* Main Content */}
          <article className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <header className="p-8 border-b border-gray-100 space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag: string) => (
                  <Badge 
                    key={tag} 
                    className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {post.title}
              </h1>
              <p className="text-xl text-gray-700">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-700"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
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