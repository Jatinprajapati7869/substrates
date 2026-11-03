import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const nitroPreset = process.env.NITRO_PRESET ?? (process.env.VERCEL ? "vercel" : "node-server");

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return {
    define: envDefine,
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    css: { transformer: "lightningcss" as const },
    server: {
      host: "::",
      port: Number(process.env.PORT) || 8080,
    },
    plugins: [
      tailwindcss(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        server: { entry: "server" },
      }),
      viteReact(),
      ...(command === "build"
        ? [
            nitro({
              preset: nitroPreset,
              rollupConfig: {
                external: [
                  "firebase-admin",
                  /^@google-cloud\//,
                  /^@firebase\//,
                  "@grpc/grpc-js",
                  "google-gax",
                ],
              },
            }),
          ]
        : []),
    ],
  };
});
