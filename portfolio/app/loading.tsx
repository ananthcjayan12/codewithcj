import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { container, pageWrapper } from "@/lib/utils"

export default function Loading() {
  return (
    <main className={pageWrapper}>
      <div className={container}>
        {/* Hero Section */}
        <section className="py-20 text-center space-y-8">
          <Skeleton className="h-16 md:h-24 max-w-3xl mx-auto" />
          <Skeleton className="h-8 md:h-12 max-w-2xl mx-auto" />
          <div className="flex justify-center">
            <Skeleton className="h-12 w-40" />
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-10 w-48 mx-auto" />
              <Skeleton className="h-6 w-64 mx-auto" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-6 w-16" />
                      ))}
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button variant="outline" disabled className="w-full">
                      Loading...
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Skeleton className="h-12 w-40 mx-auto" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 