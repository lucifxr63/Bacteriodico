import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { formatDate } from '@/lib/utils'
import { generateMetadata as genMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Clock, User, Calendar } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bacteriodico.cl'
  const ogImage = post.cover_url || `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`

  return genMetadata({
    title: post.title,
    description: post.excerpt || undefined,
    image: ogImage,
    url: `${siteUrl}/post/${post.slug}`,
    type: 'article',
    publishedTime: post.published_at || undefined,
    modifiedTime: post.updated_at,
    noindex: post.status !== 'published',
  })
}

export default async function PostPage({ params }: PageProps) {
  const supabase = await createClient()

  // Verificar redirecciones de slug
  const { data: redirect_data } = await supabase
    .from('slug_redirects')
    .select('new_slug')
    .eq('old_slug', params.slug)
    .single()

  if (redirect_data) {
    redirect(`/post/${redirect_data.new_slug}`, 'replace')
  }

  // Obtener post con relaciones
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(display_name, avatar_url),
      categories:post_categories(category:categories(*)),
      tags:post_tags(tag:tags(*)),
      sources(*)
    `)
    .eq('slug', params.slug)
    .single()

  if (!post) {
    notFound()
  }

  // Solo mostrar posts publicados (o en preview si hay token)
  if (post.status !== 'published') {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bacteriodico.cl'
  
  // Schemas JSON-LD
  const breadcrumbItems = [
    { name: post.categories?.[0]?.category?.name || 'Blog', url: `/${post.categories?.[0]?.category?.slug || 'blog'}` },
    { name: post.title, url: `/post/${post.slug}` },
  ]

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt || '',
    image: post.cover_url || `${siteUrl}/og-image.png`,
    publishedTime: post.published_at || post.created_at,
    modifiedTime: post.updated_at,
    author: post.author?.display_name || 'BACTERIÓDICO',
    url: `${siteUrl}/post/${post.slug}`,
    tags: post.tags?.map((t: any) => t.tag.name) || [],
  })

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <article className="py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <Breadcrumbs items={breadcrumbItems} />

              <header className="mt-8 mb-8">
                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories?.map(({ category }: any) => (
                    <span
                      key={category.id}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: category.color + '20',
                        color: category.color,
                      }}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-fluid-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-fluid-lg text-muted-foreground mb-6">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta información */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {post.author?.display_name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author.display_name}</span>
                    </div>
                  )}
                  {post.published_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.published_at}>
                        {formatDate(post.published_at)}
                      </time>
                    </div>
                  )}
                  {post.reading_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.reading_time} min de lectura</span>
                    </div>
                  )}
                </div>

                {post.reliability_label && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      ✓ {post.reliability_label}
                    </p>
                  </div>
                )}
              </header>

              {/* Imagen de portada */}
              {post.cover_url && (
                <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={post.cover_url}
                    alt={post.cover_alt || post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </div>
              )}

              {/* Contenido del artículo */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                {/* Aquí renderizarías el contenido de Tiptap */}
                <div dangerouslySetInnerHTML={{ __html: JSON.stringify(post.content) }} />
              </div>

              {/* Fuentes */}
              {post.sources && post.sources.length > 0 && (
                <section className="mt-12 pt-8 border-t">
                  <h2 className="text-2xl font-bold mb-4">Fuentes</h2>
                  <ul className="space-y-2">
                    {post.sources.map((source: any) => (
                      <li key={source.id} className="text-sm">
                        <a
                          href={source.type === 'doi' ? `https://doi.org/${source.value}` : source.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {source.title || source.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(({ tag }: any) => (
                      <span
                        key={tag.id}
                        className="text-xs px-3 py-1 bg-muted rounded-full"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}
