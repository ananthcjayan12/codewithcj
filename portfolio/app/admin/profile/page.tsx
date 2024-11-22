import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ProfileForm } from "@/components/admin/profile/profile-form"

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Management</h1>
        <p className="text-muted-foreground">
          Update your profile information
        </p>
      </div>
      <ProfileForm initialData={profile} />
    </div>
  )
} 