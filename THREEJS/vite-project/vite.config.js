import vitePluginString from 'vite-plugin-string';
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  plugins: [
    vitePluginString(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  build: {
    target: 'esnext', // Enables support for top-level await and latest JavaScript features
  },
};
