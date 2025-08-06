"use client";

import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage, Language } from "../contexts/LanguageContext";

interface HeaderProps {
  showPreviousEditions?: boolean;
}

export function Header({ showPreviousEditions = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  // Check if we're on a subpage (not home page or international home pages)
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/it';
  const isSubpage = !isHomePage;
  
  // Get current language from path
  const getCurrentLanguage = (): Language => {
    if (location.pathname.startsWith('/en')) return 'en';
    if (location.pathname.startsWith('/it')) return 'it';
    return 'pl';
  };
  
  const currentLanguage = getCurrentLanguage();

  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(isSubpage); // Start scrolled if on subpage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50); // Start transition after 50px scroll
    };

    // Only add scroll listener on home page
    if (!isSubpage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isSubpage]);

  const handleLogoClick = () => {
    if (isSubpage) {
      // If on subpage, navigate to home page in current language
      const homePath = currentLanguage === 'pl' ? '/' : `/${currentLanguage}`;
      router.push(homePath);
    } else {
      // If on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // If we're on a subpage, navigate to home page with hash in current language
    if (isSubpage) {
      const homePath = currentLanguage === 'pl' ? '/' : `/${currentLanguage}`;
      router.push(`${homePath}#${targetId}`);
      return;
    }
    
    // Otherwise, smooth scroll to section on current page
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleMobileNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  // Dynamic styles based on scroll position and page location
  const textColorClass = (isScrolled || isSubpage) ? 'text-gray-900' : 'text-white';
  const hoverColorClass = (isScrolled || isSubpage)
    ? 'hover:text-primary hover:bg-accent/50' 
    : 'hover:text-gray-200 hover:bg-white/10';

  return (
    <header 
      className="w-full sticky top-0 transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: (isScrolled || isSubpage) ? 'white' : 'transparent',
        zIndex: 50,
      }}
    >
      
      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className={`transition-colors duration-300 ${textColorClass} cursor-pointer focus:outline-none`}
          >
            <Logo />
          </button>

          {/* Navigation menu */}
          <nav className="hidden md:flex items-center space-x-2">
            {showPreviousEditions && (
              <DropdownMenu>
                <DropdownMenuTrigger 
                  className={`flex items-center gap-1 ${textColorClass} ${hoverColorClass} transition-all duration-300 cursor-pointer bg-transparent border-none px-3 py-2 h-auto font-normal outline-none focus:outline-none focus:ring-0 rounded-md`}
                >
                  {t('nav.previous-editions')}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={currentLanguage === 'pl' ? '/2024' : `/${currentLanguage}/2024`} className="w-full">
                      {t('nav.year-2024')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={currentLanguage === 'pl' ? '/2025' : `/${currentLanguage}/2025`} className="w-full">
                      {t('nav.year-2025')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div className={showPreviousEditions ? "ml-4" : ""}>
              <div className={`transition-colors duration-300 ${textColorClass}`}>
                <LanguageSelector />
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-2">
            <div className={`transition-colors duration-300 ${textColorClass}`}>
              <LanguageSelector />
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`p-2 transition-colors duration-300 ${textColorClass} hover:bg-white/10`}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">{t('nav.menu')}</SheetTitle>
                  <SheetDescription className="text-left">
                    {t('nav.mobile-description')}
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8 px-2">
                  {showPreviousEditions && (
                    <div className="py-3 px-1 border-b border-border">
                      <div className="text-lg font-medium mb-3">{t('nav.previous-editions')}</div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <button
                          onClick={() => handleMobileNavClick(currentLanguage === 'pl' ? '/2024' : `/${currentLanguage}/2024`)}
                          className="text-left text-base py-2 px-1 hover:text-primary transition-colors"
                        >
                          {t('nav.year-2024')}
                        </button>
                        <button
                          onClick={() => handleMobileNavClick(currentLanguage === 'pl' ? '/2025' : `/${currentLanguage}/2025`)}
                          className="text-left text-base py-2 px-1 hover:text-primary transition-colors"
                        >
                          {t('nav.year-2025')}
                        </button>
                      </div>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}