'use client';

import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function Header() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation menu */}
          <nav className="hidden md:flex items-center space-x-2">
            <a 
              href="#o-kongresie" 
              onClick={(e) => handleSmoothScroll(e, 'o-kongresie')}
              className="text-foreground hover:text-primary hover:bg-accent/50 transition-colors cursor-pointer px-3 py-2 rounded-md"
            >
              O kongresie
            </a>
            <a 
              href="#zapisy" 
              onClick={(e) => handleSmoothScroll(e, 'zapisy')}
              className="text-foreground hover:text-primary hover:bg-accent/50 transition-colors cursor-pointer px-3 py-2 rounded-md"
            >
              Zapisy
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary hover:bg-accent/50 transition-colors cursor-pointer bg-transparent border-none px-3 py-2 h-auto font-normal outline-none focus:outline-none focus:ring-0 rounded-md">
                Poprzednie edycje
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem 
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  rok 2024
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  rok 2025
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}