export default function AboutLoading() {
  return (
    <div className="container py-6 md:py-12">
      <div className="space-y-12 animate-pulse">
        {/* Professional Summary Loading */}
        <div className="space-y-4">
          <div className="h-10 w-40 bg-muted rounded" />
          <div className="h-20 w-full max-w-2xl bg-muted rounded" />
        </div>

        {/* Skills Loading */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-32 bg-muted rounded" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 w-full bg-muted rounded" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Loading */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 