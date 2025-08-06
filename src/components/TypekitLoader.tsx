"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Typekit?: {
      load: (config?: { async?: boolean }) => void;
    };
  }
}

export function TypekitLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sprawdź czy Typekit już jest załadowany
    if (window.Typekit) {
      try {
        window.Typekit.load({ async: false }); // Synchroniczny load
        setIsLoaded(true);
        return;
      } catch (e) {
        console.error('Typekit already loaded or load error:', e);
      }
    }

    // Jeśli nie ma Typekit, dodaj skrypt synchronicznie
    const script = document.createElement('script');
    script.src = 'https://use.typekit.net/irt6ttx.js';
    script.async = false; // Synchroniczny load
    
    script.onload = () => {
      try {
        if (window.Typekit) {
          window.Typekit.load({ async: false }); // Synchroniczny load
          setIsLoaded(true);
        }
      } catch (e) {
        console.error('Typekit load error:', e);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Typekit script');
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Dodaj CSS klasy gdy font jest załadowany
  useEffect(() => {
    if (isLoaded) {
      document.documentElement.classList.add('fonts-loaded');
    }
  }, [isLoaded]);

  return null;
}