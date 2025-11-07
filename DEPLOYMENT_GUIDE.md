# Guía de Despliegue - BACTERIÓDICO

## 📋 Pre-requisitos

- [x] Cuenta Supabase (gratuita)
- [x] Cuenta Vercel (gratuita)  
- [x] Dominio configurado (opcional: bacteriodico.cl)
- [x] Código en repositorio Git

## 🗄️ 1. Configurar Supabase

### 1.1 Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Rellena:
   - Name: `bacteriodico`
   - Database Password: (guarda esta contraseña)
   - Region: South America (São Paulo) o el más cercano
   - Pricing Plan: Free

### 1.2 Ejecutar Schema

En SQL Editor:

```sql
-- 1. Copiar y ejecutar supabase/schema.sql
-- Esto crea todas las tablas, índices, funciones y triggers

-- 2. Copiar y ejecutar supabase/policies.sql  
-- Esto habilita RLS y crea todas las policies

-- 3. Copiar y ejecutar supabase/seed.sql
-- Esto crea categorías y tags iniciales
```

### 1.3 Configurar Storage

1. Ve a Storage → Create bucket
2. Config:
   - Name: `media`
   - Public bucket: ✅ Activado
   - Allowed MIME types: `image/*`
   - Max file size: `50 MB`

### 1.4 Obtener Credenciales

Ve a Settings → API:

```env
Project URL: https://xxxxx.supabase.co
anon public: eyJxxx...
service_role: eyJxxx...  # ⚠️ NUNCA compartir
```

## 🚀 2. Desplegar en Vercel

### 2.1 Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import tu repositorio Git
4. Vercel detectará automáticamente Next.js

### 2.2 Configurar Variables de Entorno

En Project Settings → Environment Variables, agrega:

#### Variables Obligatorias

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

NEXT_PUBLIC_SITE_URL=https://bacteriodico.cl
NEXT_PUBLIC_SITE_NAME=BACTERIÓDICO
NEXT_PUBLIC_SITE_DESCRIPTION=Bacteriódico te acerca al mundo de los microorganismos. Charlas y talleres gratuitos. Somos profesionales en ciencias básicas y salud.

PREVIEW_SECRET=genera-un-secreto-aleatorio-aqui
```

#### Variables Opcionales (Analytics)

**Para Plausible:**
```env
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=bacteriodico.cl
```

**Para Umami:**
```env
NEXT_PUBLIC_ANALYTICS_PROVIDER=umami
NEXT_PUBLIC_UMAMI_WEBSITE_ID=tu-website-id
NEXT_PUBLIC_UMAMI_SRC=https://analytics.umami.is/script.js
```

### 2.3 Configurar Build

Build Settings (autodetectado):
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 2.4 Deploy

1. Click "Deploy"
2. Espera ~2-3 minutos
3. ✅ Tu sitio estará en `https://tu-proyecto.vercel.app`

## 🌐 3. Configurar Dominio

### 3.1 En Vercel

1. Project Settings → Domains
2. Add Domain: `bacteriodico.cl`
3. Vercel te dará registros DNS a configurar

### 3.2 En tu Proveedor DNS

Agrega estos registros:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

Espera ~5-15 minutos para propagación DNS.

### 3.3 Actualizar Variables

Cambia en Vercel:
```env
NEXT_PUBLIC_SITE_URL=https://bacteriodico.cl
```

Redeploy para aplicar cambios.

## 👤 4. Crear Usuario Admin

### 4.1 Registrarse

1. Ve a `https://bacteriodico.cl` (o tu dominio)
2. Regístrate con email: `admin@bacteriodico.cl`

### 4.2 Promover a Admin

En Supabase SQL Editor:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'admin@bacteriodico.cl'
);
```

### 4.3 Verificar

1. Login en `https://bacteriodico.cl/admin`
2. Deberías tener acceso completo

## ✅ 5. Verificación Post-Despliegue

### SEO

```bash
# Lighthouse
npm run check:seo
# O manualmente: https://pagespeed.web.dev/
```

**Objetivos:**
- SEO: ≥ 95
- Performance: ≥ 90
- Accessibility: ≥ 90
- Best Practices: ≥ 90

### Core Web Vitals

```bash
npm run check:cwv
```

