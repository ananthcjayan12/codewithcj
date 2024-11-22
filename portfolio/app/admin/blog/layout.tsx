import React from 'react'

// Force dynamic rendering for all blog admin pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 