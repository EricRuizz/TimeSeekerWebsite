import vitePluginString from 'vite-plugin-string';
import topLevelAwait from "vite-plugin-top-level-await";

export default {
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
  base: "TimeSeekerWebsite",
};
