-- BACTERIÓDICO Seed Data

-- ============================================================================
-- CATEGORIES
-- ============================================================================
INSERT INTO categories (name, slug, description, color) VALUES
('Noticias', 'noticias', 'Últimas noticias del mundo de la microbiología y salud', '#ef4444'),
('Divulgación', 'divulgacion', 'Artículos de divulgación científica sobre microorganismos', '#3b82f6'),
('Eventos', 'eventos', 'Charlas, talleres y eventos sobre ciencias de la salud', '#10b981'),
('Entrevistas', 'entrevistas', 'Conversaciones con profesionales de la salud', '#f59e0b'),
('Recursos', 'recursos', 'Materiales educativos y recursos útiles', '#8b5cf6')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TAGS
-- ============================================================================
INSERT INTO tags (name, slug) VALUES
('Microbiología', 'microbiologia'),
('Laboratorio', 'laboratorio'),
('Salud Pública', 'salud-publica'),
('Tecnología Médica', 'tecnologia-medica'),
('Bacterias', 'bacterias'),
('Virus', 'virus'),
('Hongos', 'hongos'),
('Investigación', 'investigacion'),
('Educación', 'educacion'),
('COVID-19', 'covid-19'),
('Antibióticos', 'antibioticos'),
('Resistencia Antimicrobiana', 'resistencia-antimicrobiana'),
('Diagnóstico', 'diagnostico'),
('Prevención', 'prevencion'),
('Vacunas', 'vacunas')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- SCRIPT PARA PROMOVER USUARIO A ADMIN
-- ============================================================================
-- Este script debe ejecutarse después de que el usuario admin@bacteriodico.cl se registre

-- Para promover un usuario a admin, ejecutar:
-- UPDATE profiles SET role = 'admin' WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'admin@bacteriodico.cl'
-- );

-- ============================================================================
-- POST DE EJEMPLO (OPCIONAL)
-- ============================================================================
-- Descomentar para crear un post de ejemplo
-- Nota: Necesitas reemplazar 'USER_ID' con el ID real de un usuario

/*
DO $$
DECLARE
  admin_id UUID;
  post_id UUID;
  cat_noticias UUID;
  cat_divulgacion UUID;
  tag_micro UUID;
  tag_lab UUID;
BEGIN
  -- Obtener el ID del admin (ajustar el email según corresponda)
  SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
  
  IF admin_id IS NOT NULL THEN
    -- Obtener IDs de categorías y tags
    SELECT id INTO cat_noticias FROM categories WHERE slug = 'noticias';
    SELECT id INTO cat_divulgacion FROM categories WHERE slug = 'divulgacion';
    SELECT id INTO tag_micro FROM tags WHERE slug = 'microbiologia';
    SELECT id INTO tag_lab FROM tags WHERE slug = 'laboratorio';
    
    -- Crear post de ejemplo
    INSERT INTO posts (
      slug,
      title,
      excerpt,
      content,
      status,
      author_id,
      published_at,
      reading_time
    ) VALUES (
      'bienvenidos-a-bacteriodico',
      '¡Bienvenidos a BACTERIÓDICO!',
      'Descubre el fascinante mundo de los microorganismos a través de nuestro blog universitario de salud.',
      '{
        "type": "doc",
        "content": [
          {
            "type": "heading",
            "attrs": {"level": 2},
            "content": [{"type": "text", "text": "¿Qué es BACTERIÓDICO?"}]
          },
          {
            "type": "paragraph",
            "content": [
              {"type": "text", "text": "BACTERIÓDICO es un blog universitario dedicado a acercar el mundo de los microorganismos al público general. Somos profesionales en ciencias básicas y salud comprometidos con la divulgación científica."}
            ]
          },
          {
            "type": "heading",
            "attrs": {"level": 2},
            "content": [{"type": "text", "text": "Nuestra misión"}]
          },
          {
            "type": "paragraph",
            "content": [
              {"type": "text", "text": "Ofrecemos contenido de calidad sobre microbiología, salud pública y tecnología médica, además de organizar charlas y talleres gratuitos para la comunidad."}
            ]
          }
        ]
      }'::jsonb,
      'published',
      admin_id,
      NOW(),
      3
    ) RETURNING id INTO post_id;
    
    -- Asociar categorías
    INSERT INTO post_categories (post_id, category_id) VALUES
      (post_id, cat_noticias),
      (post_id, cat_divulgacion);
    
    -- Asociar tags
    INSERT INTO post_tags (post_id, tag_id) VALUES
      (post_id, tag_micro),
      (post_id, tag_lab);
      
    RAISE NOTICE 'Post de ejemplo creado exitosamente';
  ELSE
    RAISE NOTICE 'No se encontró un usuario admin. Crea uno primero.';
  END IF;
END $$;
*/
