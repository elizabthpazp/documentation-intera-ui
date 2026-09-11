"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { useLanguage } from "@/components/contexts/language-provider";

function translateRouteTitle(href: string, t: any): string | null {
  // href is like /getting-started, /getting-started/introduction, etc.
  if (href === "/getting-started") return t.routes.gettingStarted;
  if (href === "/getting-started/introduction") return t.routes.introduction;
  if (href === "/getting-started/installation") return t.routes.installation;
  if (href === "/getting-started/quick-start-guide") return t.routes.quickStart;
  if (href === "/getting-started/project-structure") return t.routes.projectStructure;
  if (href === "/getting-started/components") return t.routes.components;
  return null;
}

export default function DocsMenu({ isSheet = false }) {
  const { t, lang } = useLanguage();

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6 sm:text-base text-[14.5px]">
      {ROUTES.map((item, index) => {
        const translatedTitle = translateRouteTitle(item.href, t) ?? item.title;
        // also translate nested items titles if needed via SubLink
        const modifiedItems = {
          ...item,
          title: translatedTitle,
          href: `/${lang}/docs${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
