#!/usr/bin/env node

/**
 * Script para validar Core Web Vitals
 * Usa PageSpeed Insights API
 * 
 * Uso:
 * npm run check:cwv
 * 
 * O manualmente:
 * PSI_API_KEY=tu-api-key node scripts/check-cwv.js
 */

const https = require('https');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bacteriodico.cl';
const PSI_API_KEY = process.env.PSI_API_KEY || '';

const routes = [
  '/',
  '/noticias',
];

const checkPageSpeed = (url) => {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}${PSI_API_KEY ? `&key=${PSI_API_KEY}` : ''}`;

    https.get(apiUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

async function main() {
  console.log('🚀 Validando Core Web Vitals...\n');
  console.log(`Site URL: ${SITE_URL}\n`);

  if (!PSI_API_KEY) {
    console.log('⚠️  Nota: No se encontró PSI_API_KEY. Usando límite de rate por defecto.\n');
    console.log('Para obtener una API key: https://developers.google.com/speed/docs/insights/v5/get-started\n');
  }

  for (const route of routes) {
    const fullUrl = `${SITE_URL}${route}`;
    console.log(`\n📊 Analizando: ${fullUrl}\n`);

    try {
      const result = await checkPageSpeed(fullUrl);
      
      const loadingExperience = result.loadingExperience;
      const metrics = loadingExperience?.metrics || {};

      console.log('Core Web Vitals:');
      console.log('================');

      // LCP (Largest Contentful Paint)
      const lcp = metrics.LARGEST_CONTENTFUL_PAINT_MS;
      if (lcp) {
        const lcpValue = lcp.percentile / 1000;
        const lcpStatus = lcpValue <= 2.5 ? '✅' : lcpValue <= 4 ? '⚠️ ' : '❌';
        console.log(`  ${lcpStatus} LCP: ${lcpValue.toFixed(2)}s (objetivo: ≤ 2.5s)`);
      }

      // FID (First Input Delay) o INP
      const fid = metrics.FIRST_INPUT_DELAY_MS || metrics.INTERACTION_TO_NEXT_PAINT;
      if (fid) {
        const fidValue = fid.percentile;
        const fidStatus = fidValue <= 100 ? '✅' : fidValue <= 300 ? '⚠️ ' : '❌';
        console.log(`  ${fidStatus} FID/INP: ${fidValue}ms (objetivo: ≤ 200ms)`);
      }

      // CLS (Cumulative Layout Shift)
      const cls = metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;
      if (cls) {
        const clsValue = cls.percentile / 100;
        const clsStatus = clsValue <= 0.1 ? '✅' : clsValue <= 0.25 ? '⚠️ ' : '❌';
        console.log(`  ${clsStatus} CLS: ${clsValue.toFixed(3)} (objetivo: ≤ 0.1)`);
      }

      // Performance Score
      const perfScore = result.lighthouseResult?.categories?.performance?.score * 100;
      if (perfScore) {
        const perfStatus = perfScore >= 90 ? '✅' : perfScore >= 50 ? '⚠️ ' : '❌';
        console.log(`\n  ${perfStatus} Performance Score: ${perfScore.toFixed(0)}/100`);
      }

      console.log('\n');
    } catch (error) {
      console.error(`❌ Error analizando ${fullUrl}:`, error.message);
    }

    // Delay para no exceder rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✅ Validación de Core Web Vitals completada!\n');
  console.log('Objetivos:');
  console.log('  - LCP (Largest Contentful Paint): ≤ 2.5s');
  console.log('  - FID/INP (First Input Delay): ≤ 200ms');
  console.log('  - CLS (Cumulative Layout Shift): ≤ 0.1\n');
}

main().catch(console.error);
