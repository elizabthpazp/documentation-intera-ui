"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { LoopCards as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LoopCards: any = Base;

export default function LoopCardsPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 240 }} className="w-full" aria-hidden />;
  return (
    <LoopCards
      darkMode={theme === "dark"}
      direction="right"
      speed={32}
      pauseOnHover
      items={[
        { id: "1", title: "Diseno vivo", content: "Micro-interacciones que respiran." },
        { id: "2", title: "Motion real", content: "Springs fisicos, no lineales." },
        { id: "3", title: "Dark ready", content: "Claro / oscuro sin friccion." },
        { id: "4", title: "Touch first", content: "Funciona con dedo, no solo hover." },
        { id: "5", title: "Loop infinito", content: "Cinta sin cortes visibles." },
      ]}
    />
  );
}
