export type Lang = "es" | "en";

export const dictionaries = {
  es: {
    navbar: {
      documentation: "Documentación",
      blog: "Blog",
      contact: "Contacto",
    },
    home: {
      followGithub: "Síguenos en GitHub",
      title: "Componentes React gratuitos para tu proyecto",
      subtitle: "Componentes interactivos, ligeros y hermosos, fáciles de integrar en tu sitio web",
      getStarted: "Comenzar",
      starGithub: "Estrella en GitHub",
    },
    footer: {
      builtBy: "Creado por",
      source: "El código fuente está disponible en",
    },
    toc: {
      onThisPage: "En esta página",
    },
    pagination: {
      previous: "Anterior",
      next: "Siguiente",
    },
    routes: {
      gettingStarted: "Primeros Pasos",
      introduction: "Introducción",
      installation: "Instalación",
      quickStart: "Guía Rápida",
      projectStructure: "Estructura del Proyecto",
      components: "Componentes",
    },
    common: {
      new: "Nuevo",
      docs: "Docs",
    },
  },
  en: {
    navbar: {
      documentation: "Documentation",
      blog: "Blog",
      contact: "Contact",
    },
    home: {
      followGithub: "Follow along on GitHub",
      title: "Free React Components for your project",
      subtitle: "Interactive / Lightweight / Beautiful components, easy to integrate into your website",
      getStarted: "Get Started",
      starGithub: "Star on GitHub",
    },
    footer: {
      builtBy: "Build by",
      source: "The source code is available on",
    },
    toc: {
      onThisPage: "On this page",
    },
    pagination: {
      previous: "Previous",
      next: "Next",
    },
    routes: {
      gettingStarted: "Getting Started",
      introduction: "Introduction",
      installation: "Installation",
      quickStart: "Quick Start Guide",
      projectStructure: "Project Structure",
      components: "Components",
    },
    common: {
      new: "New",
      docs: "Docs",
    },
  },
} as const;

export function getDictionary(lang: Lang) {
  return dictionaries[lang];
}
