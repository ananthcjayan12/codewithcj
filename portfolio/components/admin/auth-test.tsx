"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function AuthTest() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

      return () => subscription.unsubscribe()
    }

    checkUser()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-lg font-bold mb-4">Auth Status</h2>
      {user ? (
        <div>
          <p className="text-green-500">✓ Authenticated</p>
          <pre className="mt-2 p-2 bg-muted rounded">
            {JSON.stringify(user, null, 2)}
          </pre>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-destructive">✗ Not authenticated</p>
      )}
    </div>
  )
} 