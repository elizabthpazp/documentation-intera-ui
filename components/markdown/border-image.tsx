"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { BorderImage } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function BorderImagePreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-4">
      <BorderImage darkMode={theme == "dark"} size={140} />
    </div>
  );
}
