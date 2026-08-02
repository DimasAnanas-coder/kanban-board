import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    watch: process.env.RUNNING_IN_DOCKER === 'true' ? { 
        usePolling: true 
    } : undefined,
  }
});