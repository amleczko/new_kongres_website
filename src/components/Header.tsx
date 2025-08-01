"use client";

import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";

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
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#start" 
              onClick={(e) => handleSmoothScroll(e, 'start')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Start
            </a>
            <a 
              href="#o-kongresie" 
              onClick={(e) => handleSmoothScroll(e, 'o-kongresie')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              O kongresie
            </a>
            <a 
              href="#rejestracja" 
              onClick={(e) => handleSmoothScroll(e, 'rejestracja')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Rejestracja
            </a>
            <a 
              href="#kontakt" 
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Kontakt
            </a>
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