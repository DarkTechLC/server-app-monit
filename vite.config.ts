import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'images/*',
      ],
      manifest: {
        short_name: 'Server App Monitor',
        name: 'Server App Monitor',
        description: 'Monit your server apps',
        icons: [
          {
            src: '/images/logo.svg',
            type: 'image/svg+xml',
            sizes: '192x192',
          },
          {
            src: '/images/logo.svg',
            type: 'image/svg+xml',
            sizes: '512x512',
          },
        ],
        start_url: '/',
        background_color: '#3B82F6',
        display: 'standalone',
        scope: '/',
        theme_color: '#3B82F6',
        shortcuts: [
          {
            name: 'Add server',
            short_name: 'Add',
            description: 'Configure a server to be monitored',
            url: '/new',
            icons: [
              {
                src: '/images/plus.svg',
                type: 'image/svg+xml',
                sizes: '192x192',
              },
            ],
          },
        ],
        screenshots: [],
      },
    }),
  ],
});
