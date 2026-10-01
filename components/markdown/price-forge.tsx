"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { PriceForge as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const PriceForge: any = Base;

export default function PriceForgePreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 420 }} className="w-full" aria-hidden />;
  return (
    <PriceForge
      darkMode={theme === "dark"}
      basePerSeat={12}
      onCheckout={(calc: any) => console.log(calc)}
    />
  );
}
