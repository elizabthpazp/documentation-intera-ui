"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { KineticMorphText } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function KineticMorphTextPreview() {
  const { theme } = useTheme();
  return (
    <KineticMorphText
      texts={["InteraUI", "Interactive", "Modern", "Delightful"]}
      interval={2200}
      variant="blur"
      darkMode={theme == "dark"}
      className="py-6"
    />
  );
}
