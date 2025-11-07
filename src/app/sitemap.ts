import { createServiceClient } from '@/lib/supabase/server'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bacteriodico.cl'
  const supabase = createServiceClient()

  // Páginas estáticas
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Categorías
  const { data: categories } = await supabase
    .from('categories')
    .select('slug, updated_at')

  const categoryPages = categories?.map((cat) => ({
    url: `${siteUrl}/${cat.slug}`,
    lastModified: new Date(cat.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  // Posts publicados
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const postPages = posts?.map((post) => ({
    url: `${siteUrl}/post/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || []

  return [...staticPages, ...categoryPages, ...postPages]
}
