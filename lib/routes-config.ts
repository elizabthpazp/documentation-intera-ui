// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Primeros Pasos",
    href: "/getting-started",
    noLink: true,
    items: [
      { title: "Introducción", href: "/introduction" },
      {
        title: "Instalación",
        href: "/installation",
      },
      { title: "Guía Rápida", href: "/quick-start-guide" },
      {
        title: "Estructura del Proyecto",
        href: "/project-structure",
      },
      {
        title: "Componentes",
        href: "/components",
        items: [
          { title: "MagneticDock", href: "/magnetic-dock", tag: "New" },
          { title: "CommandPalette", href: "/command-palette", tag: "New" },
          { title: "ButtonCard", href: "/button-card", tag: "New" },
          { title: "Activities", href: "/activities", tag: "New" },
          { title: "OrbitalMenu", href: "/orbital-menu", tag: "New" },
          { title: "MorphingSearch", href: "/morphing-search" },
          { title: "GlassStack", href: "/glass-stack" },
          { title: "FluidTabs", href: "/fluid-tabs" },
          { title: "SwipeToConfirm", href: "/swipe-to-confirm" },
          { title: "InteractiveAccordion", href: "/interactive-accordion" },
          { title: "InteractiveLens", href: "/interactive-lens" },
          { title: "BentoGrid", href: "/bento-grid" },
          { title: "ImageCompare", href: "/image-compare" },
          { title: "ElasticSlider", href: "/elastic-slider" },
          { title: "PerspectiveCard", href: "/perspective-card" },
          { title: "BottomSheet", href: "/bottom-sheet" },
          { title: "KineticMorphText", href: "/kinetic-morph-text" },
          { title: "LiquidProgress", href: "/liquid-progress" },
          { title: "MagneticButton", href: "/magnetic-button" },
          { title: "SpotlightGrid", href: "/spotlight-grid" },
          { title: "CardProfile", href: "/card-profile" },
          { title: "CatLoader", href: "/cat-loader" },
          { title: "GiftBox", href: "/gift-box" },
          { title: "TextMasking", href: "/text-masking" },
          { title: "Tree", href: "/tree" },
          { title: "TreeTriangle", href: "/tree-triangle" },
          { title: "BorderImage", href: "/border-image" },
        ],
      }, 
      // {
      //   title: "Customize",
      //   href: "/customize",
      // },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();

export function getPreviousNext(path: string) {
  const index = page_routes.findIndex(({ href }) => href == `/${path}`);
  return {
    prev: page_routes[index - 1],
    next: page_routes[index + 1],
  };
}
