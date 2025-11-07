-- BACTERIÓDICO Row Level Security Policies

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE slug_redirects ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PROFILES
-- ============================================================================

-- Todos pueden leer perfiles públicos
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admin/Editor pueden actualizar cualquier perfil
CREATE POLICY "Admins and editors can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- CATEGORIES
-- ============================================================================

-- Lectura pública
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Admin/Editor pueden crear/actualizar/eliminar
CREATE POLICY "Admins and editors can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- TAGS
-- ============================================================================

-- Lectura pública
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

-- Admin/Editor pueden crear/actualizar/eliminar
CREATE POLICY "Admins and editors can manage tags"
  ON tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- POSTS
-- ============================================================================

-- Lectura pública solo de posts publicados
CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  USING (status = 'published');

-- Autores pueden ver sus propios posts (cualquier estado)
CREATE POLICY "Authors can view their own posts"
  ON posts FOR SELECT
  USING (author_id = auth.uid());

-- Editores/Admin pueden ver todos los posts
CREATE POLICY "Editors and admins can view all posts"
  ON posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Autores pueden crear posts (siempre en draft)
CREATE POLICY "Authors can create posts"
  ON posts FOR INSERT
  WITH CHECK (
    auth.uid() = author_id AND
    status = 'draft' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('autor', 'editor', 'admin')
    )
  );

-- Autores pueden actualizar sus propios posts (solo draft o review)
CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  USING (
    author_id = auth.uid() AND
    status IN ('draft', 'review')
  )
  WITH CHECK (
    author_id = auth.uid() AND
    status IN ('draft', 'review')
  );

-- Editores/Admin pueden actualizar cualquier post
CREATE POLICY "Editors and admins can update any post"
  ON posts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Solo Admin/Editor pueden eliminar posts
CREATE POLICY "Admins and editors can delete posts"
  ON posts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- POST_CATEGORIES y POST_TAGS
-- ============================================================================

-- Lectura pública
CREATE POLICY "Post categories are viewable by everyone"
  ON post_categories FOR SELECT
  USING (true);

CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  USING (true);

-- Autores pueden gestionar las categorías/tags de sus posts
CREATE POLICY "Authors can manage their post categories"
  ON post_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_categories.post_id
      AND posts.author_id = auth.uid()
    )
  );

CREATE POLICY "Authors can manage their post tags"
  ON post_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_tags.post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Editores/Admin pueden gestionar todas
CREATE POLICY "Editors can manage all post categories"
  ON post_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

CREATE POLICY "Editors can manage all post tags"
  ON post_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- SOURCES
-- ============================================================================

-- Lectura pública de fuentes de posts publicados
CREATE POLICY "Sources of published posts are viewable"
  ON sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = sources.post_id
      AND posts.status = 'published'
    )
  );

-- Autores pueden ver fuentes de sus posts
CREATE POLICY "Authors can view their post sources"
  ON sources FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = sources.post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Autores pueden gestionar fuentes de sus posts
CREATE POLICY "Authors can manage their post sources"
  ON sources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = sources.post_id
      AND posts.author_id = auth.uid()
    )
  );

-- Editores pueden gestionar todas las fuentes
CREATE POLICY "Editors can manage all sources"
  ON sources FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- ============================================================================
-- COMMENTS
-- ============================================================================

-- Lectura pública solo de comentarios aprobados
CREATE POLICY "Approved comments are viewable by everyone"
  ON comments FOR SELECT
  USING (status = 'approved');

-- Usuarios pueden ver sus propios comentarios
CREATE POLICY "Users can view their own comments"
  ON comments FOR SELECT
  USING (author_id = auth.uid());

-- Editores/Admin pueden ver todos los comentarios
CREATE POLICY "Editors can view all comments"
  ON comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Usuarios autenticados pueden crear comentarios (siempre pending)
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    author_id = auth.uid() AND
    status = 'pending'
  );

-- Solo Editores/Admin pueden actualizar comentarios (aprobar/rechazar)
CREATE POLICY "Editors can update comments"
  ON comments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Solo Admin puede eliminar comentarios
CREATE POLICY "Admins can delete comments"
  ON comments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- MEDIA
-- ============================================================================

-- Lectura pública de media
CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT
  USING (true);

-- Usuarios autenticados pueden subir media
CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    created_by = auth.uid()
  );

-- Solo Admin puede eliminar media
CREATE POLICY "Admins can delete media"
  ON media FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- AUDIT_LOGS
-- ============================================================================

-- Solo Admin puede leer audit logs
CREATE POLICY "Only admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Sistema puede insertar (vía triggers/funciones)
CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- SLUG_REDIRECTS
-- ============================================================================

-- Lectura pública
CREATE POLICY "Slug redirects are viewable by everyone"
  ON slug_redirects FOR SELECT
  USING (true);

-- Sistema puede insertar (vía trigger)
CREATE POLICY "System can insert slug redirects"
  ON slug_redirects FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- FUNCIONES AUXILIARES
-- ============================================================================

-- Función para verificar rol de usuario (útil en el backend)
CREATE OR REPLACE FUNCTION check_user_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND (
      role = required_role OR
      (required_role = 'autor' AND role IN ('autor', 'editor', 'admin')) OR
      (required_role = 'editor' AND role IN ('editor', 'admin'))
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
