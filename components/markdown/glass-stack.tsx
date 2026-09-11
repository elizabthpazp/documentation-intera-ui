"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { GlassStack } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function GlassStackPreview() {
  const { theme } = useTheme();
  const items = [
    { title: "Interacción Dinámica", content: "Física fluida y animaciones spring con Framer Motion." },
    { title: "Estética Moderna", content: "Glassmorphism con backdrop-blur y bordes sutiles." },
    { title: "Customizable", content: "Control total vía className + style + cn() merge." },
  ];
  return <GlassStack items={items} darkMode={theme == "dark"} className="h-[400px]" />;
}
