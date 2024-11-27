import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { container, pageWrapper } from "@/lib/utils"
import { CalendarDays, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getBlogPosts } from "@/lib/supabase"

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

interface BlogPost {
  id: string
  title: string
  excerpt: string
  tags: string[]
  created_at: string
  slug: string
  featured_image: string
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateReadTime = (excerpt: string) => {
    const wordsPerMinute = 200;
    const words = excerpt.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  }

  return (
    <main className={pageWrapper}>
      <div className="modern-grid-bg fixed inset-0 z-0" />
      <div className="bg-shapes">
        <div className="bg-shape" />
        <div className="bg-shape" />
        <div className="bg-shape" />
      </div>

      <div className={`${container} relative z-10 py-12`}>
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Blog
            </h1>
            <p className="text-xl text-gray-600 mx-auto max-w-2xl">
              Thoughts, stories and ideas about web development, design, and technology.
            </p>
          </div>

          <div className="grid gap-8 animate-fadeInUp">
            {posts?.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-200">
                {post.featured_image && (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </Link>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-6">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{calculateReadTime(post.excerpt)}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour