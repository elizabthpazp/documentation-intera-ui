"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { InteractiveLens } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function InteractiveLensPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-6">
      <InteractiveLens
        size={200}
        darkMode={theme == "dark"}
        className="w-full max-w-md h-[260px] rounded-2xl overflow-hidden border"
        background={
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-800 text-6xl font-black select-none">
            DARK
          </div>
        }
      >
        <div className="w-full h-full bg-white flex items-center justify-center text-black text-6xl font-black select-none">
          LIGHT
        </div>
      </InteractiveLens>
    </div>
  );
}
