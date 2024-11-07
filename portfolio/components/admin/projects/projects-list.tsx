"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Eye, GripVertical } from "lucide-react"
import { DeleteDialog } from "./delete-dialog"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface Project {
  id: string
  title: string
  description: string
  category: string
  status: 'draft' | 'published'
  display_order: number
  slug: string
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects: initialProjects }: ProjectsListProps) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [deleteProject, setDeleteProject] = useState<{ id: string; title: string } | null>(null)

  const handleDeleteComplete = () => {
    setDeleteProject(null)
    router.refresh()
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(projects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update display order for all affected items
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }))

    setProjects(updatedItems)

    // Update the database
    try {
      const response = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify({
          items: updatedItems.map(item => ({
            id: item.id,
            display_order: item.display_order
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update order')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      // Revert to initial state on error
      setProjects(initialProjects)
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              className="rounded-md border"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="grid grid-cols-8 gap-4 p-4 font-medium border-b">
                <div className="col-span-3">Project</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Actions</div>
              </div>
              <div className="divide-y">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <Draggable 
                      key={project.id} 
                      draggableId={project.id} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="grid grid-cols-8 gap-4 p-4 items-center"
                        >
                          <div className="col-span-3 flex items-center gap-3">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                            </div>
                            <span>{project.title}</span>
                          </div>
                          <div className="col-span-2 capitalize">
                            {project.category}
                          </div>
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
                            {project.status === 'published' && (
                              <button
                                onClick={() => router.push(`/projects/${project.slug}`)}
                                className="p-2 hover:bg-accent rounded-md"
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No projects found. Create your first project!
                  </div>
                )}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

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