"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { BottomSheet } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function BottomSheetPreview() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <button
        onClick={() => setOpen(true)}
        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${theme == "dark" ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"}`}
      >
        Open Sheet
      </button>
      <BottomSheet open={open} onOpenChange={setOpen} title="Bottom Sheet" darkMode={theme == "dark"} snapPoints={[0.85]}>
        <div className="p-2 space-y-3">
          <p className={`text-sm ${theme == "dark" ? "text-gray-400" : "text-gray-600"}`}>Arrastra hacia abajo para cerrar o toca el backdrop.</p>
          <div className={`h-24 rounded-xl border-2 border-dashed flex items-center justify-center ${theme == "dark" ? "border-gray-700 text-gray-500" : "border-gray-200 text-gray-400"}`}>Content area</div>
        </div>
      </BottomSheet>
    </div>
  );
}
