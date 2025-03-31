"use client";

import { useEffect, useState } from "react";

export function FooterButtons() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded) return; 

    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);  

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, [scriptLoaded]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/elizabethpH">🍕 Buy me a pizza</a>`,
      }}
    />
  );
}