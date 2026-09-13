import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Parse App.tsx into absolute route paths (redirects skipped). */
export function parseRoutePaths(source: string): Set<string> {
  const paths = new Set<string>();
  const parentStack: string[] = [];

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trimEnd();
    if (/^\s*<\/Route>\s*$/.test(line) && parentStack.length > 0) {
      parentStack.pop();
      continue;
    }
    const match = line.match(/<Route path="([^"]+)"/);
    if (!match) continue;
    const raw = match[1];
    if (raw === "*" || raw.includes("/*")) continue; // catch-alls / splats
    if (line.includes("<Navigate") || line.includes("LegacyRedirect")) continue; // redirects

    if (raw.startsWith("/")) {
      paths.add(raw);
      if (line.endsWith(">") && !line.endsWith("/>")) parentStack.push(raw);
    } else {
      const parent = parentStack[parentStack.length - 1];
      if (parent) {
        const absolute = `${parent}/${raw}`;
        paths.add(absolute);
        if (line.endsWith(">") && !line.endsWith("/>")) parentStack.push(absolute);
      }
    }
  }

  const normalized = new Set<string>();
  for (const path of paths) {
    normalized.add(path);
    if (path.includes("/:")) normalized.add(path.slice(0, path.indexOf("/:")));
  }
  return normalized;
}

export const APP_TSX = readFileSync(join(__dirname, "../../../..", "App.tsx"), "utf8");
export const ROUTE_PATHS = parseRoutePaths(APP_TSX);
