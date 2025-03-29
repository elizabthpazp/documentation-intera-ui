"use client";

import "@elizabthpazp/intera-ui/dist/globals.css";
import { Activities } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
 
export default function ActivitiesC() {  
  const { theme } = useTheme();
  return ( 
    <Activities darkMode={theme == 'dark'} />
  );
}
