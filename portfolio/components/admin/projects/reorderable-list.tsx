"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { GripVertical, Edit, Trash2 } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  icon: string
  category: string
  status: 'draft' | 'published'
  display_order: number
}

interface ReorderableListProps {
  projects: Project[]
  onDeleteClick: (project: Project) => void
}

export function ReorderableList({ projects, onDeleteClick }: ReorderableListProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [orderedProjects, setOrderedProjects] = useState(projects)

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(orderedProjects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the display_order of all items
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index
    }))

    setOrderedProjects(updatedItems)

    // Update the database
    try {
      const updates = updatedItems.map((item) => ({
        id: item.id,
        display_order: item.display_order
      }))

      const { error } = await supabase
        .from('projects')
        .upsert(updates)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="rounded-md border divide-y"
          >
            <div className="grid grid-cols-8 gap-4 p-4 font-medium">
              <div className="col-span-3">Project</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            {orderedProjects.map((project, index) => (
              <Draggable 
                key={project.id} 
                draggableId={project.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="grid grid-cols-8 gap-4 p-4 items-center bg-background hover:bg-accent/50 transition-colors"
                  >
                    <div className="col-span-3 flex items-center gap-3">
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </div>
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
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteClick(project)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
} 