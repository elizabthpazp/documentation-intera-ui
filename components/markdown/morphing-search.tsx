"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { MorphingSearch } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function MorphingSearchPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-8">
      <MorphingSearch darkMode={theme == "dark"} placeholder="Buscar..." onSearch={(v: string) => console.log(v)} className="mx-auto" />
    </div>
  );
}
