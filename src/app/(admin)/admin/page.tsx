import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, MessageSquare, Eye, Users } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Estadísticas
  const [
    { count: totalPosts },
    { count: draftPosts },
    { count: publishedPosts },
    { count: pendingComments },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  // Últimos posts
  const { data: recentPosts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!posts_author_id_fkey(display_name),
      categories:post_categories(category:categories(name))
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      name: 'Total de Posts',
      value: totalPosts || 0,
      icon: FileText,
      color: 'bg-blue-500',
      link: '/admin/posts',
    },
    {
      name: 'Borradores',
      value: draftPosts || 0,
      icon: FileText,
      color: 'bg-yellow-500',
      link: '/admin/posts?status=draft',
    },
    {
      name: 'Publicados',
      value: publishedPosts || 0,
      icon: Eye,
      color: 'bg-green-500',
      link: '/admin/posts?status=published',
    },
    {
      name: 'Comentarios Pendientes',
      value: pendingComments || 0,
      icon: MessageSquare,
      color: 'bg-orange-500',
      link: '/admin/comments',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido al panel de administración de BACTERIÓDICO
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.link}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Últimos Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {recentPosts && recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{post.author?.display_name || 'Sin autor'}</span>
                      <span>•</span>
                      <span className="capitalize">{post.status}</span>
                      {post.categories?.[0]?.category && (
                        <>
                          <span>•</span>
                          <span>{post.categories[0].category.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Editar →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No hay posts todavía</p>
              <Link
                href="/admin/posts/new"
                className="inline-block mt-4 text-sm text-primary hover:underline"
              >
                Crear tu primer post →
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Acciones Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/posts/new">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Crear Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Escribe un nuevo artículo para el blog
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/media">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestiona imágenes y archivos
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/comments">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comentarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modera comentarios pendientes
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
