export function ProjectsLoading() {
  return (
    <div className="container py-20 animate-pulse">
      <div className="space-y-8">
        <div className="h-10 w-48 bg-muted rounded" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border p-6">
              <div className="space-y-4">
                <div className="h-6 w-2/3 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="flex gap-2">
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

export function AboutLoading() {
  // Similar loading skeleton for About section
  return <div>Loading...</div>
}

export function ContactLoading() {
  // Similar loading skeleton for Contact section
  return <div>Loading...</div>
} 