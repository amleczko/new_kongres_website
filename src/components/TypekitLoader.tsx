"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    Typekit?: {
      load: (config?: { async?: boolean }) => void;
    };
  }
}

export function TypekitLoader() {
  useEffect(() => {
    // Dodaj skrypt Typekit
    const script1 = document.createElement('script');
    script1.src = 'https://use.typekit.net/irt6ttx.js';
    script1.async = true;
    
    script1.onload = () => {
      // Po załadowaniu skryptu, uruchom Typekit
      try {
        if (window.Typekit) {
          window.Typekit.load({ async: true });
        }
      } catch (e) {
        console.error('Typekit load error:', e);
      }
    };
    
    document.head.appendChild(script1);
    
    // Cleanup
    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
    };
  }, []);

  return null; // Ten komponent nie renderuje niczego
}