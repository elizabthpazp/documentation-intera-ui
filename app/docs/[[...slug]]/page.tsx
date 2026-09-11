import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import { cookies, headers } from "next/headers";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

async function getLang(): Promise<string> {
  try {
    const h = await headers();
    const xLocale = h.get("x-locale");
    if (xLocale === "en" || xLocale === "es") return xLocale;
  } catch {}
  try {
    const c = await cookies();
    const lang = c.get("lang")?.value;
    return lang === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

export default async function DocsPage(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  const lang = await getLang();
  const res = await getDocsForSlug(pathName, lang);

  if (!res) notFound();
  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] py-10">
        <DocsBreadcrumb paths={slug} />
        <Typography>
          <h1 className="sm:text-3xl text-2xl !-mt-0.5">
            {res.frontmatter.title}
          </h1>
          <p className="-mt-4 text-muted-foreground sm:text-[16.5px] text-[14.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} lang={lang} />
    </div>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  const { slug = [] } = params;

  const pathName = slug.join("/");
  let lang = "es";
  try {
    const h = await headers();
    const xLocale = h.get("x-locale");
    if (xLocale === "en" || xLocale === "es") lang = xLocale;
    else {
      const c = await cookies();
      lang = c.get("lang")?.value === "en" ? "en" : "es";
    }
  } catch {}
  const res = await getDocsForSlug(pathName, lang);
  if (!res) return {};
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
