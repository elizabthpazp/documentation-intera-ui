"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { MagneticButton } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function MagneticButtonPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-10">
      <MagneticButton darkMode={theme == "dark"} strength={0.5} onClick={() => {}}>
        EXPLORAR AHORA
      </MagneticButton>
    </div>
  );
}
