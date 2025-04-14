import vitePluginString from 'vite-plugin-string';
import topLevelAwait from "vite-plugin-top-level-await";
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/TimeSeekerWebsite/' : '/',
  plugins: [
    vitePluginString(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    })
  ],
  build: {
    target: 'esnext',
  },
});
