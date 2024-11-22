import React, { Suspense } from 'react'
import Loading from './loading'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

// Force static rendering
export const dynamic = 'force-static'