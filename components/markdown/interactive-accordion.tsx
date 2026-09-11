"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { InteractiveAccordion } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function InteractiveAccordionPreview() {
  const { theme } = useTheme();
  const items = [
    { id: "1", title: "Arquitectura", content: "React 19 + Framer Motion con spring physics y layoutId." },
    { id: "2", title: "Diseño", content: "Minimalista, glassmorphism, 100% customizable vía cn() y tailwind-merge." },
    { id: "3", title: "Performance", content: "Lightweight, sin dependencias pesadas, solo framer-motion y lucide-react." },
  ];
  return (
    <div className="flex justify-center py-4">
      <InteractiveAccordion items={items} darkMode={theme == "dark"} />
    </div>
  );
}
