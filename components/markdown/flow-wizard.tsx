"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { FlowWizard as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FlowWizard: any = Base;

export default function FlowWizardPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 400 }} className="w-full" aria-hidden />;
  return (
    <div className="max-w-xl mx-auto w-full">
      <FlowWizard darkMode={theme === "dark"} onComplete={(form: any) => console.log(form)} />
    </div>
  );
}
