"use client";

import { Congress2024 } from "@/components/Congress2024";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Italian2024Page() {
  return (
    <LanguageProvider language="it">
      <Congress2024 />
    </LanguageProvider>
  );
}