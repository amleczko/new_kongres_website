"use client";

import { Congress2025 } from "../../components/Congress2025";
import { LanguageProvider } from "../../contexts/LanguageContext";

export default function Congress2025Page() {
  return (
    <LanguageProvider language="pl">
      <Congress2025 />
    </LanguageProvider>
  );
}