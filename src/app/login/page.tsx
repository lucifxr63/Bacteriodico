'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { setDevUser, DEV_USERS, isDevMode } from '@/lib/dev-auth'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      router.push(redirectTo)
      router.refresh()
    }
  }

  const handleDevLogin = (roleKey: keyof typeof DEV_USERS) => {
    setLoading(true)
    setError('')

    // Establecer usuario de desarrollo en localStorage
    setDevUser(roleKey)
    
    // Redirigir al admin
    setTimeout(() => {
      router.push(redirectTo)
      router.refresh()
    }, 300)
  }

  // Usuarios de desarrollo para los botones
  const devUsers = [
    { role: 'Admin', key: 'admin' as const, color: 'bg-red-600 hover:bg-red-700' },
    { role: 'Editor', key: 'editor' as const, color: 'bg-blue-600 hover:bg-blue-700' },
    { role: 'Autor', key: 'autor' as const, color: 'bg-green-600 hover:bg-green-700' },
    { role: 'Lector', key: 'lector' as const, color: 'bg-gray-600 hover:bg-gray-700' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl">🧫</span>
          </div>
          <CardTitle className="text-2xl text-center">BACTERIÓDICO</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales para acceder al panel de administración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@bacteriodico.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Acceso rápido para desarrollo */}
          {isDevMode() && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
                    Modo Desarrollo - Sin autenticación
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {devUsers.map((user) => (
                  <Button
                    key={user.key}
                    type="button"
                    variant="secondary"
                    size="sm"
                    className={`${user.color} text-white`}
                    onClick={() => handleDevLogin(user.key)}
                    disabled={loading}
                  >
                    {user.role}
                  </Button>
                ))}
              </div>

              <p className="text-xs text-center text-muted-foreground mt-2">
                Click para simular usuario sin autenticación real
              </p>
            </>
          )}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <a
              href="/"
              className="text-primary hover:underline"
            >
              ← Volver al inicio
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
