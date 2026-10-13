import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          menu: path.resolve(__dirname, 'menu.html'),
          order: path.resolve(__dirname, 'order.html'),
          booking: path.resolve(__dirname, 'booking.html'),
          experience: path.resolve(__dirname, 'experience.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          about: path.resolve(__dirname, 'about.html'),
          reviews: path.resolve(__dirname, 'reviews.html'),
          offers: path.resolve(__dirname, 'offers.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          orderSuccess: path.resolve(__dirname, 'order-success.html'),
          bookingSuccess: path.resolve(__dirname, 'booking-success.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
