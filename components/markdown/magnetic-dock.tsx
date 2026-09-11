"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { MagneticDock } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { Home, Search, User, Settings } from "lucide-react";

export default function MagneticDockPreview() {
  const { theme } = useTheme();
  const items = [
    { icon: <Home size={20} />, label: "Home", onClick: () => {} },
    { icon: <Search size={20} />, label: "Search", onClick: () => {} },
    { icon: <User size={20} />, label: "Profile", onClick: () => {} },
    { icon: <Settings size={20} />, label: "Settings", onClick: () => {} },
  ];
  return (
    <div className="flex justify-center py-8 overflow-visible">
      <MagneticDock items={items} darkMode={theme == "dark"} baseSize={40} magnification={64} />
    </div>
  );
}
