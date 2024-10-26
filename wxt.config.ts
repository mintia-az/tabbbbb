import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: [
      'storage',
      'tabs',
      'notifications'
    ],
    // action: {
    //   default_popup: 'src/popup/index.html'
    // }
  },
  srcDir: 'src',
  
});
