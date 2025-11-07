'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tag, 
  MessageSquare, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react'
import { getDevUser, clearDevUser, type DevUser } from '@/lib/dev-auth'

interface AdminLayoutClientProps {
  children: React.ReactNode
  serverUser?: {
    id: string
    email: string
  } | null
  serverProfile?: {
    role: string
    display_name: string
  } | null
}

export function AdminLayoutClient({ children, serverUser, serverProfile }: AdminLayoutClientProps) {
  const pathname = usePathname()
  const [devUser, setDevUser] = useState<DevUser | null>(null)

  useEffect(() => {
    // Solo en desarrollo, verificar si hay usuario simulado
    if (process.env.NODE_ENV === 'development') {
      const user = getDevUser()
      setDevUser(user)
    }
  }, [])

  // Usar usuario de desarrollo si existe, sino el servidor
  const currentUser = devUser || (serverProfile ? {
    id: serverUser?.id || '',
    email: serverUser?.email || '',
    role: serverProfile.role as 'admin' | 'editor' | 'autor' | 'lector',
    display_name: serverProfile.display_name,
  } : null)

  const handleDevLogout = () => {
    clearDevUser()
    // Eliminar cookie
    document.cookie = 'dev_user=; path=/; max-age=0'
    window.location.href = '/login'
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Posts', href: '/admin/posts', icon: FileText },
    { name: 'Categorías', href: '/admin/categories', icon: FolderOpen },
    { name: 'Tags', href: '/admin/tags', icon: Tag },
    { name: 'Comentarios', href: '/admin/comments', icon: MessageSquare },
    { name: 'Media', href: '/admin/media', icon: ImageIcon },
    ...(currentUser?.role === 'admin' ? [
      { name: 'Usuarios', href: '/admin/users', icon: Users },
      { name: 'Configuración', href: '/admin/settings', icon: Settings },
    ] : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🧫</span>
              <div>
                <span className="font-bold text-lg">BACTERIÓDICO</span>
                <p className="text-xs text-muted-foreground">Panel Admin</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {currentUser?.display_name?.charAt(0) || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentUser?.display_name || 'Usuario'}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {currentUser?.role || 'Sin rol'}
                  {devUser && <span className="ml-1 text-orange-600">(Dev)</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form action={devUser ? undefined : "/api/auth/signout"} method="POST">
              <button
                type={devUser ? "button" : "submit"}
                onClick={devUser ? handleDevLogout : undefined}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
