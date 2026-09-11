"use client";

import { getPreviousNext } from "@/lib/routes-config";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useLanguage } from "@/components/contexts/language-provider";

function translatePaginationTitle(href: string, fallback: string, t: any): string {
  if (href === "/getting-started/introduction") return t.routes.introduction;
  if (href === "/getting-started/installation") return t.routes.installation;
  if (href === "/getting-started/quick-start-guide") return t.routes.quickStart;
  if (href === "/getting-started/project-structure") return t.routes.projectStructure;
  if (href === "/getting-started/components") return t.routes.components;
  // for component pages keep original title (ButtonCard etc.)
  return fallback;
}

export default function Pagination({ pathname }: { pathname: string }) {
  const { t, lang } = useLanguage();
  // pathname comes from docs page as slug without locale (e.g., getting-started/introduction)
  // getPreviousNext expects path without leading slash? it does `/${path}` comparison, so we need to normalize
  const normalized = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const res = getPreviousNext(normalized);

  return (
    <div className="grid grid-cols-2 flex-grow sm:py-10 py-7 gap-3">
      <div>
        {res.prev && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className:
                "no-underline w-full flex flex-col pl-3 !py-8 !items-start",
            })}
            href={`/${lang}/docs${res.prev.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs">
              <ChevronLeftIcon className="w-[1rem] h-[1rem] mr-1" />
              {t.pagination.previous}
            </span>
            <span className="mt-1 ml-1">{translatePaginationTitle(res.prev.href, res.prev.title, t)}</span>
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className={buttonVariants({
              variant: "outline",
              className:
                "no-underline w-full flex flex-col pr-3 !py-8 !items-end",
            })}
            href={`/${lang}/docs${res.next.href}`}
          >
            <span className="flex items-center text-muted-foreground text-xs">
              {t.pagination.next}
              <ChevronRightIcon className="w-[1rem] h-[1rem] ml-1" />
            </span>
            <span className="mt-1 mr-1">{translatePaginationTitle(res.next.href, res.next.title, t)}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
