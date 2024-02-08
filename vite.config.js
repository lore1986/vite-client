import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/vite-client/",
  server: {
    proxy: {
      '^/service': {
          target: 'https://fasito.net/', //'https://localhost:5001',//,
          secure: false,
          changeOrigin: true
      },
      //   '^/websocket': {
      //     target: 'wss://localhost:5055',
      //     ws: true,
      //     changeOrigin: true
      // }
    }
  }
})
