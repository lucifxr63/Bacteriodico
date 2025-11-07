#!/usr/bin/env node

/**
 * Script para validar SEO con Lighthouse
 * Requiere: npm install -g @lhci/cli
 * 
 * Uso:
 * npm run check:seo
 * 
 * O manualmente:
 * node scripts/check-seo.js
 */

const { spawn } = require('child_process');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const routes = [
  '/',
  '/noticias',
  '/divulgacion',
  '/eventos',
];

console.log('🔍 Validando SEO con Lighthouse...\n');
console.log(`Site URL: ${SITE_URL}\n`);

const runLighthouse = (url) => {
  return new Promise((resolve, reject) => {
    const lighthouse = spawn('lhci', [
      'autorun',
      '--collect.url=' + url,
      '--collect.settings.onlyCategories=seo,accessibility,best-practices',
      '--assert.assertions.seo=error',
      '--assert.assertions.accessibility=warn',
      '--assert.assertions.best-practices=warn',
    ]);

    lighthouse.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    lighthouse.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    lighthouse.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Lighthouse failed for ${url}`));
      }
    });
  });
};

async function main() {
  console.log('Rutas a validar:');
  routes.forEach(route => console.log(`  - ${SITE_URL}${route}`));
  console.log('\n');

  try {
    for (const route of routes) {
      const fullUrl = `${SITE_URL}${route}`;
      console.log(`\n📊 Analizando: ${fullUrl}\n`);
      await runLighthouse(fullUrl);
    }
    
    console.log('\n✅ Validación SEO completada exitosamente!\n');
    console.log('Recomendaciones:');
    console.log('  - SEO Score ≥ 95');
    console.log('  - Accessibility Score ≥ 90');
    console.log('  - Best Practices Score ≥ 90\n');
  } catch (error) {
    console.error('\n❌ Error en la validación:', error.message);
    process.exit(1);
  }
}

main();
