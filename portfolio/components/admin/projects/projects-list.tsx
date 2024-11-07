"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Edit, Trash2, GripVertical } from "lucide-react"
import { DeleteDialog } from "./delete-dialog"

interface Project {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: 'draft' | 'published'
  display_order: number
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter()
  const [deleteProject, setDeleteProject] = useState<{ id: string; title: string } | null>(null)

  const handleDeleteComplete = () => {
    setDeleteProject(null)
    router.refresh()
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
          <div className="col-span-3">Project</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Actions</div>
        </div>
        <div className="divide-y">
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="grid grid-cols-8 gap-4 p-4 items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <span>{project.title}</span>
                </div>
                <div className="col-span-2 capitalize">{project.category}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    project.status === 'published' 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="col-span-1 flex items-center gap-2">
                  <button
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                    className="p-2 hover:bg-accent rounded-md"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteProject({ id: project.id, title: project.title })}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No projects found. Create your first project!
            </div>
          )}
        </div>
      </div>

      {deleteProject && (
        <DeleteDialog
          projectId={deleteProject.id}
          projectTitle={deleteProject.title}
          isOpen={true}
          onClose={() => setDeleteProject(null)}
          onSuccess={handleDeleteComplete}
        />
      )}
    </>
  )
} 