"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import LocalSearch from "./local-search"; 
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/components/contexts/language-provider";

const NpmIcon = () => (
  <svg className="p-1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250 250"
    width="32"
    height="32"
  >
    <rect width="250" height="250" fill="white" />
    <path fill="black" d="M50 50h150v150h-75V75h-25v125H50V50z" />
  </svg>
);

export const NAVLINKS = [
  {
    title: "Documentación",
    href: `/docs${page_routes[0].href}`,
  },
  {
    title: "Blog",
    href: `https://blog.elijs.dev/`,
  },
  {
    title: "Contacto",
    href: "mailto:elizabethpazp695@gmail.com" 
  },
  // {
  //   title: "Examples",
  //   href: "#",
  // },
  // {
  //   title: "Guides",
  //   href: "#",
  // },
  // {
  //   title: "Community",
  //   href: "https://github.com/elizabthpazp/intera-ui/discussions",
  // },
];

export function Navbar() { 
  return (
    <nav
      className="w-full border-b h-16 sticky top-0 z-50 bg-background"
      style={{ zIndex: 99 }}
    >
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2">
        <div className="flex items-center sm:gap-5 gap-2.5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />  
            </div>
            <div className="md:flex hidden items-center gap-6 ml-5 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex flex-1 min-w-0 items-center justify-end gap-2 sm:gap-3 sm:flex-none ml-1">
          <LocalSearch />
          <div className="flex items-center shrink-0">
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <Link
                href="https://github.com/elizabthpazp/intera-ui"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://www.npmjs.com/package/@elizabthpazp/intera-ui"
                target="_blank"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <NpmIcon />
              </Link>
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavMenu({ isSheet = false }) {
  const { t, lang } = useLanguage();
  const links = [
    { title: t.navbar.documentation, href: `/${lang}/docs${page_routes[0].href}` },
    { title: t.navbar.blog, href: `https://blog.elijs.dev/` },
    { title: t.navbar.contact, href: "mailto:elizabethpazp695@gmail.com" },
  ];
  return (
    <>
      {links.map((item, index) => {
        const Comp = (
          <Anchor target={index==1 ? '_blank' : ''}
            key={item.title + item.href}
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 pt-1 sm:text-lg text-[14.5px] dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
