"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { SlotPicker as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SlotPicker: any = Base;

export default function SlotPickerPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 380 }} className="w-full" aria-hidden />;
  return (
    <SlotPicker
      darkMode={theme === "dark"}
      onConfirm={({ date, slot }: any) => console.log(date, slot)}
    />
  );
}
