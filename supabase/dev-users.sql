-- ============================================================================
-- USUARIOS DE DESARROLLO - BACTERIÓDICO
-- ============================================================================
-- Este script crea usuarios de desarrollo para testing
-- ⚠️ SOLO USAR EN DESARROLLO - NUNCA EN PRODUCCIÓN

-- Nota: Estos usuarios deben ser creados manualmente en Supabase Authentication
-- porque la creación de usuarios auth requiere la API de Supabase Auth, no SQL directo

-- Sin embargo, puedes promover usuarios existentes con este SQL:

-- ============================================================================
-- PROMOVER USUARIOS A ROLES ESPECÍFICOS
-- ============================================================================

-- 1. Admin: admin@bacteriodico.cl
UPDATE profiles 
SET 
  role = 'admin',
  display_name = 'Admin Demo',
  bio = 'Usuario administrador de desarrollo'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@bacteriodico.cl'
);

-- 2. Editor: editor@bacteriodico.cl
UPDATE profiles 
SET 
  role = 'editor',
  display_name = 'Editor Demo',
  bio = 'Usuario editor de desarrollo'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'editor@bacteriodico.cl'
);

-- 3. Autor: autor@bacteriodico.cl
UPDATE profiles 
SET 
  role = 'autor',
  display_name = 'Autor Demo',
  bio = 'Usuario autor de desarrollo'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'autor@bacteriodico.cl'
);

-- 4. Lector: lector@bacteriodico.cl
UPDATE profiles 
SET 
  role = 'lector',
  display_name = 'Lector Demo',
  bio = 'Usuario lector de desarrollo'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'lector@bacteriodico.cl'
);

-- ============================================================================
-- VERIFICAR USUARIOS CREADOS
-- ============================================================================
SELECT 
  u.email,
  p.role,
  p.display_name,
  p.created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email IN (
  'admin@bacteriodico.cl',
  'editor@bacteriodico.cl', 
  'autor@bacteriodico.cl',
  'lector@bacteriodico.cl'
)
ORDER BY u.email;
