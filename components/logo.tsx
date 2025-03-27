
"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link href="/" className="flex items-center gap-1">
      {isClient ? <NextImage
            src={theme == 'dark' ? '/logo-white.png' : '/logo.png'}
            alt={''}
            width={40}
            height={40}
            quality={100} 
          /> : ''} 
      <h2 className="text-[17px] pt-1 font-bold font-code">InteraUI</h2>
    </Link>
  );
}