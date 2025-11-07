# Usuarios de Desarrollo - BACTERIÓDICO

Este documento explica cómo configurar los usuarios de desarrollo para testing del panel admin.

## 🔐 Usuarios de Desarrollo

El sistema incluye 4 usuarios demo con diferentes roles:

| Rol | Email | Password | Permisos |
|-----|-------|----------|----------|
| **Admin** | admin@bacteriodico.cl | admin123 | Acceso total al sistema |
| **Editor** | editor@bacteriodico.cl | editor123 | Puede editar y publicar posts |
| **Autor** | autor@bacteriodico.cl | autor123 | Puede crear y editar sus propios posts |
| **Lector** | lector@bacteriodico.cl | lector123 | Solo lectura |

## 🚀 Configuración Inicial

### 1. Crear Usuarios en Supabase

Ve a tu proyecto Supabase: https://app.supabase.com/project/kbjpprpqfyfmudhendoj

**Authentication** → **Users** → **Add user** (para cada usuario)

#### Usuario Admin
- Email: `admin@bacteriodico.cl`
- Password: `admin123`
- ✅ Auto Confirm User

#### Usuario Editor
- Email: `editor@bacteriodico.cl`
- Password: `editor123`
- ✅ Auto Confirm User

#### Usuario Autor
- Email: `autor@bacteriodico.cl`
- Password: `autor123`
- ✅ Auto Confirm User

#### Usuario Lector
- Email: `lector@bacteriodico.cl`
- Password: `lector123`
- ✅ Auto Confirm User

### 2. Asignar Roles

En **SQL Editor** de Supabase, ejecuta el archivo `supabase/dev-users.sql`:

```sql
-- Ejecuta el contenido completo del archivo dev-users.sql
```

Este script asigna los roles apropiados a cada usuario.

### 3. Verificar

Ejecuta esta query para verificar que los usuarios se crearon correctamente:

```sql
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
```

## 🎨 Usando el Login de Desarrollo

Cuando ejecutas el proyecto en modo desarrollo (`npm run dev`), verás **botones de acceso rápido** en la página de login:

```
http://localhost:3000/login
```

Simplemente haz clic en el botón del rol que quieres probar:

- **Botón Rojo** → Admin
- **Botón Azul** → Editor  
- **Botón Verde** → Autor
- **Botón Gris** → Lector

Estos botones solo aparecen en **desarrollo**, en producción se ocultan automáticamente.

## 🔒 Permisos por Rol

### Admin
- ✅ Ver/Crear/Editar/Eliminar posts de todos
- ✅ Cambiar estados de publicación
- ✅ Gestionar categorías y tags
- ✅ Moderar comentarios
- ✅ Gestionar usuarios
- ✅ Acceso a configuración

### Editor
- ✅ Ver/Crear/Editar posts de todos
- ✅ Publicar posts
- ✅ Moderar comentarios
- ⚠️ No puede gestionar usuarios
- ⚠️ No puede acceder a configuración

### Autor
- ✅ Ver todos los posts
- ✅ Crear posts propios
- ✅ Editar solo sus posts
- ⚠️ No puede publicar (solo draft/review)
- ⚠️ No puede editar posts de otros
- ⚠️ No puede gestionar comentarios

### Lector
- ✅ Ver contenido público
- ⚠️ Sin acceso al admin
- ⚠️ Sin permisos de escritura

## ⚠️ Importante

**NUNCA uses estos usuarios en producción.** Son solo para desarrollo y testing.

En producción:
1. Elimina estos usuarios
2. Cambia las contraseñas
3. Los botones de acceso rápido se ocultan automáticamente (`NODE_ENV === 'production'`)

## 🧪 Testing de Permisos

Para probar el sistema RBAC:

1. Inicia sesión como **Autor**
2. Ve a `/admin/posts`
3. Intenta editar un post de otro autor → Debería ser bloqueado
4. Cierra sesión
5. Inicia sesión como **Editor**
6. Intenta editar el mismo post → Debería funcionar

## 🔄 Resetear Usuarios

Si necesitas resetear los usuarios de desarrollo:

```sql
-- Eliminar usuarios
DELETE FROM auth.users 
WHERE email IN (
  'admin@bacteriodico.cl',
  'editor@bacteriodico.cl',
  'autor@bacteriodico.cl',
  'lector@bacteriodico.cl'
);
```

Luego repite el proceso de configuración inicial.
