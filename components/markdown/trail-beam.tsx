"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { TrailBeam as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TrailBeam: any = Base;

export default function TrailBeamPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 400 }} className="w-full" aria-hidden />;
  return (
    <TrailBeam
      darkMode={theme === "dark"}
      accent="from-violet-500 via-fuchsia-400 to-cyan-300"
      steps={[
        { title: "Descubre", content: "El haz sigue tu scroll con un orbe de progreso." },
        { title: "Explora", content: "Cada card se ilumina al entrar en viewport." },
        { title: "Construye", content: "Usa steps o children libres segun necesites." },
      ]}
    />
  );
}
