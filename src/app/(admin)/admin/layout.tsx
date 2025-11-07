import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { AdminLayoutClient } from '@/components/admin-layout-client'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // En desarrollo, verificar si hay usuario de desarrollo
  if (process.env.NODE_ENV === 'development') {
    const cookieStore = await cookies()
    const devUserCookie = cookieStore.get('dev_user')
    
    if (devUserCookie) {
      // Permitir acceso con usuario de desarrollo
      return <AdminLayoutClient>{children}</AdminLayoutClient>
    }
  }

  // Autenticación normal con Supabase
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login?redirectTo=/admin')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <AdminLayoutClient 
      serverUser={user} 
      serverProfile={profile}
    >
      {children}
    </AdminLayoutClient>
  )
}
