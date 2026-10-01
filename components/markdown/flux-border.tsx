"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { FluxBorder as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FluxBorder: any = Base;

export default function FluxBorderPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 200 }} className="w-full" aria-hidden />;
  return (
    <div className="flex justify-center py-6">
      <FluxBorder darkMode={theme === "dark"} glow="violet" speed={4} radius="rounded-[2rem]">
        <div className="px-10 py-8 text-center">
          <p className="font-bold">Tu card / boton grande</p>
          <p className="text-sm opacity-70">Hover para acelerar el anillo</p>
        </div>
      </FluxBorder>
    </div>
  );
}
