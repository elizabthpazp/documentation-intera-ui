import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { promises as fs } from "fs";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import { page_routes, ROUTES } from "./routes-config";
import { visit } from "unist-util-visit";
import matter from "gray-matter";
import { getIconName, hasSupportedExtension } from "./utils";

// custom components imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pre from "@/components/markdown/pre";
import Note from "@/components/markdown/note";
import CardButton from "@/components/markdown/button-card";
import ActivitiesC from "@/components/markdown/activities";
import ProfileCard from "@/components/markdown/card-profile"; 
import GiftBox1 from "@/components/markdown/gift-box";
import CatLoader1 from "@/components/markdown/cat-loader";
import TreeTriangle1 from "@/components/markdown/tree-triangle"; 
import TextMasking1 from "@/components/markdown/text-masking"; 
import Tree1 from "@/components/markdown/tree"; 
import BorderImagePreview from "@/components/markdown/border-image";
import MagneticDockPreview from "@/components/markdown/magnetic-dock";
import MagneticButtonPreview from "@/components/markdown/magnetic-button";
import GlassStackPreview from "@/components/markdown/glass-stack";
import ElasticSliderPreview from "@/components/markdown/elastic-slider";
import FluidTabsPreview from "@/components/markdown/fluid-tabs";
import PerspectiveCardPreview from "@/components/markdown/perspective-card";
import SwipeToConfirmPreview from "@/components/markdown/swipe-to-confirm";
import MorphingSearchPreview from "@/components/markdown/morphing-search";
import InteractiveLensPreview from "@/components/markdown/interactive-lens";
import InteractiveAccordionPreview from "@/components/markdown/interactive-accordion";
import CommandPalettePreview from "@/components/markdown/command-palette";
import BottomSheetPreview from "@/components/markdown/bottom-sheet";
import ImageComparePreview from "@/components/markdown/image-compare";
import BentoGridPreview from "@/components/markdown/bento-grid";
import KineticMorphTextPreview from "@/components/markdown/kinetic-morph-text";
import LiquidProgressPreview from "@/components/markdown/liquid-progress";
import OrbitalMenuPreview from "@/components/markdown/orbital-menu";
import SpotlightGridPreview from "@/components/markdown/spotlight-grid";
import { InstallCommand } from "@/components/install-command";
import { Stepper, StepperItem } from "@/components/markdown/stepper";
import Image from "@/components/markdown/image";
import Link from "@/components/markdown/link";
import Outlet from "@/components/markdown/outlet";
import Files from "@/components/markdown/files";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// add custom components
const components = {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  pre: Pre,
  Note,
  CardButton,
  ProfileCard,
  ActivitiesC,
  GiftBox1,
  CatLoader1,
  TextMasking1,
  TreeTriangle1,
  Tree1,
  BorderImagePreview,
  MagneticDockPreview,
  MagneticButtonPreview,
  GlassStackPreview,
  ElasticSliderPreview,
  FluidTabsPreview,
  PerspectiveCardPreview,
  SwipeToConfirmPreview,
  MorphingSearchPreview,
  InteractiveLensPreview,
  InteractiveAccordionPreview,
  CommandPalettePreview,
  BottomSheetPreview,
  ImageComparePreview,
  BentoGridPreview,
  KineticMorphTextPreview,
  LiquidProgressPreview,
  OrbitalMenuPreview,
  SpotlightGridPreview,
  InstallCommand,
  Stepper,
  StepperItem,
  img: Image,
  a: Link,
  Outlet,
  Files,
  table: Table,
  thead: TableHeader,
  th: TableHead,
  tr: TableRow,
  tbody: TableBody,
  t: TableCell,
};

// can be used for other pages like blogs, Guides etc
async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preProcess,
          rehypeCodeTitles,
          rehypeCodeTitlesWithLogo,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postProcess,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  });
}

// logic for docs

export type BaseMdxFrontmatter = {
  title: string;
  description: string;
};

export async function getDocsForSlug(slug: string, lang: string = "es") {
  const normalizedLang = lang === "en" ? "en" : "es";
  const tryPaths = [
    getDocsContentPath(slug, normalizedLang),
    getDocsContentPath(slug, "es"),
    getDocsContentPathFallback(slug),
  ];
  for (const p of tryPaths) {
    try {
      const rawMdx = await fs.readFile(p, "utf-8");
      return await parseMdx<BaseMdxFrontmatter>(rawMdx);
    } catch {}
  }
  console.log(`getDocsForSlug not found: ${slug} lang=${lang}`);
}

export async function getDocsForSlugWithLang(slug: string, lang: string) {
  return getDocsForSlug(slug, lang);
}

export async function getDocsTocs(slug: string, lang: string = "es") {
  const normalizedLang = lang === "en" ? "en" : "es";
  let rawMdx: string | null = null;
  for (const p of [getDocsContentPath(slug, normalizedLang), getDocsContentPath(slug, "es"), getDocsContentPathFallback(slug)]) {
    try {
      rawMdx = await fs.readFile(p, "utf-8");
      break;
    } catch {}
  }
  if (!rawMdx) rawMdx = await fs.readFile(getDocsContentPath(slug, "es"), "utf-8");
  // captures between ## - #### can modify accordingly
  const headingsRegex = /^(#{2,4})\s(.+)$/gm;
  let match;
  const extractedHeadings = [];
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const headingLevel = match[1].length;
    const headingText = match[2].trim();
    const slug = sluggify(headingText);
    extractedHeadings.push({
      level: headingLevel,
      text: headingText,
      href: `#${slug}`,
    });
  }
  return extractedHeadings;
}

