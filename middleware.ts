import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "./lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip next internal, api, static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_vercel") ||
    PUBLIC_FILE.test(pathname) ||
    pathname === "/favicon.ico" ||
    pathname === "/opengraph-image.jpg" ||
    pathname === "/logo-intera-ui.jpeg"
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // If URL already has locale prefix
  if (first && isLocale(first)) {
    const lang = first;
    const urlWithoutLocale = "/" + segments.slice(1).join("/");
    const normalized = urlWithoutLocale === "/" ? "/" : urlWithoutLocale.replace(/\/$/, "") || "/";
    // Rewrite to path without locale but keep URL visible via header? Actually we want to serve same file but keep URL with locale.
    // Instead of rewrite, we set cookie and continue. The app will handle via [lang] or via cookie.
    // For app without [lang] segment, we rewrite to stripped path internally.
    // Next.js will still match /docs etc. after strip, but browser keeps /es or /en.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", lang);

    const response = NextResponse.rewrite(new URL(normalized === "" ? "/" : normalized, request.url), {
      request: { headers: requestHeaders },
    });
    response.cookies.set("lang", lang, { path: "/", maxAge: 31536000, sameSite: "lax" });
    response.headers.set("x-locale", lang);
    return response;
  }

  // No locale prefix -> redirect to default locale (es) with prefix for SEO
  // Check cookie for preferred language, but default to es per requirement
  const cookieLang = request.cookies.get("lang")?.value;
  let preferred: string = defaultLocale;
  // If user has explicitly set lang cookie to en, respect it for root redirect
  if (cookieLang && isLocale(cookieLang)) {
    // For direct navigation without prefix, we still redirect to default es to keep canonical?
    // But if user previously chose en, we respect it.
    preferred = cookieLang;
  }
  // For SEO we always redirect to /es for default, but if cookie is en we redirect to /en
  // To enforce default es for new visitors, we use defaultLocale unless cookie is en
  const targetLang = preferred;
  const redirectUrl = new URL(`/${targetLang}${pathname === "/" ? "" : pathname}`, request.url);
  // Preserve search params
  redirectUrl.search = request.nextUrl.search;
  const res = NextResponse.redirect(redirectUrl);
  res.cookies.set("lang", targetLang, { path: "/", maxAge: 31536000, sameSite: "lax" });
  return res;
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|.*\\..*).*)"],
};
