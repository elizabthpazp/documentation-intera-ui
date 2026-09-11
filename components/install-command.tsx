"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, TerminalSquareIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/contexts/language-provider";

type Manager = "npm" | "yarn" | "pnpm" | "bun";

const commands: Record<Manager, string> = {
  npm: "npm install @elizabthpazp/intera-ui",
  yarn: "yarn add @elizabthpazp/intera-ui",
  pnpm: "pnpm add @elizabthpazp/intera-ui",
  bun: "bun add @elizabthpazp/intera-ui",
};

const managers: { id: Manager; label: string }[] = [
  { id: "npm", label: "npm" },
  { id: "yarn", label: "yarn" },
  { id: "pnpm", label: "pnpm" },
  { id: "bun", label: "bun" },
];

export function InstallCommand() {
  const { lang } = useLanguage();
  const [active, setActive] = useState<Manager>("npm");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(commands[active]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="w-full max-w-[560px] mt-2 sm:mt-6">
      <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
        {/* Header tabs */}
        <div className="flex items-center justify-between px-1.5 py-1.5 bg-muted/40 border-b">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 sm:gap-1.5 pl-2 sm:pl-3 pr-1 sm:pr-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full bg-background border shadow-sm">
              {managers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  className={cn(
                    "relative px-3 sm:px-4 py-1.5 text-xs sm:text-[13px] font-mono font-medium rounded-full transition-colors",
                    active === m.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active === m.id && (
                    <motion.div
                      layoutId="install-active"
                      className="absolute inset-0 bg-foreground rounded-full"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{m.label}</span>
                </button>
              ))}
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 pr-3 text-[11px] font-mono text-muted-foreground">
            <TerminalSquareIcon className="w-3.5 h-3.5" />
            {lang === "es" ? "terminal" : "terminal"}
          </span>
        </div>

        {/* Command */}
        <div className="relative flex items-center gap-3 px-4 sm:px-5 py-4 bg-background">
          <span className="text-muted-foreground font-mono text-sm select-none">$</span>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.code
                key={active}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="block font-mono text-[13px] sm:text-[14px] font-medium truncate"
              >
                {commands[active]}
              </motion.code>
            </AnimatePresence>
          </div>

          <button
            onClick={copy}
            aria-label={copied ? "Copiado" : "Copiar"}
            className={cn(
              "shrink-0 inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-full border text-xs font-medium transition-all",
              copied
                ? "bg-green-500 border-green-500 text-white"
                : "bg-muted hover:bg-muted/80 border-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === "es" ? "Copiado!" : "Copied!"}</span>
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === "es" ? "Copiar" : "Copy"}</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="px-4 sm:px-5 pb-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground font-mono">
            {lang === "es" ? (
              <>
                Elige tu gestor favorito • funciona con <span className="text-foreground">React 18+</span>, <span className="text-foreground">Next.js</span> y <span className="text-foreground">Tailwind</span>
              </>
            ) : (
              <>
                Pick your favorite manager • works with <span className="text-foreground">React 18+</span>, <span className="text-foreground">Next.js</span> & <span className="text-foreground">Tailwind</span>
              </>
            )}
          </p>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {lang === "es" ? "¿Prefieres clonar? " : "Prefer to clone? "}
        <a href="https://github.com/elizabthpazp/intera-ui" target="_blank" className="underline underline-offset-2 hover:text-foreground">
          GitHub
        </a>
      </p>
    </div>
  );
}
