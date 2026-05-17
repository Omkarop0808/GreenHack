import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY)
    },
    server: {
      proxy: {
        '/signup': 'http://localhost:3000',
        '/signin': 'http://localhost:3000',
        '/api': 'http://localhost:3000',
        '/upload-product': 'http://localhost:3000',
        '/save-purchase': 'http://localhost:3000',
        '/purchase-history': 'http://localhost:3000',
        '/leaderboard': 'http://localhost:3000',
      }
    }
  }
})