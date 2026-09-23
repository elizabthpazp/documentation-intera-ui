// Indexa automáticamente todas las páginas MDX a Algolia.
// Uso:
//   node scripts/index-algolia.mjs            -> indexa (requiere ALGOLIA_ADMIN_API_KEY)
//   node scripts/index-algolia.mjs --dry-run  -> solo muestra cuántos records generaría, sin subir nada
//
// Env vars necesarias:
//   NEXT_PUBLIC_ALGOLIA_APP_ID   (ya la tienes en .env)
//   NEXT_PUBLIC_ALGOLIA_INDEX    (ya la tienes en .env, ej: intera-ui)
//   ALGOLIA_ADMIN_API_KEY        (NUEVA - créala en dashboard Algolia > Settings > API Keys > Admin API Key)
//                                La search-only key actual (NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY) NO sirve para subir datos.
//
// Cómo funciona:
//   1. Lee contents/docs/es/**/index.mdx y contents/docs/en/**/index.mdx (fuente de verdad).
//   2. Genera records compatibles con el widget <DocSearch> (hierarchy + content + url + type).
//   3. Sube todo con replaceAllObjects -> las páginas nuevas aparecen y las borradas desaparecen solas.
//
// Automatización: el script se ejecuta al final de `npm run build` si ALGOLIA_ADMIN_API_KEY existe.
// Si la key no existe, avisa y NO rompe el build.

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { algoliasearch } from "algoliasearch";

const ROOT = process.cwd();
const DOCS_ROOT = path.join(ROOT, "contents", "docs");
const LANGS = ["es", "en"];
const DRY_RUN = process.argv.includes("--dry-run");

// Carga .env / .env.local para `node scripts/...` (Next no los inyecta en procesos node sueltos)
for (const f of [".env.local", ".env"]) {
  try {
    const txt = await fs.readFile(path.join(ROOT, f), "utf-8");
    for (const line of txt.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        let v = m[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        process.env[m[1]] = v;
      }
    }
  } catch {}
}

function sluggify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Quita código JSX/MDX para que el índice sea texto buscable limpio
function stripMdx(raw) {
  return (
    raw
      // code fences
      .replace(/```[\s\S]*?```/g, " ")
      // import / export lines
      .replace(/^(import|export)\s.*$/gm, " ")
      // JSX component tags <Foo ... /> / <Foo> </Foo>
      .replace(/<\/?[A-Z][^>]*\/?>/g, " ")
      .replace(/<\/?(Tabs|TabsContent|TabsList|TabsTrigger|Note|Stepper|StepperItem|Files|Outlet|Table|TableBody|TableCell|TableHead|TableHeader|TableRow|img|a|pre|code|div|span)[^>]*>/gi, " ")
      // markdown links/images -> texto
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // inline code, bold, italic
      .replace(/`([^`]+)`/g, "$1")
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      // headings markers (ya los procesamos aparte, aquí solo limpia)
      .replace(/^#{1,6}\s+/gm, "")
      // html comments
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/\{[^}]*\}/g, " ")
      .replace(/[ \t]+/g, " ")
      .trim()
  );
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

// Divide el body en secciones por headings ## / ### / ####
function splitSections(body) {
  const lines = body.split("\n");
  const sections = [];
  let current = { level: 1, heading: null, anchor: null, lines: [] };
  for (const line of lines) {
    const m = line.match(/^(#{2,4})\s+(.+?)\s*$/);
    if (m) {
      if (current.lines.join("\n").trim() || current.heading) sections.push(current);
      const level = m[1].length;
      const heading = m[2].trim();
      current = { level, heading, anchor: sluggify(heading), lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.lines.join("\n").trim() || current.heading) sections.push(current);
  return sections;
}

async function buildRecords() {
  const records = [];
  for (const lang of LANGS) {
    const files = await collectMdxFiles(path.join(DOCS_ROOT, lang));
    for (const file of files) {
      const rel = path.relative(path.join(DOCS_ROOT, lang), path.dirname(file)).replace(/\\/g, "/");
      if (!rel) continue;
      const raw = await fs.readFile(file, "utf-8");
      const { data, content: body } = matter(raw);
      const title = data.title || rel.split("/").pop();
      const description = data.description || "";
      const baseUrl = `/${lang}/docs/${rel}`;
      const lvl0 = lang === "es" ? "Documentación" : "Documentation";

      // Record principal (lvl1): el título de la página -> esto hace que buscar
      // "MagneticDock", "GlassStack", etc. devuelva la página aunque el crawler no exista.
      records.push({
        objectID: `${lang}-${rel}-lvl1`,
        lang,
        title,
        url: baseUrl,
        anchor: null,
        type: "lvl1",
        hierarchy: { lvl0, lvl1: title, lvl2: null, lvl3: null },
        content: stripMdx(description).slice(0, 2000) || null,
      });

      const sections = splitSections(body);
      sections.forEach((s, i) => {
        const text = stripMdx(s.lines.join("\n")).slice(0, 3000);
        if (!text && !s.heading) return;
        const hierarchy = { lvl0, lvl1: title, lvl2: null, lvl3: null };
        let type = "content";
        if (s.heading && s.level === 2) {
          hierarchy.lvl2 = s.heading;
          type = "lvl2";
        } else if (s.heading && s.level === 3) {
          // conserva el último h2 como contexto si existe
          const prevH2 = [...sections.slice(0, i)].reverse().find((x) => x.level === 2 && x.heading);
          if (prevH2) hierarchy.lvl2 = prevH2.heading;
          hierarchy.lvl3 = s.heading;
          type = "lvl3";
        } else if (s.heading) {
          hierarchy.lvl2 = s.heading;
          type = "lvl2";
        }
        records.push({
          objectID: `${lang}-${rel}-${i}`,
          lang,
          title,
          url: s.anchor ? `${baseUrl}#${s.anchor}` : baseUrl,
          anchor: s.anchor,
          type,
          hierarchy,
          content: text || null,
        });
      });
    }
  }
  return records;
}

const records = await buildRecords();
console.log(`[algolia] Docs encontradas -> ${records.length} records (${LANGS.join(", ")})`);
const lvl1 = records.filter((r) => r.type === "lvl1");
console.log(`[algolia] Páginas (lvl1): ${lvl1.length}`);
console.log(`[algolia] Ej: ${lvl1.slice(0, 8).map((r) => r.hierarchy.lvl1).join(" | ")}${lvl1.length > 8 ? " ..." : ""}`);

if (DRY_RUN) {
  console.log("[algolia] --dry-run: no se subió nada.");
  process.exit(0);
}

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY;

if (!appId || !indexName) {
  console.error("[algolia] Faltan NEXT_PUBLIC_ALGOLIA_APP_ID / NEXT_PUBLIC_ALGOLIA_INDEX en el entorno.");
  process.exit(1);
}
if (!adminKey) {
  console.warn("[algolia] ALGOLIA_ADMIN_API_KEY no definida -> se omite el indexado (el build sigue OK).");
  console.warn("[algolia] Consigue la Admin API Key en Algolia Dashboard > Settings > API Keys y defínela en Vercel/.env.local (nunca la expongas con NEXT_PUBLIC_).");
  process.exit(0);
}

const client = algoliasearch(appId, adminKey);
console.log(`[algolia] Subiendo ${records.length} records a '${indexName}' con replaceAllObjects...`);
await client.replaceAllObjects({ indexName, objects: records });
console.log("[algolia] OK - índice actualizado. Las páginas nuevas ya aparecen en el search.");
