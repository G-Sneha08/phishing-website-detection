import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/scan': 'http://localhost:5000',
            '/history': 'http://localhost:5000',
            '/analytics': 'http://localhost:5000',
        }
    }
})
