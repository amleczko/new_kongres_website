"use client";

import { TypekitLoader } from "@/components/TypekitLoader";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TypekitLoader />
      {children}
    </>
  );
}