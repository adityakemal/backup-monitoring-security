import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), pluginRewriteAll(), tailwindcss()],
  server: {
    port: 3000,
  },
});
