// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    preview: {
      allowedHosts: ['octopusgr.com', 'admin.octopusgr.com']
    }
  }
});