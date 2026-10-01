"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { DropVault as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DropVault: any = Base;

export default function DropVaultPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 300 }} className="w-full" aria-hidden />;
  return (
    <DropVault
      darkMode={theme === "dark"}
      maxMb={8}
      maxFiles={8}
      onFilesChange={(files: any) => console.log(files)}
    />
  );
}
