#!/usr/bin/env node
/**
 * Postbuild fix for Nitro v3 beta bundler bug.
 * The bundler generates ssr.mjs with `export { ssr_exports as i }`
 * but forgets to declare `var ssr_exports = ...`.
 * Fix: insert `var ssr_exports = server_default;` before the export line.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SSR_PATH = join(
  process.cwd(),
  ".vercel/output/functions/__server.func/_ssr/ssr.mjs",
);

try {
  let code = readFileSync(SSR_PATH, "utf-8");
  if (code.includes("var ssr_exports")) {
    console.log("[fix-ssr-exports] already patched — skipping");
    process.exit(0);
  }
  const EXPORT_LINE = "export { __exportAll as a,";
  if (!code.includes(EXPORT_LINE)) {
    console.log("[fix-ssr-exports] export line not found — skipping");
    process.exit(0);
  }
  code = code.replace(EXPORT_LINE, "var ssr_exports = server_default;\n" + EXPORT_LINE);
  writeFileSync(SSR_PATH, code, "utf-8");
  console.log("[fix-ssr-exports] patched ssr.mjs — added missing ssr_exports");
} catch (err) {
  if (err.code === "ENOENT") {
    console.log("[fix-ssr-exports] ssr.mjs not found — skipping");
  } else {
    console.error("[fix-ssr-exports] failed:", err.message);
  }
}
