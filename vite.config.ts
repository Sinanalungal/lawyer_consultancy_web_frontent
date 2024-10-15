import {config} from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
config()
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env': process.env
  },
  build: { chunkSizeWarningLimit: 1600 }
})
