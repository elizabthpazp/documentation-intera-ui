"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { FlowBoard as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FlowBoard: any = Base;

export default function FlowBoardPreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 400 }} className="w-full" aria-hidden />;
  return (
    <FlowBoard
      darkMode={theme === "dark"}
      initial={[
        { id: "t1", col: "todo", title: "Disenar landing", tag: "Design" },
        { id: "t2", col: "doing", title: "Copy hero", tag: "Copy" },
        { id: "t3", col: "todo", title: "Setup analytics", tag: "Dev" },
        { id: "t4", col: "done", title: "Logo v1", tag: "Brand" },
      ]}
      onChange={(tasks: any) => console.log(tasks)}
    />
  );
}
