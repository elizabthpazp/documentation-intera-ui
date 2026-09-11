"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { LiquidProgress } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function LiquidProgressPreview() {
  const { theme } = useTheme();
  const [val, setVal] = useState(64);
  return (
    <div className="flex justify-center py-6">
      <LiquidProgress value={val} onChange={setVal} size={160} label="Upload" darkMode={theme == "dark"} interactive />
    </div>
  );
}
