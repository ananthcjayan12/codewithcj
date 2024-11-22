"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Plus, X } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { aboutFormSchema, type AboutFormValues } from "@/lib/validations/about"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface AboutFormProps {
  initialData?: AboutFormValues
}

export function AboutForm({ initialData }: AboutFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      id: initialData?.id,
      title: initialData?.title || "",
      bio: initialData?.bio || "",
      skills: initialData?.skills || {
        technical: [],
        soft: [],
        tools: []
      },
      experience: initialData?.experience || [],
      education: initialData?.education || [],
      achievements: initialData?.achievements || []
    }
  })

  const onSubmit = async (values: AboutFormValues) => {
    try {
      setIsLoading(true)
      console.log('Submitting values:', values)

      // First, check if a record exists
      const { data: existingRecord, error: fetchError } = await supabase
        .from('about_content')
        .select('id')
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      const { data, error } = await supabase
        .from('about_content')
        .upsert({
          id: existingRecord?.id || initialData?.id,
          ...values,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully updated data:', data)
      toast.success('Changes saved successfully')
      
      // Force a cache revalidation and refresh
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Error in onSubmit:', error)
      toast.error('Failed to save changes')
    } finally {
      setIsLoading(false)
    }
  }

  const addSkill = (category: keyof AboutFormValues['skills']) => {
    const currentSkills = form.getValues(`skills.${category}`)
    form.setValue(`skills.${category}`, [...currentSkills, ''])
  }

  const removeSkill = (category: keyof AboutFormValues['skills'], index: number) => {
    const currentSkills = form.getValues(`skills.${category}`)
    form.setValue(
      `skills.${category}`,
      currentSkills.filter((_, i) => i !== index)
    )
  }

  const addExperience = () => {
    const currentExperience = form.getValues('experience')
    form.setValue('experience', [
      ...currentExperience,
      { title: '', company: '', duration: '', description: '' }
    ])
  }

  const removeExperience = (index: number) => {
    const currentExperience = form.getValues('experience')
    form.setValue(
      'experience',
      currentExperience.filter((_, i) => i !== index)
    )
  }

  const addEducation = () => {
    const currentEducation = form.getValues('education')
    form.setValue('education', [
      ...currentEducation,
      { degree: '', institution: '', year: '', description: '' }
    ])
  }

  const removeEducation = (index: number) => {
    const currentEducation = form.getValues('education')
    form.setValue(
      'education',
      currentEducation.filter((_, i) => i !== index)
    )
  }

  const addAchievement = () => {
    const currentAchievements = form.getValues('achievements')
    form.setValue('achievements', [...currentAchievements, ''])
  }

  const removeAchievement = (index: number) => {
    const currentAchievements = form.getValues('achievements')
    form.setValue(
      'achievements',
      currentAchievements.filter((_, i) => i !== index)
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="About Me" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Write something about yourself..."
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="font-medium">Skills</h3>
              
              {/* Technical Skills */}
              <div className="space-y-2">
                <FormLabel>Technical Skills</FormLabel>
                {form.watch('skills.technical').map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`skills.technical.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="e.g., React" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSkill('technical', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill('technical')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Technical Skill
                </Button>
              </div>

              {/* Soft Skills */}
              <div className="space-y-2">
                <FormLabel>Soft Skills</FormLabel>
                {form.watch('skills.soft').map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`skills.soft.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="e.g., Leadership" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSkill('soft', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill('soft')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Soft Skill
                </Button>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <FormLabel>Tools & Technologies</FormLabel>
                {form.watch('skills.tools').map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`skills.tools.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} placeholder="e.g., VS Code" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSkill('tools', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill('tools')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tool
                </Button>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="font-medium">Experience</h3>
              {form.watch('experience').map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeExperience(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`experience.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Senior Developer" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Tech Corp" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 2020 - Present" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`experience.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe your role and achievements..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addExperience}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="font-medium">Education</h3>
              {form.watch('education').map((_, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEducation(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`education.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., BSc Computer Science" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., University Name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 2020" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`education.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Additional details..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addEducation}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h3 className="font-medium">Achievements</h3>
              {form.watch('achievements').map((_, index) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`achievements.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="Enter an achievement..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAchievement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAchievement}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 