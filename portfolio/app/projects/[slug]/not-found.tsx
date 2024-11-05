import Link from "next/link"

export default function ProjectNotFound() {
  return (
    <main className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Project Not Found</h1>
      <p className="mt-4 text-muted-foreground">
        The project you're looking for doesn't exist.
      </p>
      <Link
        href="/projects"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to Projects
      </Link>
    </main>
  )
} 