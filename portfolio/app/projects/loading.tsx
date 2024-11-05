export default function ProjectsLoading() {
  return (
    <div className="container py-6 md:py-12">
      <div className="space-y-8 animate-pulse">
        {/* Header Loading */}
        <div className="space-y-4">
          <div className="h-10 w-48 bg-muted rounded" />
          <div className="h-16 w-full max-w-2xl bg-muted rounded" />
        </div>

        {/* Categories Loading */}
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-muted rounded-full" />
          ))}
        </div>

        {/* Projects Grid Loading */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-background p-2">
              <div className="aspect-video bg-muted rounded-md" />
              <div className="p-4 space-y-4">
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-16 bg-muted rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 