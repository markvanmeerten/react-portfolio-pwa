# react-portfolio-pwa

An example project for a small portfolio page built as a Progressive Web App (PWA), created with Claude Sonnet 4.6.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)

## Getting started

```bash
npm install
npm run dev
```

## Progressive Web App

This project is set up as a PWA, which means it can be installed on a user's device and launched like a native app — no app store required.

### How it works

PWAs require two things to be installable: a **web app manifest** and a **service worker**.

Rather than writing these by hand, we use `vite-plugin-pwa` to generate both automatically at build time.

#### Web App Manifest

The manifest is a JSON file that tells the browser metadata about your app — its name, icons, theme color, and how it should behave when installed. You configure it directly in `vite.config.js` under the `manifest` key:

```js
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Your Name — Software Developer',
    short_name: 'Portfolio',
    theme_color: '#863bff',
    display: 'standalone', // hides the browser UI when launched from home screen
    // ...
  },
})
```

When you run `npm run build`, the plugin writes this out as `dist/manifest.webmanifest` and automatically adds the `<link rel="manifest">` tag to your HTML.

#### Service Worker

A service worker is a script that runs in the background, separate from your app. Its main job here is **caching** — storing your app's files so it loads fast and can work offline.

The plugin uses [Workbox](https://developer.chrome.com/docs/workbox) under the hood to generate the service worker automatically. With no custom `workbox` config (which we intentionally left out to keep things simple), it uses **precaching** by default:

- At build time, Workbox scans your output files and generates a list of every asset (JS, CSS, HTML, images, fonts)
- When a user first visits the site, the service worker downloads and caches all of those files in the background
- On subsequent visits, those files are served directly from the cache — making the app load near-instantly and work without an internet connection

The `registerType: 'autoUpdate'` setting means the service worker will silently update itself in the background whenever you deploy a new build, so users always get the latest version.

### Testing the PWA

The service worker is only active in **production**. To test the full PWA experience locally:

```bash
npm run build
npm run preview
```

Then open the URL shown in the terminal (usually `http://localhost:4173`). You should see an install icon in the browser address bar.

To inspect the manifest and service worker, open **DevTools → Application tab**.
