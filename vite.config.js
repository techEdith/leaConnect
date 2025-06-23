import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '59067e25-e8c1-47a5-a7b8-c0fe5812fa55-00-1v9xnesckftrz.worf.replit.dev'
    ]
  }
});
