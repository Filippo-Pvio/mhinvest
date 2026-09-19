import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://filippo-pvio.github.io',
  base: '/mhinvest',
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
