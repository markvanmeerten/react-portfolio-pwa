import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Tell Workbox to precache all common asset types, including images.
        // Without this, images imported in React components are skipped.
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ico,woff,woff2}"],
        // The default max file size for precaching is 2MB. Raise it to cover larger images.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
        runtimeCaching: [
          {
            // Cache the local /api/avatar proxy endpoint.
            // StaleWhileRevalidate: serve the cached avatar immediately (fixed URL),
            // then fetch a new one in the background for the next refresh.
            // Online = new avatar each visit, offline = last cached avatar shown.
            urlPattern: /\/api\/avatar/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "avatar-cache",
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: "Your Name — Software Developer",
        short_name: "Portfolio",
        description: "Personal portfolio and software developer showcase.",
        theme_color: "#863bff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/pwa-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
