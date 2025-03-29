"use client";
import "@elizabthpazp/intera-ui/dist/globals.css";
import { ButtonCard } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
 
export default function CardButton() {  
  const { theme } = useTheme();
  return ( 
    <ButtonCard darkMode={theme == 'dark'} />
  );
}
