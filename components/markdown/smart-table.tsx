"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { SmartTable as Base } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SmartTable: any = Base;

export default function SmartTablePreview() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: 400 }} className="w-full" aria-hidden />;
  return (
    <SmartTable
      darkMode={theme === "dark"}
      pageSize={5}
      columns={[
        { key: "name", label: "Cliente", sortable: true },
        { key: "plan", label: "Plan", sortable: true },
        { key: "status", label: "Estado", sortable: true },
        { key: "mrr", label: "MRR", sortable: true },
      ]}
      data={[
        { id: "1", name: "Acme", plan: "Scale", status: "active", mrr: 490 },
        { id: "2", name: "Globex", plan: "Starter", status: "trial", mrr: 29 },
        { id: "3", name: "Initech", plan: "Enterprise", status: "past_due", mrr: 990 },
        { id: "4", name: "Umbrella", plan: "Scale", status: "canceled", mrr: 0 },
        { id: "5", name: "Hooli", plan: "Scale", status: "active", mrr: 320 },
        { id: "6", name: "Stark", plan: "Enterprise", status: "active", mrr: 1200 },
      ]}
      onSelectionChange={(ids: any) => console.log(ids)}
    />
  );
}
