"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { PerspectiveCard } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { Rocket } from "lucide-react";

export default function PerspectiveCardPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-8">
      <PerspectiveCard darkMode={theme == "dark"} className="w-64 h-80 flex flex-col items-center justify-center gap-4">
        <Rocket size={48} />
        <h3 className="font-black tracking-widest text-center">3D PERSPECTIVE</h3>
        <p className="text-xs opacity-50 text-center">Hover para profundidad</p>
      </PerspectiveCard>
    </div>
  );
}
