export const locales = ["es", "en"] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export const localeMetadata: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  es: {
    title: "InteraUI — Componentes React Gratis | Documentación",
    description: "Componentes React interactivos, ligeros y hermosos, fáciles de integrar en tu sitio web",
    ogLocale: "es_ES",
  },
  en: {
    title: "InteraUI — Free React Components | Documentation",
    description: "Interactive, lightweight and beautiful React components, easy to integrate into your website",
    ogLocale: "en_US",
  },
};
