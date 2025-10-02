// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import dotenv from "dotenv";
dotenv.config();
import netlify from "@astrojs/netlify"; // ✅ Adapter correcto para backend en Netlify

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server", // ✅ Necesario para que /api y MongoDB funcionen
  adapter: netlify({
    edge: false, // 👈 importante: usa Node.js en lugar de funciones edge
  }),
});
