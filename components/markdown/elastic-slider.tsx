"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { ElasticSlider } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function ElasticSliderPreview() {
  const { theme } = useTheme();
  const [val, setVal] = useState(80);
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <ElasticSlider min={0} max={200} defaultValue={val} onChange={setVal} darkMode={theme == "dark"} />
      <p className="text-sm text-muted-foreground">Value: {val}</p>
    </div>
  );
}
