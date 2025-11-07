# Guía Rápida de Configuración - BACTERIÓDICO

## 🚀 Setup en 5 Pasos

### 1. Clonar e Instalar

```bash
git clone [tu-repo]
cd Bacteriodico
npm install
```

### 2. Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
2. En SQL Editor, ejecuta en orden:
   - `supabase/schema.sql`
   - `supabase/policies.sql`
   - `supabase/seed.sql`
3. En Storage, crea bucket `media` (público, 50MB límite)

### 3. Variables de Entorno

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase (Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...  # ⚠️ NUNCA en git
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Crear Usuario Admin

```bash
# 1. Ejecuta el proyecto
npm run dev

# 2. Regístrate en http://localhost:3000 con email admin@bacteriodico.cl

# 3. En Supabase SQL Editor:
UPDATE profiles 
SET role = 'admin' 
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@bacteriodico.cl');
```

### 5. Listo! 🎉

- Sitio público: http://localhost:3000
- Panel admin: http://localhost:3000/admin

## ✅ Checklist Post-Setup

- [ ] Supabase configurado (schema + policies + seed)
- [ ] Bucket `media` creado
- [ ] Variables `.env.local` completas
- [ ] Usuario admin creado
- [ ] `npm run dev` funciona
- [ ] Login en `/admin` exitoso

## 🆘 Troubleshooting

### "Cannot connect to database"
- Verifica `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Revisa que el proyecto Supabase esté activo

### "Row Level Security policy violation"
- Ejecutaste `supabase/policies.sql`?
- El usuario tiene el rol correcto?

### Errores de TypeScript antes de `npm install`
- Normal! Los errores desaparecen después de instalar dependencias

## 📚 Siguiente Paso

Lee el [README.md](./README.md) completo para:
- Despliegue a producción
- Configurar analíticas
- Tests y validaciones SEO
- Estructura detallada del proyecto
