import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
        input: "./server/app.ts",
      }
      : undefined,
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // https://github.com/prisma/prisma/issues/12504#issuecomment-2608725259
  resolve: {
    alias: {
      ".prisma/client/index-browser":
        "./node_modules/.prisma/client/index-browser.js",
    },
  },
}));
