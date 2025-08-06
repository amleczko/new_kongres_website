"use client";

import { Congress2025 } from "@/components/Congress2025";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function English2025Page() {
  return (
    <LanguageProvider language="en">
      <Congress2025 />
    </LanguageProvider>
  );
}