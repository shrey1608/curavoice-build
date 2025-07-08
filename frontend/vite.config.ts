import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true
    },
    plugins: [react()],
    build: {
        // Reduce memory usage during build
        target: 'es2020',
        minify: 'esbuild', // Use esbuild instead of terser (default and lighter)
        // Optimize chunk size for Railway
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    supabase: ['@supabase/supabase-js']
                }
            }
        },
        // Reduce memory usage
        sourcemap: false
    }
})
