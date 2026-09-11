"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { CommandPalette } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { Search, Sparkles, Settings, User } from "lucide-react";

export default function CommandPalettePreview() {
  const { theme } = useTheme();
  const items = [
    { id: "theme", label: "Toggle Theme", icon: <Sparkles size={16} />, shortcut: "⌘T", onSelect: () => console.log("toggle theme") },
    { id: "profile", label: "Open Profile", icon: <User size={16} />, shortcut: "⌘P", onSelect: () => console.log("profile") },
    { id: "settings", label: "Open Settings", icon: <Settings size={16} />, onSelect: () => console.log("settings") },
    { id: "search", label: "Search Docs", icon: <Search size={16} />, shortcut: "⌘K", onSelect: () => console.log("search") },
  ];
  return (
    <div className="flex justify-center py-6">
      <CommandPalette items={items} darkMode={theme == "dark"} placeholder="Type a command..." />
    </div>
  );
}
