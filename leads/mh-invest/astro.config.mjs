import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mhinvest-demo.fleisswerker.de',
  base: '/',
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
