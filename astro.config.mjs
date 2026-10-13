// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://abourazanis.com',
  build: {
    // The CSS is small (~4 KB gzipped): inline it to save a render-blocking request.
    inlineStylesheets: 'always',
  },
});
