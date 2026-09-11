"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { FluidTabs } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useState } from "react";

const LABELS = ["Analytics", "Research", "Develop", "Growth", "Explore", "Insights", "Launch", "Scale"];

export default function FluidTabsPreview() {
  const { theme } = useTheme();
  const [tabs, setTabs] = useState([
    { id: "design", label: "Design" },
    { id: "code", label: "Code" },
    { id: "ship", label: "Ship" },
  ]);
  const [active, setActive] = useState("design");

  const addTab = () => {
    const idx = tabs.length;
    const label = LABELS[idx % LABELS.length] + (idx >= LABELS.length ? ` ${Math.floor(idx / LABELS.length) + 1}` : "");
    const id = label.toLowerCase().replace(/\s+/g, "-") + `-${idx}`;
    setTabs((prev) => [...prev, { id, label }]);
  };

  const removeTab = () => {
    if (tabs.length <= 1) return;
    const next = tabs.slice(0, -1);
    setTabs(next);
    if (!next.find((t) => t.id === active)) setActive(next[0].id);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-6 w-full">
      <div className="w-full max-w-2xl">
        <FluidTabs tabs={tabs} activeTab={active} onChange={setActive} darkMode={theme == "dark"} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={addTab}
          className={
            theme == "dark"
              ? "px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-white text-black hover:bg-zinc-100 transition-colors"
              : "px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase bg-black text-white hover:bg-zinc-800 transition-colors"
          }
        >
          + Add Tab
        </button>
        <button
          onClick={removeTab}
          disabled={tabs.length <= 1}
          className={
            "px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase border transition-colors disabled:opacity-40 disabled:cursor-not-allowed " +
            (theme == "dark" ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800" : "border-zinc-300 text-zinc-600 hover:bg-zinc-50")
          }
        >
          − Remove
        </button>
        <span className={"text-xs font-mono px-2.5 py-1 rounded-full " + (theme == "dark" ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500")}>
          {tabs.length} tabs • active: {active}
        </span>
      </div>

      <p className={"text-xs text-center max-w-md " + (theme == "dark" ? "text-zinc-500" : "text-zinc-400")}>
        FluidTabs soporta <b>N tabs</b> — añade más y verás el scroll horizontal con <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">overflow-x-auto + snap-x</code>
      </p>
    </div>
  );
}
