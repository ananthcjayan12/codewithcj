export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: string
          summary: string
          long_summary: string | null
          contact: Json
          social_links: Json
          skills: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          summary: string
          long_summary?: string | null
          contact: Json
          social_links: Json
          skills: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          summary?: string
          long_summary?: string | null
          contact?: Json
          social_links?: Json
          skills?: Json
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string
          icon: string
          tags: string[]
          category: string
          slug: string
          display_order: number
          status: 'draft' | 'published'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description: string
          icon: string
          tags: string[]
          category: string
          slug: string
          display_order?: number
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          long_description?: string
          icon?: string
          tags?: string[]
          category?: string
          slug?: string
          display_order?: number
          status?: 'draft' | 'published'
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image: string | null
          tags: string[]
          status: 'draft' | 'published'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          featured_image?: string | null
          tags: string[]
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          featured_image?: string | null
          tags?: string[]
          status?: 'draft' | 'published'
          updated_at?: string
        }
      }
    }
  }
} 