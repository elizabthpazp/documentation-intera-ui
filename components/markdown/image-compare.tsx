"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { ImageCompare } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function ImageComparePreview() {
  const { theme } = useTheme();
  return (
    <ImageCompare
      before="https://picsum.photos/seed/before/800/500"
      after="https://picsum.photos/seed/after/800/500"
      beforeLabel="Before"
      afterLabel="After"
      defaultPosition={50}
      darkMode={theme == "dark"}
      className="max-w-5xl shadow-xl"
    />
  );
}
