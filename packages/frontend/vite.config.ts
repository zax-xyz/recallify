import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros"],
      },
    }),
    tsconfigPaths(),
    commonjs(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "safari-pinned-tab.svg"],
      manifest: {
        name: "skull emoji",
        description: "doomed",
        theme_color: "#fbfaff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
