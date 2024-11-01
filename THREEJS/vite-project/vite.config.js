import vitePluginString from 'vite-plugin-string';

export default {
  plugins: [
    vitePluginString(),
  ],
  build: {
    target: 'esnext', // Enables support for top-level await and latest JavaScript features
  },
};
