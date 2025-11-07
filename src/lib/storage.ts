import { createClient } from '@/lib/supabase/client'
import { getImageDimensions } from './utils'

const BUCKET_NAME = 'media'
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export async function uploadFile(
  file: File,
  path?: string
): Promise<{ url: string; path: string }> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('El archivo excede el tamaño máximo de 50MB')
  }

  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = path ? `${path}/${fileName}` : fileName

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '31536000',
      upsert: false,
    })

  if (error) {
    throw new Error(`Error al subir archivo: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

export async function deleteFile(path: string): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) {
    throw new Error(`Error al eliminar archivo: ${error.message}`)
  }
}

export async function uploadImage(
  file: File,
  alt: string
): Promise<{
  url: string
  alt: string
  width: number
  height: number
  mime: string
}> {
  // Validar que sea una imagen
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo debe ser una imagen')
  }

  // Obtener dimensiones
  const dimensions = await getImageDimensions(file)

  // Subir archivo
  const { url } = await uploadFile(file, 'images')

  return {
    url,
    alt,
    width: dimensions.width,
    height: dimensions.height,
    mime: file.type,
  }
}

export function getPublicUrl(path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)
  
  return data.publicUrl
}
