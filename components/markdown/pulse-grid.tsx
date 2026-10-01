"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { PulseGrid as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const PulseGrid: any = Base;

export default function PulseGridPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 340 }} className="w-full" aria-hidden />;
  return (
    <PulseGrid darkMode={theme === "dark"} rows={8} cols={12} hint={null} minHeight={340}>
      <div className="py-16 text-center pointer-events-none">
        <h3 className="text-2xl font-black">Tu contenido (clicable)</h3>
        <p className="mt-1 text-sm opacity-70">Hover / touch para encender nodos</p>
      </div>
    </PulseGrid>
  );
}
