"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { SwipeToConfirm } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function SwipeToConfirmPreview() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center py-6">
      <SwipeToConfirm
        darkMode={theme == "dark"}
        label="Desliza para confirmar"
        successLabel="Confirmado"
        onConfirm={() => console.log("confirmed")}
        onReset={() => console.log("reset")}
        allowReset
      />
    </div>
  );
}
