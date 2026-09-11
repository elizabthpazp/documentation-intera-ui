"use client";

import { EachRoute } from "@/lib/routes-config";
import Anchor from "./anchor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/components/ui/sheet";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/contexts/language-provider";

function translateRouteTitle(href: string, t: any): string | null {
  const clean = href.replace(/^\/(es|en)/, "").replace(/^\/docs/, "");
  // after stripping locale and docs, href is like /getting-started or /getting-started/introduction
  // but for nested we need to handle full path without locale
  const normalized = clean.startsWith("/") ? clean : `/${clean}`;
  if (normalized === "/getting-started") return t.routes.gettingStarted;
  if (normalized === "/getting-started/introduction") return t.routes.introduction;
  if (normalized === "/getting-started/installation") return t.routes.installation;
  if (normalized === "/getting-started/quick-start-guide") return t.routes.quickStart;
  if (normalized === "/getting-started/project-structure") return t.routes.projectStructure;
  if (normalized === "/getting-started/components") return t.routes.components;
  // also handle href that already is just /getting-started (without docs prefix) for top level
  if (href.endsWith("/getting-started")) return t.routes.gettingStarted;
  return null;
}

export default function SubLink({
  title,
  href,
  items,
  noLink,
  level,
  isSheet,
  tag,
}: EachRoute & { level: number; isSheet: boolean }) {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useLanguage();
  const displayTitle = translateRouteTitle(href, t) ?? title;
  const displayTag = tag ? (tag === "New" || tag === "Nuevo" ? t.common.new : tag) : undefined;

  useEffect(() => {
    if (path == href || path.includes(href)) setIsOpen(true);
  }, [href, path]);

  const Comp = (
    <Anchor
      activeClassName="text-primary dark:font-medium font-semibold"
      href={href}
    >
      {displayTitle}
      {displayTag && (
        <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal">
          {displayTag}
        </span>
      )}
    </Anchor>
  );

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h4 className="font-medium sm:text-sm text-primary">
      {displayTitle}
      {displayTag && (
        <span className="dark:bg-blue-700 bg-blue-500 rounded-md px-1.5 py-0.5 mx-2 text-xs text-white !font-normal">
          {displayTag}
        </span>
      )}
    </h4>
  );

  if (!items) {
    return <div className="flex flex-col">{titleOrLink}</div>;
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full pr-5">
          <div className="flex items-center justify-between cursor-pointer w-full">
            <span className="w-[95%] overflow-hidden text-ellipsis text-start">
              {titleOrLink}
            </span>
            <span className="sm:ml-0 -mr-1.5">
              {!isOpen ? (
                <ChevronRight className="h-[0.9rem] w-[0.9rem]" />
              ) : (
                <ChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div
            className={cn(
              "flex flex-col items-start sm:text-sm dark:text-stone-300/85 text-stone-800 ml-0.5 mt-2.5 gap-3",
              level > 0 && "pl-4 border-l ml-1.5"
            )}
          >
            {items?.map((innerLink) => {
              const modifiedItems = {
                ...innerLink,
                href: `${href + innerLink.href}`,
                level: level + 1,
                isSheet,
              };
              return <SubLink key={modifiedItems.href} {...modifiedItems} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
