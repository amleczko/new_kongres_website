"use client";

import { Congress2024 } from "../../components/Congress2024";
import { LanguageProvider } from "../../contexts/LanguageContext";

export default function Congress2024Page() {
  return (
    <LanguageProvider language="pl">
      <Congress2024 />
    </LanguageProvider>
  );
}