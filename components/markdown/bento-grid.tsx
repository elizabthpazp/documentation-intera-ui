"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { BentoGrid } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";

export default function BentoGridPreview() {
  const { theme } = useTheme();
  const items = [
    { id: "1", title: "Revenue", content: "$42k this month", colSpan: "sm:col-span-2", color: "from-violet-500 to-purple-600" },
    { id: "2", title: "Inbox", content: "12 new messages", rowSpan: "sm:row-span-2", color: "from-blue-500 to-cyan-500" },
    { id: "3", title: "Deploy", content: "v1.2 shipped", color: "from-emerald-500 to-teal-600" },
  ];
  return <BentoGrid items={items} darkMode={theme == "dark"} draggable />;
}