export function getPreviousNext(path: string) {
  const index = page_routes.findIndex(({ href }) => href == `/${path}`);
  return {
    prev: page_routes[index - 1],
    next: page_routes[index + 1],
  };
}

function sluggify(text: string) {
  const slug = text.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}

function getDocsContentPath(slug: string, lang: string = "es") {
  // lang es|en -> contents/docs/es or contents/docs/en, fallback to contents/docs for backwards compat
  const langPath = path.join(process.cwd(), `/contents/docs/${lang}/${slug}/index.mdx`);
  // check if lang is es/en and file exists will be handled by caller try/catch
  // for default es, also try without lang prefix if not found (original location)
  // we return langPath first; caller will fallback if needed
  // To keep static generation working, we try langPath; if lang==es and file not in es folder but in base, fallback will handle
  return langPath;
}

function getDocsContentPathFallback(slug: string) {
  return path.join(process.cwd(), "/contents/docs/", `${slug}/index.mdx`);
}

function justGetFrontmatterFromMD<Frontmatter>(rawMd: string): Frontmatter {
  return matter(rawMd).data as Frontmatter;
}

export async function getAllChilds(pathString: string, lang: string = "es") {
  const normalizedLang = lang === "en" ? "en" : "es";
  const items = pathString.split("/").filter((it) => it != "");
  let page_routes_copy = ROUTES;

  let prevHref = "";
  for (const it of items) {
    const found = page_routes_copy.find((innerIt) => innerIt.href == `/${it}`);
    if (!found) break;
    prevHref += found.href;
    page_routes_copy = found.items ?? [];
  }
  if (!prevHref) return [];

  return await Promise.all(
    page_routes_copy.map(async (it) => {
      const tryPaths = [
        path.join(process.cwd(), `/contents/docs/${normalizedLang}`, prevHref, it.href, "index.mdx"),
        path.join(process.cwd(), `/contents/docs/es`, prevHref, it.href, "index.mdx"),
        path.join(process.cwd(), "/contents/docs/", prevHref, it.href, "index.mdx"),
      ];
      let raw: string | null = null;
      for (const p of tryPaths) {
        try { raw = await fs.readFile(p, "utf-8"); break; } catch {}
      }
      if (!raw) raw = await fs.readFile(tryPaths[0], "utf-8");
      return {
        ...justGetFrontmatterFromMD<BaseMdxFrontmatter>(raw!),
        href: `/${normalizedLang}/docs${prevHref}${it.href}`,
      };
    }),
  );
}

// for copying the code in pre
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const preProcess = () => (tree: any) => {
  visit(tree, (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      const [codeEl] = node.children;
      if (codeEl.tagName !== "code") return;
      node.raw = codeEl.children?.[0].value;
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postProcess = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node?.type === "element" && node?.tagName === "pre") {
      node.properties["raw"] = node.raw;
    }
  });
};

export type Author = {
  avatar?: string;
  handle: string;
  username: string;
  handleUrl: string;
};

export type BlogMdxFrontmatter = BaseMdxFrontmatter & {
  date: string;
  authors: Author[];
  cover: string;
};

export async function getAllBlogStaticPaths() {
  try {
    const blogFolder = path.join(process.cwd(), "/contents/blogs/");
    const res = await fs.readdir(blogFolder);
    return res.map((file) => file.split(".")[0]);
  } catch (err) {
    console.log(err);
  }
}
export async function getAllBlogs() {
  const blogFolder = path.join(process.cwd(), "/contents/blogs/");
  const files = await fs.readdir(blogFolder);
  const uncheckedRes = await Promise.all(
    files.map(async (file) => {
      if (!file.endsWith(".mdx")) return undefined;
      const filepath = path.join(process.cwd(), `/contents/blogs/${file}`);
      const rawMdx = await fs.readFile(filepath, "utf-8");
      return {
        ...justGetFrontmatterFromMD<BlogMdxFrontmatter>(rawMdx),
        slug: file.split(".")[0],
      };
    }),
  );
  return uncheckedRes.filter((it) => !!it) as (BlogMdxFrontmatter & {
    slug: string;
  })[];
}

export async function getBlogForSlug(slug: string) {
  const blogFile = path.join(process.cwd(), "/contents/blogs/", `${slug}.mdx`);
  try {
    const rawMdx = await fs.readFile(blogFile, "utf-8");
    return await parseMdx<BlogMdxFrontmatter>(rawMdx);
  } catch {
    return undefined;
  }
}

function rehypeCodeTitlesWithLogo() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (
        node?.tagName === "div" &&
        node?.properties?.className?.includes("rehype-code-title")
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const titleTextNode = node.children.find((child: any) =>
          child.type === "text"
        );
        if (!titleTextNode) return;

        // Extract filename and language
        const titleText = titleTextNode.value;
        const match = hasSupportedExtension(titleText);
        if (!match) return;

        const splittedNames = titleText.split(".");
        const ext = splittedNames[splittedNames.length - 1];
        const iconClass = `devicon-${
          getIconName(
            ext,
          )
        }-plain text-[17px]`;

        // Insert icon before title text
        if (iconClass) {
          node.children.unshift({
            type: "element",
            tagName: "i",
            properties: { className: [iconClass, "code-icon"] },
            children: [],
          });
        }
      }
    });
  };
}
