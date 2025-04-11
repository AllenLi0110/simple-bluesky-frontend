import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    AutoImport({
      imports: ['vue'],
      dts: 'src/typings/auto-imports.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
    vue(),
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    ...configDefaults,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.ts'],
  },
})
