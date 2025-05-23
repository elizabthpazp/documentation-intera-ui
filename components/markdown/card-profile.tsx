"use client";

import "@elizabthpazp/intera-ui/dist/globals.css";
import { CardProfile } from "@elizabthpazp/intera-ui";
import { useTheme } from "next-themes";
 
export default function ProfileCard() {  
  const { theme } = useTheme();
  return ( 
    <CardProfile darkMode={theme == 'dark'} image={"https://vcbomutuhqqrhxmoxtbx.supabase.co/storage/v1/object/public/images//react-components.webp"} />
  );
}
