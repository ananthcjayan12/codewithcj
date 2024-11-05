export default function ContactLoading() {
  return (
    <div className="container py-6 md:py-12">
      <div className="mx-auto max-w-2xl space-y-8 animate-pulse">
        {/* Header Loading */}
        <div className="space-y-4">
          <div className="h-10 w-40 bg-muted rounded" />
          <div className="h-16 w-full bg-muted rounded" />
        </div>

        {/* Form Loading */}
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <div className="h-5 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <div className="h-5 w-20 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <div className="h-5 w-24 bg-muted rounded" />
            <div className="h-32 w-full bg-muted rounded" />
          </div>

          {/* Submit Button */}
          <div className="h-12 w-full bg-muted rounded" />
        </div>
      </div>
    </div>
  )
} 