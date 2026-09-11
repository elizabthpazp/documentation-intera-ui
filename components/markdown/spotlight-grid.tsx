"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { SpotlightGrid } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function SpotlightGridPreview() {
  const { theme } = useTheme();
  return (
    <SpotlightGrid
      darkMode={theme == "dark"}
      items={[
        { id: "1", title: "Realtime", content: "Sync en 12ms con WebSocket" },
        { id: "2", title: "Secure", content: "E2E encryption by default" },
        { id: "3", title: "Fast", content: "Edge deployed en 35 regiones" },
        { id: "4", title: "Scalable", content: "Auto-scale a 1M rps" },
      ]}
    />
  );
}
