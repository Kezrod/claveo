// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node"; // 👈 Adapter para poder hacer build con /api

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "static", // 👈 Necesario si usas /api o MongoDB
  adapter: netlify(), // 👈 Importante para deploy
});