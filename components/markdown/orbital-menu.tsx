"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { OrbitalMenu } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function OrbitalMenuPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-6 overflow-visible">
      <OrbitalMenu
        radius={90}
        darkMode={theme == "dark"}
        items={[
          { id: "1", icon: "✦", label: "Design", color: "from-violet-500 to-purple-600", onClick: () => {} },
          { id: "2", icon: "⚡", label: "Code", color: "from-blue-500 to-cyan-500", onClick: () => {} },
          { id: "3", icon: "◈", label: "Motion", color: "from-emerald-500 to-teal-600", onClick: () => {} },
          { id: "4", icon: "⬢", label: "Ship", color: "from-orange-500 to-pink-500", onClick: () => {} },
        ]}
      />
    </div>
  );
}
