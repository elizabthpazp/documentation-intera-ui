"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { BloomText as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const BloomText: any = Base;

export default function BloomTextPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 220 }} className="w-full" aria-hidden />;
  return (
    <BloomText
      darkMode={theme === "dark"}
      text="Interfaces que respiran y enamoran."
      highlightWords={["respiran,"]}
      textClassName="text-3xl sm:text-5xl"
      showReplay
    />
  );
}
