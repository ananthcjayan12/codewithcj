"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Plus, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface ProjectFormProps {
  initialData?: {
    id?: string
    title: string
    description: string
    long_description: string
    icon: string
    tags: string[]
    category: string
    slug: string
    status: 'draft' | 'published'
    technical_details?: string
    key_features?: string[]
    challenges?: string
    solutions?: string
    github_url?: string
    live_url?: string
  }
}

const categories = ["Automation", "AI", "Business", "Finance", "Other"]
const iconOptions = ["code", "database", "bot", "chart", "message", "qr", "file", "video", "bar", "automation", "ai", "erp", "workflow"]

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showTagCommand, setShowTagCommand] = useState(false)
  const [showFeatureCommand, setShowFeatureCommand] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    long_description: initialData?.long_description || "",
    icon: initialData?.icon || "code",
    tags: initialData?.tags || [],
    category: initialData?.category || "",
    status: initialData?.status || "draft",
    technical_details: initialData?.technical_details || "",
    key_features: initialData?.key_features || [],
    challenges: initialData?.challenges || "",
    solutions: initialData?.solutions || "",
    github_url: initialData?.github_url || "",
    live_url: initialData?.live_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('/api/projects', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(initialData?.id ? { ...formData, id: initialData.id } : formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save project')
      }

      await router.refresh()
      router.replace('/admin/projects')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = (value: string) => {
    if (value.trim() && !formData.tags.includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, value.trim()]
      }))
    }
    setShowTagCommand(false)
    setInputValue("")
  }

  const addFeature = (value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        key_features: [...(prev.key_features || []), value.trim()]
      }))
    }
    setShowFeatureCommand(false)
    setInputValue("")
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_features: prev.key_features?.filter((_, i) => i !== index) || []
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Project title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={value => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief project description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long_description">Full Description</Label>
              <Textarea
                id="long_description"
                value={formData.long_description}
                onChange={e => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
                placeholder="Detailed project description"
                rows={5}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map(tag => (
                <Badge key={tag} className="gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowTagCommand(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Tag
            </Button>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <Label>Key Features</Label>
            <div className="space-y-2 mb-2">
              {formData.key_features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex-1">
                    {feature}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFeatureCommand(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </div>

          {/* Technical Details */}
          <div className="space-y-2">
            <Label htmlFor="technical_details">Technical Details</Label>
            <Textarea
              id="technical_details"
              value={formData.technical_details}
              onChange={e => setFormData(prev => ({ ...prev, technical_details: e.target.value }))}
              placeholder="Technical implementation details"
              rows={4}
            />
          </div>

          {/* Challenges & Solutions */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={e => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                placeholder="Project challenges"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solutions">Solutions</Label>
              <Textarea
                id="solutions"
                value={formData.solutions}
                onChange={e => setFormData(prev => ({ ...prev, solutions: e.target.value }))}
                placeholder="Solutions implemented"
                rows={4}
              />
            </div>
          </div>

          {/* URLs */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={e => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live_url">Live Demo URL</Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={e => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <Switch
              id="status"
              checked={formData.status === 'published'}
              onCheckedChange={checked => setFormData(prev => ({
                ...prev,
                status: checked ? 'published' : 'draft'
              }))}
            />
            <Label htmlFor="status">Publish project</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 md:flex-none"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Update Project' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          className="flex-1 md:flex-none"
        >
          Cancel
        </Button>
      </div>

      {/* Tag Command Dialog */}
      <CommandDialog open={showTagCommand} onOpenChange={setShowTagCommand}>
        <Command>
          <CommandInput 
            placeholder="Type a tag..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              Press enter to add "{inputValue}"
            </CommandEmpty>
            <CommandGroup>
              {inputValue && (
                <CommandItem
                  onSelect={() => addTag(inputValue)}
                >
                  Add "{inputValue}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>

      {/* Feature Command Dialog */}
      <CommandDialog open={showFeatureCommand} onOpenChange={setShowFeatureCommand}>
        <Command>
          <CommandInput 
            placeholder="Type a feature..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              Press enter to add "{inputValue}"
            </CommandEmpty>
            <CommandGroup>
              {inputValue && (
                <CommandItem
                  onSelect={() => addFeature(inputValue)}
                >
                  Add "{inputValue}"
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </form>
  )
} 