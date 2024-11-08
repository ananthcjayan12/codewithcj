import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { container, pageWrapper } from "@/lib/utils"
import { CalendarDays, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

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
}

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

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
      <div className={container}>
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
              Thoughts, stories and ideas about web development, design, and technology.
            </p>
          </div>

          <div className="grid gap-8">
            {posts?.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden">
                <CardHeader className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <CardTitle className="text-2xl hover:text-primary transition-colors">
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

          {(!posts || posts.length === 0) && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No blog posts found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour