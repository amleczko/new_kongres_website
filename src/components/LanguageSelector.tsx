'use client';

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PolandFlag } from "./flags/PolandFlag";
import { ItalyFlag } from "./flags/ItalyFlag";
import { UKFlag } from "./flags/UKFlag";

const languages = [
  { code: "pl", name: "Polski", flag: PolandFlag },
  { code: "it", name: "Italiano", flag: ItalyFlag },
  { code: "en", name: "English", flag: UKFlag },
];

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("pl");
  
  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);
  const FlagComponent = currentLanguage?.flag || PolandFlag;

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
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