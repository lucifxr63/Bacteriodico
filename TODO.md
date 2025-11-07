# TODO - BACTERIÓDICO

## ✅ Completado

### Infraestructura Base
- [x] Configuración Next.js 14 + TypeScript
- [x] Configuración TailwindCSS + shadcn/ui
- [x] Package.json con todas las dependencias
- [x] Variables de entorno (.env.local.example)
- [x] Configuración ESLint y TypeScript

### Base de Datos
- [x] Schema completo (supabase/schema.sql)
- [x] Row Level Security policies (supabase/policies.sql)
- [x] Datos seed (supabase/seed.sql)
- [x] Tipos TypeScript generados

### Librerías Core
- [x] Supabase client (browser y server)
- [x] Sistema de autenticación
- [x] RBAC (Role-Based Access Control)
- [x] Validaciones con Zod
- [x] Helpers de SEO
- [x] Storage/Upload de archivos
- [x] Utilidades generales

### Páginas Públicas
- [x] Home (/)
- [x] Categorías dinámicas (/[category])
- [x] Detalle de post (/post/[slug])
- [x] Búsqueda (/search)
- [x] Layout global
- [x] Header responsive
- [x] Footer

### Componentes UI
- [x] Button
- [x] Card
- [x] Input
- [x] PostCard
- [x] Breadcrumbs
- [x] Analytics (Plausible/Umami)

### APIs
- [x] /api/search (Full-Text Search)
- [x] /api/og (Open Graph image generator)

### SEO
- [x] Metadatos dinámicos por página
- [x] Open Graph + Twitter Cards
- [x] JSON-LD (Organization, Article, Breadcrumbs)
- [x] Sitemap dinámico
- [x] robots.txt
- [x] Canonical URLs
- [x] Redirecciones 301 (schema)

### Testing & Validación
- [x] Configuración Playwright
- [x] Configuración Vitest
- [x] Scripts de validación SEO
- [x] Scripts de validación Core Web Vitals

### Documentación
- [x] README.md completo
- [x] SETUP.md (guía rápida)
- [x] LICENSE
- [x] Este TODO.md

## 🚧 Pendiente

### Panel Admin (/admin) - CRÍTICO

#### Dashboard
- [x] Crear `/src/app/(admin)/admin/page.tsx`
  - [x] Estadísticas (posts por estado, comentarios pendientes)
  - [x] Últimas publicaciones
  - [x] Acciones rápidas

#### CRUD de Posts
- [ ] Crear `/src/app/(admin)/admin/posts/page.tsx` (listado)
- [ ] Crear `/src/app/(admin)/admin/posts/new/page.tsx` (crear)
- [ ] Crear `/src/app/(admin)/admin/posts/[id]/page.tsx` (editar)
- [ ] Componente `PostEditor` con Tiptap
  - [ ] Toolbar completo
  - [ ] Botón "Insertar YouTube"
  - [ ] Upload de imágenes inline
  - [ ] Preview en tiempo real
- [ ] Selector de categorías (multi)
- [ ] Selector de tags (multi, con crear nuevo)
- [ ] Badge de confiabilidad
- [ ] Gestión de fuentes bibliográficas

#### CRUD de Categorías
- [ ] Crear `/src/app/(admin)/admin/categories/page.tsx`
- [ ] Formulario crear/editar categoría
- [ ] Color picker

#### CRUD de Tags
- [ ] Crear `/src/app/(admin)/admin/tags/page.tsx`
- [ ] Formulario crear/editar tag

#### Gestión de Comentarios
- [ ] Crear `/src/app/(admin)/admin/comments/page.tsx`
- [ ] Filtros por estado (pending/approved/rejected)
- [ ] Acciones aprobar/rechazar en masa

#### Gestión de Usuarios
- [ ] Crear `/src/app/(admin)/admin/users/page.tsx`
- [ ] Cambiar roles de usuarios
- [ ] Ver actividad por usuario

#### Gestión de Media
- [ ] Crear `/src/app/(admin)/admin/media/page.tsx`
- [ ] Galería de medios
- [ ] Upload múltiple
- [ ] Detalles de imagen (alt, dimensiones)
- [ ] Eliminar media

#### Configuración
- [ ] Crear `/src/app/(admin)/admin/settings/page.tsx`
- [ ] Ajustes generales del sitio
- [ ] Toggle de analíticas

#### Layout Admin
- [x] Crear `/src/app/(admin)/layout.tsx`
- [x] Sidebar de navegación
- [x] Protección de rutas (middleware)

### APIs Adicionales

#### Auth
- [ ] `/api/auth/signup` (registro)
- [x] `/login` (página de login)
- [x] `/api/auth/signout` (logout)

