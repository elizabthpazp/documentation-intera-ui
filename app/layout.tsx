import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { LanguageProvider } from "@/components/contexts/language-provider";
import { Navbar } from "@/components/navbar";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"
import { headers, cookies } from "next/headers";
import { defaultLocale, localeMetadata, type Locale } from "@/lib/i18n";

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: "400",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: "400",
});

async function getLocale(): Promise<Locale> {
  try {
    const h = await headers();
    const xLocale = h.get("x-locale");
    if (xLocale === "es" || xLocale === "en") return xLocale;
  } catch {}
  try {
    const c = await cookies();
    const v = c.get("lang")?.value;
    if (v === "es" || v === "en") return v;
  } catch {}
  return defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = localeMetadata[locale];
  const base = "https://intera-ui.elijs.dev";
  const canonical = locale === "es" ? `${base}/es` : `${base}/en`;
  return {
    title: t.title,
    description: t.description,
    icons: ['logo-intera-ui.jpeg'],
    assets: ['logo-intera-ui.jpeg'],
    keywords: locale === "es"
      ? ['React', 'Componentes', 'UI', 'InteraUI', 'intera-ui', 'Interactivo', 'Componentes React Gratis']
      : ['React', 'Components', 'UI', 'InteraUI', 'intera-ui', 'Interactive', 'Free React Components'],
    metadataBase: new URL(base),
    alternates: {
      canonical,
      languages: {
        es: `${base}/es`,
        en: `${base}/en`,
        "x-default": `${base}/es`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title: t.title,
      description: t.description,
      siteName: "InteraUI",
      locale: t.ogLocale,
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      images: [{ url: `${base}/logo-intera-ui.jpeg` }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@InteraUI",
      creator: "@elijs.dev",
      images: `${base}/logo-intera-ui.jpeg`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"/>
      </head>
      <body
        className={`${sansFont.variable} ${monoFont.variable} font-regular antialiased tracking-wide`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
