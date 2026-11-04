#!/usr/bin/env node
/**
 * Production bundle smoke: start Nitro node-server, GET / and /api/health (20 rounds).
 * Usage: NITRO_PRESET=node-server npm run build && node scripts/smoke-node-server.mjs --skip-build
 * Env: PORT (default 5055), placeholder VITE_FIREBASE_* if unset.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const skipBuild = process.argv.includes("--skip-build");
const port = process.env.PORT ?? "5055";
const base = `http://127.0.0.1:${port}`;

const placeholderEnv = {
  NITRO_PRESET: "node-server",
  HOST: "127.0.0.1",
  PORT: port,
  VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY ?? "placeholder",
  VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN ?? "placeholder.firebaseapp.com",
  VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID ?? "placeholder",
  VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID ?? "placeholder",
};

function smokeEnv(extra = {}) {
  const env = { ...placeholderEnv, NODE_ENV: "production", ...extra };
  for (const key of ["PATH", "PATHEXT", "SystemRoot", "NODE_PATH"]) {
    if (process.env[key]) env[key] = process.env[key];
  }
  return env;
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", "build"], {
      env: smokeEnv(),
      stdio: "inherit",
      shell: false,
    });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`build exited ${code}`)),
    );
  });
}

function childRssKb(pid) {
  if (process.platform === "win32") {
    try {
      const out = execSync(
        `powershell -NoProfile -Command "(Get-Process -Id ${pid}).WorkingSet64 / 1KB"`,
        { encoding: "utf8" },
      );
      return Math.round(Number.parseFloat(out.trim()));
    } catch {
      return null;
    }
  }
  try {
    const out = execSync(`ps -o rss= -p ${pid}`, { encoding: "utf8" }).trim();
    return Number.parseInt(out, 10);
  } catch {
    return null;
  }
}

async function main() {
  if (!skipBuild) {
    await runBuild();
  }
  if (!existsSync(".output/server/index.mjs")) {
    console.error("Missing .output/server/index.mjs — run build with NITRO_PRESET=node-server");
    process.exit(1);
  }

  const server = spawn(process.execPath, [".output/server/index.mjs"], {
    env: smokeEnv(),
    stdio: ["ignore", "pipe", "pipe"],
  });

  let serverLog = "";
  server.stderr?.on("data", (chunk) => {
    serverLog += chunk.toString();
  });
  server.stdout?.on("data", (chunk) => {
    serverLog += chunk.toString();
  });

  const started = Date.now();
  while (Date.now() - started < 30_000) {
    try {
      const res = await fetch(`${base}/api/health`);
      if (res.status === 200) break;
    } catch {
      await sleep(250);
    }
  }

  const health = await fetch(`${base}/api/health`);
  if (health.status !== 200) {
    server.kill();
    console.error("GET /api/health failed:", health.status, serverLog);
    process.exit(1);
  }

  const home = await fetch(`${base}/`);
  if (home.status !== 200) {
    server.kill();
    console.error("GET / failed:", home.status);
    process.exit(1);
  }

  for (let i = 0; i < 19; i++) {
    await fetch(`${base}/api/health`);
    await fetch(`${base}/`);
  }

  const rssKb = server.pid ? childRssKb(server.pid) : null;
  const rssMb = rssKb != null ? (rssKb / 1024).toFixed(1) : "unknown";

  server.kill("SIGTERM");
  await sleep(500);
  if (!server.killed) server.kill("SIGKILL");

  console.log(
    JSON.stringify({
      ok: true,
      port,
      requests: 40,
      rssKb,
      rssMb,
      under400Mb: rssKb == null ? null : rssKb / 1024 < 400,
    }),
  );

  if (rssKb != null && rssKb / 1024 >= 400) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
