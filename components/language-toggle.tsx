"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/contexts/language-provider";
import { buttonVariants } from "@/components/ui/button";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      onClick={toggle}
      aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
      title={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
      className={buttonVariants({ variant: "ghost", size: "icon" }) + " relative"}
    >
      <Languages className="h-[1.1rem] w-[1.1rem]" />
      <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center uppercase leading-none">
        {lang}
      </span>
    </button>
  );
}
