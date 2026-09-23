"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, CornerDownLeft } from "lucide-react";
import { useLanguage } from "@/components/contexts/language-provider";

type Entry = {
  id: string;
  lang: string;
  title: string;
  description: string;
  url: string;
  keywords: string;
  text: string;
};

let cache: Entry[] | null = null;
async function loadIndex(): Promise<Entry[]> {
  if (cache) return cache;
  const res = await fetch("/search-index.json");
  if (!res.ok) return [];
  cache = (await res.json()) as Entry[];
  return cache ?? [];
}

function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function score(e: Entry, q: string) {
  const t = norm(e.title);
  const d = norm(e.description);
  const k = norm(e.keywords);
  const b = norm(e.text);
  if (t.startsWith(q)) return 100;
  if (t.includes(q)) return 60;
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => t.includes(w) || d.includes(w) || k.includes(w))) return 50;
  if (d.includes(q) || k.includes(q)) return 30;
  if (b.includes(q)) return 10;
  return 0;
}

export default function LocalSearch() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const t =
    lang === "es"
      ? { placeholder: "Buscar docs...", input: "Buscar componentes...", empty: "Sin resultados", hint: "Escribe el nombre del componente" }
      : { placeholder: "Search docs...", input: "Search components...", empty: "No results", hint: "Type a component name" };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      loadIndex().then(setEntries);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  const results = React.useMemo(() => {
    const q = norm(query.trim());
    const pool = entries.filter((e) => e.lang === lang);
    if (!q) return pool.slice(0, 8);
    return pool
      .map((e) => ({ e, s: score(e, q) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [entries, query, lang]);

  React.useEffect(() => setActive(0), [query]);

  const go = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      go(results[active].url);
    }
  };

  React.useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <>
    <div className="flex-1 min-w-0 sm:flex-none flex">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-w-0 w-full sm:w-52 items-center gap-2 pl-4 pr-2 py-2 ml-0 rounded-md bg-muted/55 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 text-muted-foreground text-[14px] font-code text-left"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="flex-1 min-w-0 truncate">{t.placeholder}</span>
        <span className="hidden sm:flex items-center gap-0.5 text-xs">
          <span className="bg-background/30 border rounded-md py-0.5 px-1 dark:border-neutral-700 border-neutral-300">Ctrl</span>
          <span className="bg-background/30 border rounded-md py-0.5 px-[0.28rem] dark:border-neutral-700 border-neutral-300">K</span>
        </span>
      </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center sm:pt-20 pt-10 px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[560px] rounded-xl border bg-background shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b px-4">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t.input}
                className="w-full h-14 bg-transparent outline-none text-[15px] placeholder:text-muted-foreground"
              />
              <button onClick={() => setOpen(false)} className="text-[13px] text-muted-foreground hover:text-foreground shrink-0">
                ESC
              </button>
            </div>
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {query.trim() ? t.empty : t.hint}
                </p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={r.id}
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.url)}
                    className={`w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left ${
                      i === active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${i === active ? "" : "text-muted-foreground"}`} />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">{r.title}</span>
                      {r.description && (
                        <span className={`block text-xs truncate ${i === active ? "opacity-80" : "text-muted-foreground"}`}>
                          {r.description}
                        </span>
                      )}
                    </span>
                    {i === active && <CornerDownLeft className="w-4 h-4 mt-1 shrink-0 opacity-70" />}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
