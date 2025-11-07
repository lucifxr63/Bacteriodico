import { Database } from '@/types/supabase'

type UserRole = Database['public']['Enums']['user_role']

const roleHierarchy: Record<UserRole, number> = {
  'lector': 0,
  'autor': 1,
  'editor': 2,
  'admin': 3,
}

export const canPerformAction = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const canEditPost = (
  userRole: UserRole,
  postAuthorId: string,
  userId: string
): boolean => {
  // Admin y editor pueden editar cualquier post
  if (canPerformAction(userRole, 'editor')) {
    return true
  }

  // Autor solo puede editar sus propios posts
  if (userRole === 'autor' && postAuthorId === userId) {
    return true
  }

  return false
}

export const canPublishPost = (userRole: UserRole): boolean => {
  return canPerformAction(userRole, 'editor')
}

export const canApproveComment = (userRole: UserRole): boolean => {
  return canPerformAction(userRole, 'editor')
}

export const canDeleteMedia = (userRole: UserRole): boolean => {
  return userRole === 'admin'
}

export const canViewAuditLogs = (userRole: UserRole): boolean => {
  return userRole === 'admin'
}
