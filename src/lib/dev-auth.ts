/**
 * Sistema de autenticación simulada para desarrollo
 * ⚠️ SOLO para desarrollo - NO usar en producción
 */

export type DevUser = {
  id: string
  email: string
  role: 'admin' | 'editor' | 'autor' | 'lector'
  display_name: string
}

export const DEV_USERS: Record<string, DevUser> = {
  admin: {
    id: 'dev-admin-001',
    email: 'admin@bacteriodico.cl',
    role: 'admin',
    display_name: 'Admin Demo',
  },
  editor: {
    id: 'dev-editor-001',
    email: 'editor@bacteriodico.cl',
    role: 'editor',
    display_name: 'Editor Demo',
  },
  autor: {
    id: 'dev-autor-001',
    email: 'autor@bacteriodico.cl',
    role: 'autor',
    display_name: 'Autor Demo',
  },
  lector: {
    id: 'dev-lector-001',
    email: 'lector@bacteriodico.cl',
    role: 'lector',
    display_name: 'Lector Demo',
  },
}

const DEV_USER_KEY = 'dev_user'

/**
 * Establece un usuario de desarrollo en localStorage y cookie
 */
export function setDevUser(role: keyof typeof DEV_USERS): void {
  if (typeof window === 'undefined') return
  
  const user = DEV_USERS[role]
  if (user) {
    const userJson = JSON.stringify(user)
    localStorage.setItem(DEV_USER_KEY, userJson)
    // También establecer cookie para el middleware
    document.cookie = `dev_user=${encodeURIComponent(userJson)}; path=/; max-age=86400`
  }
}

/**
 * Obtiene el usuario de desarrollo actual
 */
export function getDevUser(): DevUser | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userStr = localStorage.getItem(DEV_USER_KEY)
    if (!userStr) return null
    
    return JSON.parse(userStr) as DevUser
  } catch {
    return null
  }
}

/**
 * Limpia el usuario de desarrollo
 */
export function clearDevUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(DEV_USER_KEY)
}

/**
 * Verifica si estamos en modo desarrollo
 */
export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Verifica si el usuario actual es un usuario de desarrollo
 */
export function isDevUser(userId?: string): boolean {
  if (!isDevMode()) return false
  if (!userId) return false
  
  return userId.startsWith('dev-')
}
