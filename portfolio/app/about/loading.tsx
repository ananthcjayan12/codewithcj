import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { container, pageWrapper } from "@/lib/utils"

export default function Loading() {
  return (
    <main className={pageWrapper}>
      <div className={container}>
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-6 w-20" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-40" />
            <div className="grid gap-6">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-36" />
            <div className="grid gap-6">
              {[...Array(2)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-40" />
            <Card>
              <CardContent className="pt-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
} 