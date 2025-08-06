"use client";

import { Congress2025 } from "@/components/Congress2025";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Italian2025Page() {
  return (
    <LanguageProvider language="it">
      <Congress2025 />
    </LanguageProvider>
  );
}