import { BaseMdxFrontmatter, getAllChilds } from "@/lib/markdown";
import Link from "next/link";
import { cookies, headers } from "next/headers";

export default async function Outlet({ path }: { path: string }) {
  if (!path) throw new Error("path not provided");
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
  const output = await getAllChilds(path, lang);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {output.map((child) => (
        <ChildCard {...child} key={child.title} />
      ))}
    </div>
  );
}

type ChildCardProps = BaseMdxFrontmatter & { href: string };

function ChildCard({ description, href, title }: ChildCardProps) {
  return (
    <Link
      href={href}
      className="border rounded-md p-4 no-underline flex flex-col gap-0.5"
    >
      <h4 className="!my-0">{title}</h4>
      <p className="text-sm text-muted-foreground !my-0">{description}</p>
    </Link>
  );
}
