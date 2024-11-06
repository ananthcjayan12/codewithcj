import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { MediaLibrary } from "@/components/admin/media/media-library"

export default async function MediaPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: media } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">
            Manage your images and files
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Upload Files
        </button>
      </div>
      <MediaLibrary files={media || []} />
    </div>
  )
} 