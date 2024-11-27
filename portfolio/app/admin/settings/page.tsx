import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { SettingsForm } from "@/components/admin/settings/settings-form"

export const runtime = 'edge'

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your site settings and configurations
        </p>
      </div>
      <SettingsForm initialData={settings} />
    </div>
  )
} 