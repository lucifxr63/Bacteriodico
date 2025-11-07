import { z } from 'zod'

// Post Schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(200),
  slug: z.string()
    .min(1, 'El slug es requerido')
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug debe ser kebab-case'),
  excerpt: z.string().max(500).optional(),
  content: z.any(), // JSONB
  cover_url: z.string().url().optional().or(z.literal('')),
  cover_alt: z.string().max(200).optional(),
  cover_width: z.number().int().positive().optional(),
  cover_height: z.number().int().positive().optional(),
  status: z.enum(['draft', 'review', 'published']),
  reliability_label: z.string().max(100).optional(),
  categories: z.array(z.string().uuid()).min(1, 'Selecciona al menos una categoría'),
  tags: z.array(z.string().uuid()).optional(),
})

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid(),
})

// Comment Schemas
export const createCommentSchema = z.object({
  post_id: z.string().uuid(),
  content: z.string().min(1, 'El comentario no puede estar vacío').max(2000),
  parent_id: z.string().uuid().optional(),
})

export const updateCommentStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'approved', 'rejected']),
})

// Category Schemas
export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  slug: z.string()
    .min(1, 'El slug es requerido')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug debe ser kebab-case'),
  description: z.string().max(500).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
})

// Tag Schemas
export const tagSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  slug: z.string()
    .min(1, 'El slug es requerido')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug debe ser kebab-case'),
})

// Media Schema
export const uploadMediaSchema = z.object({
  file: z.instanceof(File),
  alt: z.string().min(1, 'El texto alternativo es requerido').max(200),
})

// Search Schema
export const searchSchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.number().int().positive().max(50).optional().default(20),
})

// Profile Schema
export const updateProfileSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional().or(z.literal('')),
})

// Auth Schemas
export const signUpSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  display_name: z.string().min(1, 'El nombre es requerido').max(100),
})

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})
