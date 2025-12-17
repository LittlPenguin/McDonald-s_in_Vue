import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteFonts from "unplugin-fonts/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteFonts({
      fontsource: {
        families: [
          {
            name: "Roboto",
            weights: [100, 300, 400, 500, 700, 900],
            styles: ["normal", "italic"],
          },
        ],
      },
    }),
  ],
  // 路径别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
