#!/usr/bin/env node
/**
 * Postbuild fix for Nitro v3 beta bundler bug.
 * The bundler may split the SSR service into multiple chunks (ssr.mjs, ssr2.mjs, …).
 * One of them re-exports `ssr_exports` without ever declaring it, causing:
 *   SyntaxError: Export 'ssr_exports' is not defined in module
 * → every request 500s, but `vite build` exits 0.
 *
 * See: https://github.com/TanStack/router/issues/8031
 *
 * Fix: scan ALL _ssr/*.mjs files for the undeclared export and insert the
 * missing `var ssr_exports = server_default;` declaration where needed.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SSR_DIR = join(
  process.cwd(),
  ".vercel/output/functions/__server.func/_ssr",
);

try {
  const files = readdirSync(SSR_DIR).filter((f) => f.endsWith(".mjs"));
  let patched = 0;

  for (const file of files) {
    const path = join(SSR_DIR, file);
    let code = readFileSync(path, "utf-8");

    // Already patched — skip
    if (code.includes("var ssr_exports")) continue;

    // Check if this file uses ssr_exports without declaring it
    if (!code.includes("ssr_exports")) continue;

    // Find the export line that references ssr_exports
    // Pattern: export { ... ssr_exports as ... ... };
    const exportMatch = code.match(
      /export\s*\{[^}]*ssr_exports\s+as\s+\w+[^}]*\}/,
    );
    if (!exportMatch) continue;

    // Insert the declaration before the first export statement
    const firstExportIdx = code.indexOf("\nexport ");
    if (firstExportIdx === -1) continue;

    code =
      code.slice(0, firstExportIdx + 1) +
      "var ssr_exports = server_default;\n" +
      code.slice(firstExportIdx + 1);

    writeFileSync(path, code, "utf-8");
    patched++;
    console.log(`[fix-ssr-exports] patched ${file} — added ssr_exports declaration`);
  }

  if (patched === 0) {
    console.log("[fix-ssr-exports] no patches needed — all files clean");
  }
} catch (err) {
  if (err.code === "ENOENT") {
    console.log("[fix-ssr-exports] _ssr directory not found — skipping");
  } else {
    console.error("[fix-ssr-exports] failed:", err.message);
  }
}
