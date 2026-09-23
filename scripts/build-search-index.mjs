// Genera public/search-index.json a partir de los MDX.
// Se ejecuta ANTES de `next build` -> cada página nueva queda indexada sola,
// sin Algolia, sin API keys y sin crawler.
// Uso: node scripts/build-search-index.mjs

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const DOCS_ROOT = path.join(ROOT, "contents", "docs");
const OUT = path.join(ROOT, "public", "search-index.json");

function stripMdx(raw) {
  return raw
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^(import|export)\s.*$/gm, " ")
    .replace(/<\/?[A-Z][^>]*\/?>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

async function collectMdxFiles(langDir) {
  const out = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && e.name === "index.mdx") out.push(full);
    }
  }
  await walk(langDir);
  return out;
}

const index = [];
for (const lang of ["es", "en"]) {
  const files = await collectMdxFiles(path.join(DOCS_ROOT, lang));
  for (const file of files) {
    const slug = path.relative(path.join(DOCS_ROOT, lang), path.dirname(file)).replace(/\\/g, "/");
    if (!slug) continue;
    const raw = await fs.readFile(file, "utf-8");
    const { data, content } = matter(raw);
    const headings = [...content.matchAll(/^#{2,4}\s+(.+?)\s*$/gm)].map((m) => m[1].trim());
    index.push({
      id: `${lang}:${slug}`,
      lang,
      title: data.title || slug.split("/").pop(),
      description: data.description || "",
      url: `/${lang}/docs/${slug}`,
      keywords: headings.join(" ").slice(0, 500),
      text: stripMdx(content).slice(0, 2000),
    });
  }
}

index.sort((a, b) => a.id.localeCompare(b.id));
await fs.writeFile(OUT, JSON.stringify(index));
const kb = (await fs.stat(OUT)).size / 1024;
console.log(`[search-index] ${index.length} páginas -> public/search-index.json (${kb.toFixed(1)} KB)`);
