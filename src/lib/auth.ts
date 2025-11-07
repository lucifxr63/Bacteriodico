import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const supabase = createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
})

export const getCurrentProfile = cache(async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    return null
  }

  const supabase = createClient()
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
})

export const requireAuth = async () => {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }

  return user
}

export const requireRole = async (roles: string | string[]) => {
  const profile = await getCurrentProfile()
  
  if (!profile) {
    redirect('/login')
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles]
  
  if (!allowedRoles.includes(profile.role)) {
    redirect('/')
  }

  return profile
}
