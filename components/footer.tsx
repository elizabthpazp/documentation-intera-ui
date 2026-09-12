"use client";

import Link from "next/link";
import { CommandIcon } from "lucide-react";
import { FooterButtons } from "./footer-buttons";
import { useLanguage } from "@/components/contexts/language-provider";
import { AskAiBadge } from "ask-ai-badge";

export function Footer() {
  const { t, lang } = useLanguage();
  return (
    <>
      {/* Ask AI section */}
      <div className="w-full border-t py-10 flex flex-col items-center gap-3 bg-background">
        <AskAiBadge
          productName="Intera UI"
          productUrl="https://intera-ui.elijs.dev"
          title={t.footer.askAiTitle}
          description={t.footer.askAiDescription}
          locale={lang}
          theme="auto"
          layout="row"
          size="md"
          align="center"
          showLabels
          providers={["chatgpt", "claude", "gemini", "perplexity", "grok"]}
        />
        <Link
          href="https://www.npmjs.com/package/ask-ai-badge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>⚡</span>
          <span>
            {t.footer.askAiPowered}{" "}
            <span className="font-semibold underline underline-offset-2">ask-ai-badge</span>
            {" "}— {t.footer.askAiSubtitle}
          </span>
        </Link>
      </div>

      {/* Existing footer bar */}
      <footer className="border-t w-full h-16">
        <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
          <div className="flex items-center gap-3">
            <CommandIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
            <p className="text-center">
              {t.footer.builtBy}{" "}
              <Link
                target="_blank"
                className="px-1 underline underline-offset-2"
                href="https://elijs.dev"
              >
                elijs.dev
              </Link>
              . {t.footer.source}{" "}
              <Link
                target="_blank"
                className="px-1 underline underline-offset-2"
                href="https://github.com/elizabthpazp/intera-ui"
              >
                GitHub
              </Link>
              .
            </p>
          </div>

          <div className="gap-4 items-center hidden md:flex ml-10">
            <FooterButtons />
          </div>
        </div>
      </footer>
    </>
  );
}
