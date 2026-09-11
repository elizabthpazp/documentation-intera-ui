"use client";

import { useLanguage } from "@/components/contexts/language-provider";

export function TocHeading() {
  const { t } = useLanguage();
  return <h3 className="font-medium text-sm">{t.toc.onThisPage}</h3>;
}