**Objetivos:**
- LCP (Largest Contentful Paint): ≤ 2.5s
- FID/INP (First Input Delay): ≤ 200ms  
- CLS (Cumulative Layout Shift): ≤ 0.1

### Funcionalidades

- [ ] Home carga correctamente
- [ ] Categorías funcionan
- [ ] Búsqueda funciona
- [ ] Login funciona
- [ ] Admin accesible (solo admin)
- [ ] Imágenes cargan (una vez creadas)

## 🔒 6. Seguridad Post-Despliegue

### 6.1 RLS Verificación

Ejecuta en Supabase SQL Editor:

```sql
-- Verificar que RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
-- Todos deben tener rowsecurity = true
```

### 6.2 Políticas de Auth

En Supabase → Authentication → Policies:
- ✅ Enable Email Confirmations
- ✅ Enable Email Change Confirmations
- ⚙️ Configure redirect URLs: tu dominio

### 6.3 Variables Sensibles

⚠️ **NUNCA EXPONER:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `PREVIEW_SECRET`
- Contraseñas

✅ **Seguro exponer:**
- `NEXT_PUBLIC_*` variables (están en el cliente de todas formas)

## 📊 7. Configurar Analytics (Opcional)

### Plausible

1. Crea cuenta en [plausible.io](https://plausible.io)
2. Add website: `bacteriodico.cl`
3. Ya está! (script ya implementado)

### Umami

1. Deploy Umami (Railway/Vercel)
2. Add website
3. Obtén website ID
4. Configura variables en Vercel

## 🔄 8. CI/CD

### Deploys Automáticos

Vercel automáticamente:
- ✅ Deploy en cada push a `main`
- ✅ Preview deploys en PRs
- ✅ Rollback instantáneo si falla

### Branch Preview

Cada PR genera URL preview:
```
https://bacteriodico-git-feature-xxx.vercel.app
```

## 🆘 Troubleshooting

### Build Falla

**Error:** "Module not found"
- ✅ Solución: Verifica `package.json`, ejecuta `npm install` localmente

**Error:** "Database connection failed"
- ✅ Solución: Verifica variables `NEXT_PUBLIC_SUPABASE_*`

### RLS Violations

**Error:** "Row level security policy"
- ✅ Solución: Ejecutaste `supabase/policies.sql`?
- ✅ El usuario tiene el rol correcto?

### Images No Cargan

**Error:** 403/404 en imágenes
- ✅ Solución: Bucket `media` es público?
- ✅ URLs de Supabase en `next.config.js` remotePatterns?

### SEO Score Bajo

- ✅ Verifica metadatos en view-source
- ✅ Ejecuta Lighthouse en incógnito
- ✅ Revisa console por errores

## 📈 9. Monitoreo

### Vercel Analytics

Activar en Project Settings → Analytics (gratis):
- Pageviews
- Top pages
- Countries
- Referrers

### Uptime Monitoring

Usa servicios como:
- UptimeRobot (gratis)
- Pingdom
- StatusCake

Configurar alerts para downtime.

## 🔄 10. Actualizaciones Futuras

### Actualizar Schema

```bash
# 1. Modificar supabase/schema.sql
# 2. Crear migración SQL
# 3. Ejecutar en Supabase SQL Editor
# 4. Regenerar tipos
npm run supabase:types
# 5. Commit y push
```

### Redeploy

```bash
git add .
git commit -m "Update: descripción"
git push origin main
# Vercel auto-deploy
```

## ✅ Checklist Final

- [ ] Supabase configurado (schema + policies + bucket)
- [ ] Vercel desplegado con variables env
- [ ] Dominio configurado y funcionando
- [ ] Usuario admin creado y promovido
- [ ] SEO score ≥ 95
- [ ] Core Web Vitals "Good"
- [ ] Analytics configuradas (opcional)
- [ ] Monitoring activo
- [ ] Documentación leída

## 🎉 ¡Listo!

Tu sitio **BACTERIÓDICO** está en producción 🚀

**Próximos pasos:**
1. Completar panel admin (ver TODO.md)
2. Crear primer post
3. Invitar colaboradores
4. Promocionar en redes

---

**Soporte:** Revisa README.md y TODO.md para más detalles.
