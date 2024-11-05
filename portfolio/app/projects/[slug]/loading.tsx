export default function ProjectLoading() {
  return (
    <div className="container py-6 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
        <div className="h-8 w-32 bg-muted rounded" />
        
        <div className="space-y-4">
          <div className="h-12 w-2/3 bg-muted rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-20 bg-muted rounded-full" />
          </div>
          <div className="h-6 w-full bg-muted rounded" />
        </div>

        <div className="aspect-video bg-muted rounded-lg" />

        <div className="space-y-4">
          <div className="h-8 w-40 bg-muted rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  )
} 