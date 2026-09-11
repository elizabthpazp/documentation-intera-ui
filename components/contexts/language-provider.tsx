"use client";

import * as React from "react";
import { dictionaries, Lang } from "@/lib/dictionaries";
import { usePathname, useRouter } from "next/navigation";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof dictionaries[Lang];
  toggle: () => void;
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLangState] = React.useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const seg = window.location.pathname.split("/")[1];
      if (seg === "es" || seg === "en") return seg as Lang;
    }
    return "es";
  });

  React.useEffect(() => {
    const seg = window.location.pathname.split("/")[1];
    if (seg === "es" || seg === "en") {
      setLangState(seg as Lang);
      document.documentElement.lang = seg;
      localStorage.setItem("lang", seg);
      document.cookie = `lang=${seg}; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }
    const stored = (localStorage.getItem("lang") as Lang | null) || getCookie("lang") as Lang | null;
    if (stored === "es" || stored === "en") {
      setLangState(stored);
      document.documentElement.lang = stored;
    } else {
      document.documentElement.lang = "es";
    }
  }, [pathname]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLang;
    // navigate to same path with new locale prefix
    const current = window.location.pathname;
    const segs = current.split("/").filter(Boolean);
    const hasLocale = segs[0] === "es" || segs[0] === "en";
    const withoutLocale = hasLocale ? "/" + segs.slice(1).join("/") : current;
    const clean = withoutLocale === "/" ? "" : withoutLocale;
    const nextPath = `/${newLang}${clean}${window.location.search}${window.location.hash}`;
    const isDocs = current.includes("/docs");
    if (isDocs) {
      // for docs markdown must be re-fetched from server in new language -> hard navigation
      window.location.href = nextPath;
    } else {
      router.push(nextPath);
      // ensure client UI re-renders
      router.refresh();
    }
  };

  function getCookie(name: string) {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? m[2] : null;
  }

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  const t = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
