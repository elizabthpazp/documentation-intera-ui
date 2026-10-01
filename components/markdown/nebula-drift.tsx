"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { NebulaDrift as NebulaDriftBase } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const NebulaDrift: any = NebulaDriftBase;

export default function NebulaDriftPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 360 }} className="w-full" aria-hidden />;
  return (
    <NebulaDrift darkMode={theme === "dark"} intensity={1.2} showGrid hint={null} minHeight={360}>
      <div className="py-20 px-8 text-center">
        <h3 className="text-4xl font-black tracking-tighter">Tu hero aqui</h3>
        <p className="mt-2 text-sm opacity-70">Mueve el cursor — la aurora te sigue</p>
      </div>
    </NebulaDrift>
  );
}