#### Posts
- [ ] `/api/posts` (GET: listar, POST: crear)
- [ ] `/api/posts/[id]` (GET, PUT, DELETE)
- [ ] `/api/posts/[id]/publish` (cambiar estado)

#### Comments
- [ ] `/api/comments` (POST: crear)
- [ ] `/api/comments/[id]` (PUT: moderar, DELETE)

#### Media
- [ ] `/api/media/sign` (firma para upload a Supabase Storage)
- [ ] `/api/media` (POST: guardar metadata después de upload)

#### Categories & Tags
- [ ] `/api/categories` (GET, POST)
- [ ] `/api/categories/[id]` (PUT, DELETE)
- [ ] `/api/tags` (GET, POST)
- [ ] `/api/tags/[id]` (PUT, DELETE)

#### Preview
- [ ] `/api/preview` (generar token de vista previa)

### Componentes UI Adicionales

#### shadcn/ui components faltantes
- [ ] Dialog
- [ ] Dropdown Menu
- [ ] Select
- [ ] Switch
- [ ] Tabs
- [ ] Toast/Toaster
- [ ] Label
- [ ] Separator
- [ ] Avatar
- [ ] Badge
- [ ] Checkbox
- [ ] Popover
- [ ] Accordion
- [ ] Alert Dialog

#### Componentes Específicos
- [ ] `MediaUploader` (con drag & drop)
- [ ] `TiptapEditor` (editor completo)
- [ ] `YouTubeButton` (botón para Tiptap)
- [ ] `DataTable` (tabla con sorting, paginación)
- [ ] `StatusBadge` (para estados de posts)
- [ ] `RoleSelect` (selector de roles)
- [ ] `ConfirmDialog` (confirmación de acciones)

### Tests

#### Tests E2E (Playwright)
- [ ] Test flujo completo editorial (draft → review → publish)
- [ ] Test sistema de comentarios
- [ ] Test búsqueda
- [ ] Test responsividad en 5 breakpoints
- [ ] Test metadatos SEO en posts
- [ ] Test permisos RLS

#### Tests Unitarios (Vitest)
- [ ] Tests helpers SEO
- [ ] Tests validaciones Zod
- [ ] Tests utilidades (slugify, etc.)
- [ ] Tests RBAC

### Optimizaciones

#### Performance
- [ ] Implementar ISR en Home (revalidate: 300)
- [ ] Implementar ISR en categorías (revalidate: 600)
- [ ] Lazy loading de componentes pesados
- [ ] Image optimization (blur placeholder)

#### SEO Adicional
- [ ] News sitemap (si publicamos muy seguido)
- [ ] Sitemap para tags
- [ ] Schema.org Event para sección Eventos
- [ ] hreflang tags (cuando se agregue otro idioma)

### Funcionalidades Opcionales

#### Comentarios
- [ ] Sistema de replies (comentarios anidados)
- [ ] Rate limiting con Upstash
- [ ] Notificaciones de comentarios nuevos

#### Editor
- [ ] Autoguardado de drafts
- [ ] Historial de versiones
- [ ] Colaboración en tiempo real (opcional)

#### Analytics Avanzadas
- [ ] Dashboard de métricas internas
- [ ] Tracking de vistas por post
- [ ] Popular posts widget

#### Misc
- [ ] Newsletter (integración con MailChimp/ConvertKit)
- [ ] RSS feed
- [ ] Modo oscuro toggle (ya preparado en CSS)
- [ ] PWA (Progressive Web App)

## 📝 Notas de Implementación

### Prioridad Alta (Hacer Primero)
1. Panel Admin - Dashboard básico
2. Editor Tiptap con botón YouTube
3. APIs de Posts (CRUD completo)
4. Middleware de protección de rutas admin
5. Tests E2E críticos

### Prioridad Media
1. APIs de Comments
2. APIs de Media
3. Gestión de usuarios
4. Tests unitarios

### Prioridad Baja (Nice to Have)
1. Funcionalidades opcionales
2. PWA
3. Newsletter
4. RSS

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Tests
npm run test
npm run test:e2e

# SEO/CWV
npm run check:seo
npm run check:cwv

# Regenerar tipos Supabase
npm run supabase:types
```

## ⚠️ Importante

Los errores de TypeScript actuales son **normales** y **esperados** porque las dependencias no están instaladas. Ejecuta `npm install` y desaparecerán.

## 🎯 Objetivo Final

Proyecto completamente funcional con:
- ✅ SEO Score ≥ 95
- ✅ Core Web Vitals "Good" (LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms)
- ✅ Totalmente responsivo (360px → 1536px+)
- ✅ Accesible (WCAG AA)
- ✅ Seguro (RLS, validación, sanitización)
- ✅ Testeado (E2E + unitarios)
