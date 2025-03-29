import type { Metadata } from "next";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

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

export const metadata: Metadata = {
  title: "Free React Components - Documentation",
  icons:['logo-intera-ui.jpeg'],
  assets: ['logo-intera-ui.jpeg'],
  keywords: ['React', 'Components', 'UI', 'InteraUI', 'intera-ui', 'Interactive', 'Free React Components'],
  metadataBase: new URL("https://intera-ui.elijs.dev/"),
  description:
    "Interactive / Lightweight / Beautiful components, easy to integrate into your website",
  creator: 'elijs.dev',
  openGraph: {
    type: "website",
    url: "https://intera-ui.elijs.dev/",
    title: "Free React Components - Documentation",
    description: "Interactive / Lightweight / Beautiful components, easy to integrate into your website",
    siteName: "InteraUI",
    images: [{ url: "https://intera-ui.elijs.dev/logo-intera-ui.jpeg" }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@InteraUI",
    creator: "@elijs.dev",
    images: "https://intera-ui.elijs.dev/logo-intera-ui.jpeg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
 
      </body>
    </html>
  );
}
