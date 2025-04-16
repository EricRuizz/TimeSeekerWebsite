import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginString from 'vite-plugin-string';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    vitePluginString(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    })
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        games: resolve(__dirname, 'project/HTML/Games.html'),
        art: resolve(__dirname, 'project/HTML/Art.html'),
        music: resolve(__dirname, 'project/HTML/Music.html'),
        others: resolve(__dirname, 'project/HTML/Others.html'),

        nomadDefender: resolve(__dirname, 'project/HTML/Games/NomadDefender.html'),
        anchoredSoul: resolve(__dirname, 'project/HTML/Games/AnchoredSoul.html'),
        theLastTrip: resolve(__dirname, 'project/HTML/Games/TheLastTrip.html'),
        hyperShapes: resolve(__dirname, 'project/HTML/Games/HyperShapes.html'),

        oldBreathPage: resolve(__dirname, 'project_BreathPage/pages/home.html'),
      }
    }
  }
});
