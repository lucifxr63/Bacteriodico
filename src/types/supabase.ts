// Este archivo será generado automáticamente con: npm run supabase:types
// Por ahora incluimos tipos básicos para evitar errores

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
          display_name: string | null
          avatar_url: string | null
          role: 'admin' | 'editor' | 'autor' | 'lector'
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'autor' | 'lector'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'editor' | 'autor' | 'lector'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: Json
          cover_url: string | null
          cover_alt: string | null
          cover_width: number | null
          cover_height: number | null
          status: 'draft' | 'review' | 'published'
          reliability_label: string | null
          author_id: string
          reviewer_id: string | null
          published_at: string | null
          reading_time: number | null
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content?: Json
          cover_url?: string | null
          cover_alt?: string | null
          cover_width?: number | null
          cover_height?: number | null
          status?: 'draft' | 'review' | 'published'
          reliability_label?: string | null
          author_id: string
          reviewer_id?: string | null
          published_at?: string | null
          reading_time?: number | null
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: Json
          cover_url?: string | null
          cover_alt?: string | null
          cover_width?: number | null
          cover_height?: number | null
          status?: 'draft' | 'review' | 'published'
          reliability_label?: string | null
          author_id?: string
          reviewer_id?: string | null
          published_at?: string | null
          reading_time?: number | null
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string | null
          author_name: string | null
          author_email: string | null
          content: string
          status: 'pending' | 'approved' | 'rejected'
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          content: string
          status?: 'pending' | 'approved' | 'rejected'
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string | null
          author_name?: string | null
          author_email?: string | null
          content?: string
          status?: 'pending' | 'approved' | 'rejected'
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          url: string
          alt: string | null
          width: number | null
          height: number | null
          mime_type: string | null
          size_bytes: number | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          url: string
          alt?: string | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          size_bytes?: number | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          url?: string
          alt?: string | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          size_bytes?: number | null
          created_by?: string | null
          created_at?: string
        }
      }
      post_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
      sources: {
        Row: {
          id: string
          post_id: string
          type: 'doi' | 'pmid' | 'url'
          value: string
          title: string | null
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          type: 'doi' | 'pmid' | 'url'
          value: string
          title?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          type?: 'doi' | 'pmid' | 'url'
          value?: string
          title?: string | null
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          target_type: string | null
          target_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          target_type?: string | null
          target_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          action?: string
          target_type?: string | null
          target_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      slug_redirects: {
        Row: {
          id: string
          old_slug: string
          new_slug: string
          post_id: string
          created_at: string
        }
        Insert: {
          id?: string
          old_slug: string
          new_slug: string
          post_id: string
          created_at?: string
        }
        Update: {
          id?: string
          old_slug?: string
          new_slug?: string
          post_id?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {
      search_posts: {
        Args: {
          search_query: string
          limit_count?: number
        }
        Returns: {
          id: string
          title: string
          excerpt: string
          slug: string
          cover_url: string
          published_at: string
          rank: number
        }[]
      }
    }
    Enums: {
      user_role: 'admin' | 'editor' | 'autor' | 'lector'
      post_status: 'draft' | 'review' | 'published'
      comment_status: 'pending' | 'approved' | 'rejected'
      source_type: 'doi' | 'pmid' | 'url'
    }
  }
}
