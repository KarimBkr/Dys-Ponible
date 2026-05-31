import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { buildHeadTags, buildJsonLdScriptTag } from './src/seo/json-ld';
import { setSiteUrl } from './src/seo/site';

const siteUrl = process.env.VITE_SITE_URL ?? 'https://www.dys-ponible.fr';
setSiteUrl(siteUrl);

function seoHtmlInject(): Plugin {
  return {
    name: 'seo-html-inject',
    transformIndexHtml(html) {
      setSiteUrl(process.env.VITE_SITE_URL ?? siteUrl);
      return html
        .replace('%HTML_LANG%', 'fr')
        .replace('%HEAD_SEO%', buildHeadTags())
        .replace('%JSON_LD%', buildJsonLdScriptTag());
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [seoHtmlInject(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
