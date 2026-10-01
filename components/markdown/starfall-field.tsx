"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { StarfallField as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const StarfallField: any = Base;

export default function StarfallFieldPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 320 }} className="w-full" aria-hidden />;
  return (
    <StarfallField darkMode={theme === "dark"} density={16} speed={1.2} burstOnClick hint={null}>
      <div className="py-20 text-center">
        <h3 className="text-4xl font-black">Click = burst</h3>
        <p className="mt-2 text-sm opacity-70">Lluvia de meteoros interactiva</p>
      </div>
    </StarfallField>
  );
}
