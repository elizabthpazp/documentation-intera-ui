"use client";

import "@elizabthpazp/react-components/dist/globals.css";
import { CardProfile } from "@elizabthpazp/react-components";
import { useTheme } from "next-themes";
 
export default function ProfileCard() {  
  const { theme } = useTheme();
  return ( 
    <CardProfile darkMode={theme == 'dark'} image={"https://vcbomutuhqqrhxmoxtbx.supabase.co/storage/v1/object/public/images//image.webp"} />
  );
}
