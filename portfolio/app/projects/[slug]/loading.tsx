import { container, pageWrapper } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className={pageWrapper}>
      <div className={container}>
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Back button skeleton */}
          <div className="w-32">
            <Skeleton className="h-6" />
          </div>

          {/* Project header skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-16 w-16 rounded-lg" />
            
            <div className="space-y-4">
              <Skeleton className="h-12 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-24" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-32" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24" />
          </div>

          {/* Button skeleton */}
          <div className="pt-8">
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </div>
    </main>
  )
} 