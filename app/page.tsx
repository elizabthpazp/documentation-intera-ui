"use client";

import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/contexts/language-provider";
import { InstallCommand } from "@/components/install-command";

export default function Home() {
  const { t, lang } = useLanguage();
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center px-2 sm:py-8 py-12">
      <Link
        href="https://github.com/elizabthpazp/intera-ui"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        {t.home.followGithub}{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-[2.4rem] leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-left sm:text-center">
      {lang === "es" ? (
        <>
          Componentes React gratuitos{" "}
          <br className="hidden sm:block" />
          para tu proyecto
        </>
      ) : (
        t.home.title
      )}
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
      {t.home.subtitle}
      </p>
      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
        <Link
          href={`/${lang}/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          {t.home.getStarted}
        </Link>
        <Link target="_blank"
          href="https://github.com/elizabthpazp/intera-ui"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          {t.home.starGithub}
        </Link>
      </div>
      <InstallCommand />
    </div>
  );
}
