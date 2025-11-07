import { createClient, createServiceClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PostCard } from '@/components/post-card'
import { generateMetadata as genMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient()
  
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.category)
    .single()

  if (!category) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bacteriodico.cl'

  return genMetadata({
    title: category.name,
    description: category.description || `Descubre contenido sobre ${category.name.toLowerCase()} en BACTERIÓDICO`,
    url: `${siteUrl}/${category.slug}`,
  })
}

export default async function CategoryPage({ params }: PageProps) {
  const supabase = await createClient()

  // Obtener categoría
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.category)
    .single()

  if (!category) {
    notFound()
  }

  // Obtener posts de la categoría
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(display_name, avatar_url),
      post_categories!inner(category_id),
      categories:post_categories(category:categories(*))
    `)
    .eq('status', 'published')
    .eq('post_categories.category_id', category.id)
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="mb-12 text-center">
            <h1 
              className="text-fluid-4xl font-bold mb-4"
              style={{ color: category.color || undefined }}
            >
              {category.name}
            </h1>
            {category.description && (
              <p className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </header>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No hay publicaciones en esta categoría todavía.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const supabase = createServiceClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select('slug')

  return categories?.map((cat) => ({
    category: cat.slug,
  })) || []
}
