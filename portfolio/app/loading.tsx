export default function HomeLoading() {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-8 animate-pulse text-center">
        {/* Avatar Loading */}
        <div className="flex justify-center">
          <div className="h-36 w-36 rounded-full bg-muted" />
        </div>

        {/* Title Loading */}
        <div className="space-y-4">
          <div className="h-16 w-64 mx-auto bg-muted rounded" />
          <div className="h-8 w-48 mx-auto bg-muted rounded" />
        </div>

        {/* Description Loading */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-4/6 bg-muted rounded" />
        </div>

        {/* Buttons Loading */}
        <div className="flex justify-center gap-4">
          <div className="h-12 w-32 bg-muted rounded-md" />
          <div className="h-12 w-32 bg-muted rounded-md" />
        </div>

        {/* Social Links Loading */}
        <div className="flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-muted rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
} 