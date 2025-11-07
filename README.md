# 🧫 BACTERIÓDICO

Blog universitario de salud enfocado en microbiología y ciencias de la salud.

**Lema:** Bacteriódico te acerca al mundo de los microorganismos 🦠 Charlas y talleres gratuitos 🔬 Somos profesionales en ciencias básicas y salud 🌟

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de Supabase](#configuración-de-supabase)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Desarrollo](#desarrollo)
- [Despliegue](#despliegue)
- [SEO y Rendimiento](#seo-y-rendimiento)
- [Testing](#testing)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Seguridad](#seguridad)

## ✨ Características

### Funcionalidades Principales
- ✅ **Sistema de publicaciones** con estados (draft → review → published)
- ✅ **Categorías**: Noticias, Divulgación, Eventos, Entrevistas, Recursos
- ✅ **Editor de contenido** Tiptap con soporte para YouTube
- ✅ **Búsqueda Full-Text** en español (PostgreSQL)
- ✅ **Sistema de comentarios** con moderación
- ✅ **Gestión de medios** con Supabase Storage
- ✅ **Roles de usuario**: lector, autor, editor, admin
- ✅ **Etiquetas de confiabilidad** para artículos científicos
- ✅ **Referencias bibliográficas** (DOI, PMID, URLs)

### SEO Optimizado (Score ≥ 95)
- ✅ **Metadatos dinámicos** por página
- ✅ **Open Graph y Twitter Cards**
- ✅ **JSON-LD** (Organization, Article, Event, Breadcrumbs)
- ✅ **Sitemaps XML** automáticos (posts, categorías, tags)
- ✅ **Imágenes OG dinámicas** generadas server-side
- ✅ **Redirecciones 301** al cambiar slugs
- ✅ **robots.txt** configurado
- ✅ **Canonical URLs**
- ✅ **i18n-ready** (base es-CL)

### Core Web Vitals "Good"
- ✅ **LCP ≤ 2.5s**: `next/image` con priority, preload de fuentes
- ✅ **CLS ≤ 0.1**: dimensiones explícitas de imágenes
- ✅ **INP ≤ 200ms**: optimización de interactividad
- ✅ **ISR** (Incremental Static Regeneration) en Home y categorías
- ✅ **Preconnect/DNS-prefetch** a servicios externos

### Responsividad Total
- ✅ **Mobile-first** con Tailwind CSS
- ✅ **Tipografía fluida** con `clamp()`
- ✅ **Breakpoints testados**: 360px, 768px, 1024px, 1280px, 1536px
- ✅ **Navbar responsive** con menú hamburguesa accesible
- ✅ **Imágenes responsivas** con `sizes` optimizados
- ✅ **Modo oscuro** (opcional)

## 🛠 Stack Tecnológico

### Frontend
- **Next.js 14** (App Router, React Server Components)
- **React 18** + TypeScript
- **TailwindCSS** + **shadcn/ui**
- **Tiptap** (Editor WYSIWYG)
- **Lucide React** (Iconos)

### Backend
- **Supabase**
  - PostgreSQL (Base de datos)
  - Row Level Security (RLS)
  - Storage (Archivos)
  - Auth (Autenticación)
  - Full-Text Search

### Validación y Testing
- **Zod** (Validación de schemas)
- **Vitest** (Tests unitarios)
- **Playwright** (Tests E2E)

### Analíticas (Opcional)
- **Plausible** o **Umami**

## 📦 Requisitos Previos

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x o **pnpm** ≥ 8.x
- **Cuenta de Supabase** (gratuita)
- **Supabase CLI** (opcional, para desarrollo local)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bacteriodico.git
cd bacteriodico
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
```

## 🗄️ Configuración de Supabase

### Opción A: Supabase Cloud (Recomendado)

1. **Crear un proyecto** en [supabase.com](https://supabase.com)

2. **Ejecutar el schema**:
   - Ve a SQL Editor en tu proyecto Supabase
   - Copia y ejecuta `supabase/schema.sql`
   - Luego ejecuta `supabase/policies.sql`
   - Finalmente ejecuta `supabase/seed.sql`

3. **Configurar Storage**:
   - Ve a Storage → Create bucket
   - Nombre: `media`
   - Public bucket: ✅ Sí
   - File size limit: 50 MB

4. **Obtener credenciales**:
   - Settings → API
   - Copia `Project URL` y `anon public` key

### Opción B: Supabase Local (Desarrollo)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar Supabase localmente
supabase start

# Aplicar migraciones
supabase db reset

# Generar tipos TypeScript
npm run supabase:types
```

## ⚙️ Configuración del Proyecto

### 1. Variables de entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Completa las variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Site
NEXT_PUBLIC_SITE_URL=https://bacteriodico.cl
NEXT_PUBLIC_SITE_NAME=BACTERIÓDICO
NEXT_PUBLIC_SITE_DESCRIPTION=Bacteriódico te acerca al mundo de los microorganismos...

# Analytics (opcional)
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=bacteriodico.cl
# O para Umami:
# NEXT_PUBLIC_ANALYTICS_PROVIDER=umami
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=tu-website-id

# Preview (para vista previa de drafts)
PREVIEW_SECRET=un-secreto-aleatorio-seguro
```

### 2. Promover usuario a Admin

Después de registrar tu primer usuario:

```sql
-- En Supabase SQL Editor
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'admin@bacteriodico.cl'
);
```

## 💻 Desarrollo

```bash
# Modo desarrollo
npm run dev

# El sitio estará en http://localhost:3000
# Admin en http://localhost:3000/admin
```

### Regenerar tipos de Supabase

Después de modificar el schema:

```bash
npm run supabase:types
```

## 🚢 Despliegue

### Vercel (Recomendado)

1. **Conecta tu repositorio** en [vercel.com](https://vercel.com)

2. **Configura las variables de entorno** (usa las mismas de `.env.local`)

3. **Deploy**:
   - Vercel detectará automáticamente Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Configura el dominio** (ej: bacteriodico.cl)

### Otras plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- **Netlify**
- **Railway**
- **Fly.io**
- **Cloudflare Pages**

## 🎯 SEO y Rendimiento

### Validar SEO

```bash
# Lighthouse CI (requiere configuración)
npm run check:seo

# Manualmente con Chrome DevTools
# 1. Abre Chrome DevTools
# 2. Ve a Lighthouse
# 3. Selecciona SEO, Performance, Accessibility
# 4. Run audit
```

### Validar Core Web Vitals

```bash
# En producción
npm run check:cwv

# Manualmente con:
# - PageSpeed Insights: https://pagespeed.web.dev/
# - Chrome DevTools → Performance
# - Web Vitals extension para Chrome
```

### Mejores prácticas implementadas

1. **Imágenes**:
   - Usa `next/image` siempre
   - Define `width`, `height`, `alt`
   - Usa `sizes` según breakpoints
   - `priority` en imágenes LCP
   - `loading="lazy"` en imágenes below-the-fold

2. **Fuentes**:
   - `next/font/google` con `display: swap`
   - Preload de fuentes críticas

3. **JavaScript**:
   - Code splitting automático por Next.js
   - Componentes Client solo cuando necesario
   - `use client` mínimo

4. **Caché**:
   - ISR en páginas estáticas
   - `revalidate` configurado por tipo de contenido

## 🧪 Testing

### Tests unitarios (Vitest)

```bash
npm run test

# Con UI
npm run test:ui

# Con coverage
npm run test -- --coverage
```

### Tests E2E (Playwright)

```bash
# Instalar navegadores
npx playwright install

# Ejecutar tests
npm run test:e2e

# Modo UI
npx playwright test --ui

# Solo en Chrome
npx playwright test --project=chromium
```

### Tests mínimos implementados

- ✅ Flujo editorial (draft → review → published)
- ✅ Sistema de comentarios (pending → approved)
- ✅ Búsqueda FTS
- ✅ Permisos RLS
- ✅ Metadatos SEO en posts
- ✅ Responsividad en 5 breakpoints

## 📁 Estructura del Proyecto

```
bacteriodico/
├── public/
│   ├── robots.txt              # SEO
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (public)/           # Rutas públicas
│   │   │   ├── [category]/     # Páginas por categoría
│   │   │   ├── post/[slug]/    # Detalle de post
│   │   │   └── search/         # Búsqueda
│   │   ├── (admin)/            # Panel admin (protegido)
│   │   │   └── admin/          # CRUD completo
│   │   ├── api/                # API Routes
│   │   │   ├── search/         # Búsqueda FTS
│   │   │   ├── og/             # OG Image generator
│   │   │   └── ...
│   │   ├── layout.tsx          # Layout global
│   │   ├── page.tsx            # Home
│   │   ├── sitemap.ts          # Sitemap dinámico
│   │   ├── robots.ts           # robots.txt
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── post-card.tsx
│   │   ├── breadcrumbs.tsx
│   │   └── analytics.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Cliente browser
│   │   │   └── server.ts       # Cliente server
│   │   ├── auth.ts             # Helpers de auth
│   │   ├── rbac.ts             # Role-based access control
│   │   ├── seo.ts              # Helpers SEO
│   │   ├── storage.ts          # Upload de archivos
│   │   ├── validations.ts      # Schemas Zod
│   │   └── utils.ts
│   └── types/
│       └── supabase.ts         # Tipos generados
├── supabase/
│   ├── schema.sql              # Schema de BD
│   ├── policies.sql            # RLS policies
│   ├── seed.sql                # Datos iniciales
│   └── config.toml             # Config local
├── scripts/
│   ├── check-seo.js            # Validación SEO
│   └── check-cwv.js            # Validación CWV
├── tests/
│   ├── unit/                   # Tests Vitest
│   └── e2e/                    # Tests Playwright
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Construye para producción |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Tests unitarios con Vitest |
| `npm run test:e2e` | Tests E2E con Playwright |
| `npm run check:seo` | Valida SEO con Lighthouse |
| `npm run check:cwv` | Valida Core Web Vitals |
| `npm run supabase:types` | Regenera tipos de Supabase |

## 🔒 Seguridad

### Mejores Prácticas Implementadas

1. **NO exponer `SUPABASE_SERVICE_ROLE_KEY`** en el cliente
   - Solo usar en server components y API routes
   - Nunca en `NEXT_PUBLIC_*`

2. **Row Level Security (RLS)** habilitado en todas las tablas
   - Policies específicas por rol
   - Validación en servidor Y base de datos

3. **Validación de entrada** con Zod
   - En API routes
   - En forms del cliente

4. **Rate limiting** en comentarios
   - Implementar con Upstash Rate Limit (opcional)

5. **Content Security Policy** (opcional)
   - Configurar en `next.config.js`

6. **Sanitización de HTML**
   - Tiptap genera JSON seguro
   - DOMPurify si se renderiza HTML directo

### Variables Sensibles

❌ **NUNCA commitear**:
- `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PREVIEW_SECRET`
- Credenciales de analíticas

✅ **Sí commitear**:
- `.env.local.example` (sin valores reales)
- Configuraciones públicas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**BACTERIÓDICO** - Blog Universitario de Salud

- Website: https://bacteriodico.cl
- Email: contacto@bacteriodico.cl

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Tiptap](https://tiptap.dev/) - Editor WYSIWYG
- [Lucide](https://lucide.dev/) - Iconos

---

Hecho con ❤️ por profesionales en ciencias básicas y salud 🔬