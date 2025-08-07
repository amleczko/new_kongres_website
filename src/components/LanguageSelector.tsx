"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PolandFlag } from "./flags/PolandFlag";
import { ItalyFlag } from "./flags/ItalyFlag";
import { UKFlag } from "./flags/UKFlag";
import { useLanguage } from "../contexts/LanguageContext";

const languages = [
  { code: "pl", name: "Polski", flag: PolandFlag },
  { code: "it", name: "Italiano", flag: ItalyFlag },
  { code: "en", name: "English", flag: UKFlag },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage);
  const FlagComponent = currentLang?.flag || PolandFlag;

  const handleLanguageChange = (newLanguage: string) => {
    // Get the current route without language prefix
    let currentPath = pathname;
    
    // Remove language prefixes to get the base path
    if (currentPath.startsWith('/en')) {
      currentPath = currentPath.substring(3) || '/';
    } else if (currentPath.startsWith('/it')) {
      currentPath = currentPath.substring(3) || '/';
    }
    
    // Build new path with new language
    let newPath: string;
    if (newLanguage === 'pl') {
      newPath = currentPath === '/' ? '/' : currentPath;
    } else {
      newPath = currentPath === '/' ? `/${newLanguage}` : `/${newLanguage}${currentPath}`;
    }
    
    // Navigate to the new path, preserving hash if present
    router.push(newPath);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-16 h-10 border-none bg-transparent p-2 hover:bg-accent/50 transition-colors">
        <SelectValue>
          <FlagComponent className="w-6 h-4" />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => {
          const Flag = language.flag;
          return (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-3" />
                <span>{language.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}