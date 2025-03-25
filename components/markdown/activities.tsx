"use client";

import "@elizabthpazp/react-components/dist/globals.css";
import { Activities } from "@elizabthpazp/react-components";
import { useTheme } from "next-themes";
 
export default function ActivitiesC() {  
  const { theme } = useTheme();
  return ( 
    <Activities darkMode={theme == 'dark'} />
  );
}
