import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  resolve: {
    mainFields: [],
      alias: [
        {
          find: 'axios',
          replacement: path.resolve(__dirname, 'node_modules', 'axios/dist/esm/axios.js'),
        },
      ],
    },
})
