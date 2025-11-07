import { createClient } from '@/lib/supabase/server'
import { PostCard } from '@/components/post-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { generateOrganizationSchema } from '@/lib/seo'

export const revalidate = 300 // 5 minutos

export default async function HomePage() {
  const supabase = await createClient()

  // Obtener posts destacados (últimos publicados)
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(display_name, avatar_url),
      categories:post_categories(category:categories(*))
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6)

  const orgSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center space-y-4">
                <h1 className="text-fluid-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  🧫 BACTERIÓDICO
                </h1>
                <p className="text-fluid-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Te acercamos al mundo de los microorganismos 🦠
                  <br />
                  Charlas y talleres gratuitos 🔬
                  <br />
                  Somos profesionales en ciencias básicas y salud 🌟
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button asChild size="lg">
                    <Link href="/noticias">Ver Noticias</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/eventos">Próximos Eventos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Posts */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-fluid-3xl font-bold">Últimas Publicaciones</h2>
                <Button asChild variant="ghost">
                  <Link href="/noticias">Ver todas →</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-12 md:py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-fluid-3xl font-bold mb-8 text-center">
                Explora por Categoría
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {['Noticias', 'Divulgación', 'Eventos', 'Entrevistas', 'Recursos'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase()}`}
                    className="group p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {cat}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
