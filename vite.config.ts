import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [resolve(__dirname, 'src/assets/svgs')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    // css 预处理器
    preprocessorOptions: {
      // provide global variables
      scss: {
        additionalData: `
          @import "@/styles/mixins.scss";
          @import "@/styles/variables.scss";
          @import "@/styles/common.scss";
        `
      }
    }
  }
})
