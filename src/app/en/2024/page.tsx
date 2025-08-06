"use client";

import { Congress2024 } from "@/components/Congress2024";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function English2024Page() {
  return (
    <LanguageProvider language="en">
      <Congress2024 />
    </LanguageProvider>
  );
}