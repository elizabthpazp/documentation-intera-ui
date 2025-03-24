"use client";
import "@elizabthpazp/react-components/dist/globals.css";
import { ButtonCard } from "@elizabthpazp/react-components";
import { useTheme } from "next-themes";
 
export default function CardButton() {  
  const { theme } = useTheme();
  return ( 
    <ButtonCard darkMode={theme == 'dark'} />
  );
}
