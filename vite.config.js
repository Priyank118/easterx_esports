// vite.config.js (or vite.config.ts)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or your specific framework plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Or your specific framework plugin
  server: {
    host: true, // Optional: This ensures Vite listens on all network interfaces, good for local network access too.
    allowedHosts: [
      // Add the ngrok domain wildcard here
      '.ngrok-free.app', 
      // You can also add your specific current ngrok URL if you prefer, but the wildcard is more convenient
      // 'b71b-106-219-84-25.ngrok-free.app', // Your current ngrok URL
    ],
  },
});
