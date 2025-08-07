import { useState, useEffect, useCallback, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { X } from "lucide-react";

interface Photo {
  id: string;
  number: number;
  year: number;
  thumbnailSrc: string;
  fullSrc: string;
  alt: string;
}

const PHOTO_SIZE = 250;
const PHOTOS_PER_ROW = 12; // JESZCZE BARDZIEJ ZMNIEJSZONE: 20 → 12
const MAX_PHOTOS = 24; // DRASTYCZNIE ZMNIEJSZONE: 60 → 24 (2 rzędy po 12)

// Funkcja do generowania losowej kolejności zdjęć - TYLKO 60 zdjęć
function shuffleArray(array: number[]): number[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generowanie losowej sekwencji zdjęć dla danego roku - OGRANICZONE DO 60
function generatePhotoSequence(): number[] {
  const numbers = Array.from({ length: MAX_PHOTOS }, (_, i) => i + 1);
  return shuffleArray(numbers);
}

// Tworzenie obiektu Photo z numeru i roku
function createPhoto(number: number, year: number): Photo {
  return {
    id: `${year}-${number}`,
    number,
    year,
    thumbnailSrc: `https://photo.misterogrande.pl/unsafe/rs:fill:600:600/plain/local:///${year}/${number}.jpg@jpg`,
    fullSrc: `https://photo.misterogrande.pl/unsafe/rs:fit:1920:1080/plain/local:///${year}/${number}.jpg@jpg`,
    alt: `Kongres małżeński ${year} - zdjęcie ${number}`
  };
}

export function PhotoMosaic() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [topRowPhotos, setTopRowPhotos] = useState<Photo[]>([]);
  const [bottomRowPhotos, setBottomRowPhotos] = useState<Photo[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isVisible, setIsVisible] = useState(false); // NOWE: śledzenie widoczności
  
  const containerRef = useRef<HTMLDivElement>(null); // NOWE: ref do kontenera
  
  const topRowSequenceRef = useRef<number[]>([]);
  const bottomRowSequenceRef = useRef<number[]>([]);
  const topRowIndexRef = useRef(0);
  const bottomRowIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Referencje do śledzenia pozycji w cyklu animacji
  const animationStartTimeRef = useRef<number>(Date.now());

  // Funkcja do generowania segmentu zdjęć - NAPRAWIONO: używa MAX_PHOTOS zamiast 500
  const generatePhotoSegment = (year: number, sequence: number[], startIndex: number, count: number): Photo[] => {
    const photos: Photo[] = [];
    for (let i = 0; i < count; i++) {
      const seqIndex = (startIndex + i) % MAX_PHOTOS;
      const photoNumber = sequence[seqIndex];
      photos.push(createPhoto(photoNumber, year));
    }
    return photos;
  };

  // NOWE: IntersectionObserver do lazy loading całego komponentu
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Przestań obserwować po pierwszym wyświetleniu
        }
      },
      { threshold: 0.1 } // Ładuj gdy 10% komponentu jest widoczne
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Inicjalizacja losowych sekwencji zdjęć - TYLKO gdy komponent jest widoczny
  useEffect(() => {
    if (!isVisible) return; // NOWE: nie ładuj jeśli nie jest widoczny
    
    topRowSequenceRef.current = generatePhotoSequence();
    bottomRowSequenceRef.current = generatePhotoSequence();
    
    // Generuj mniejszą pulę zdjęć dla wydajności
    const TOTAL_PHOTOS = PHOTOS_PER_ROW * 2; // ZMNIEJSZONE z 4 na 2
    
    const topPhotos = generatePhotoSegment(2024, topRowSequenceRef.current, 0, TOTAL_PHOTOS);
    const bottomPhotos = generatePhotoSegment(2025, bottomRowSequenceRef.current, 0, TOTAL_PHOTOS);
    
    setTopRowPhotos(topPhotos);
    setBottomRowPhotos(bottomPhotos);
    
    topRowIndexRef.current = TOTAL_PHOTOS;
    bottomRowIndexRef.current = TOTAL_PHOTOS;
    animationStartTimeRef.current = Date.now();
  }, [isVisible]); // ZMIENIONO: dependency na isVisible

  // Funkcja do ostrożnej rotacji zdjęć - tylko dodaje na końcu gdy potrzeba
  const rotatePhotos = useCallback(() => {
    if (isPaused) return;

    setTopRowPhotos(currentTop => {
      const currentLength = currentTop.length;
      const OPTIMAL_LENGTH = PHOTOS_PER_ROW * 4; // Optymalny rozmiar
      
      // Dodaj zdjęcia tylko jeśli lista zrobiła się za krótka
      if (currentLength < OPTIMAL_LENGTH) {
        const newTop = [...currentTop];
        const photosToAdd = OPTIMAL_LENGTH - currentLength;
        
        for (let i = 0; i < photosToAdd; i++) {
          const nextTopNumber = topRowSequenceRef.current[topRowIndexRef.current % MAX_PHOTOS];
          const newTopPhoto = createPhoto(nextTopNumber, 2024);
          newTop.push(newTopPhoto);
          topRowIndexRef.current++;
        }
        
        return newTop;
      }
      
      return currentTop; // Nie zmieniaj jeśli lista jest ok
    });

    setBottomRowPhotos(currentBottom => {
      const currentLength = currentBottom.length;
      const OPTIMAL_LENGTH = PHOTOS_PER_ROW * 4;
      
      // Dodaj zdjęcia tylko jeśli lista zrobiła się za krótka
      if (currentLength < OPTIMAL_LENGTH) {
        const newBottom = [...currentBottom];
        const photosToAdd = OPTIMAL_LENGTH - currentLength;
        
        for (let i = 0; i < photosToAdd; i++) {
          const nextBottomNumber = bottomRowSequenceRef.current[bottomRowIndexRef.current % MAX_PHOTOS];
          const newBottomPhoto = createPhoto(nextBottomNumber, 2025);
          newBottom.push(newBottomPhoto);
          bottomRowIndexRef.current++;
        }
        
        return newBottom;
      }
      
      return currentBottom; // Nie zmieniaj jeśli lista jest ok
    });
  }, [isPaused]);

  // Timer do rotacji zdjęć w tle - bardzo rzadko, tylko aby odświeżyć pulę
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(rotatePhotos, 60000); // Co minutę sprawdź i odśwież pulę
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, rotatePhotos]);

  // Preładowywanie zdjęć
  const preloadImage = useCallback((photo: Photo) => {
    if (loadedImages.has(photo.id)) return;

    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, photo.id]));
    };
    img.src = photo.thumbnailSrc;
  }, [loadedImages]);

  // Preładowywanie widocznych i pobliskich zdjęć
  useEffect(() => {
    const allPhotos = [...topRowPhotos, ...bottomRowPhotos];
    allPhotos.forEach(photo => {
      preloadImage(photo);
    });
  }, [topRowPhotos, bottomRowPhotos, preloadImage]);

  useEffect(() => {
    // Pause animation when photo is selected
    if (selectedPhoto) {
      setIsPaused(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsPaused(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseDialog = () => {
    setSelectedPhoto(null);
  };

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhoto) {
        handleCloseDialog();
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  const ZoomIcon = () => (
    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
      />
    </svg>
  );

  const renderPhotoRow = (photos: Photo[], isTopRow: boolean) => {
    const animationClass = isPaused 
      ? (isTopRow ? 'paused-scroll' : 'paused-scroll-reverse')
      : (isTopRow ? 'animate-scroll' : 'animate-scroll-reverse');

    const rowWidth = photos.length * PHOTO_SIZE;

    return (
      <div className="relative h-1/2 overflow-hidden">
        <div 
          className={`flex absolute top-0 left-0 h-full items-center ${animationClass}`}
          style={{
            width: `${rowWidth}px`
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={`${isTopRow ? 'top' : 'bottom'}-${photo.id}-${index}`}
              className="cursor-pointer group relative flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:z-10"
              style={{
                width: `${PHOTO_SIZE}px`,
                height: `${PHOTO_SIZE}px`
              }}
              onClick={() => handlePhotoClick(photo)}
              role="button"
              tabIndex={0}
              aria-label={`Powiększ zdjęcie: ${photo.alt}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePhotoClick(photo);
                }
              }}
            >
              {loadedImages.has(photo.id) ? (
                <ImageWithFallback
                  src={photo.thumbnailSrc}
                  alt={photo.alt}
                  className="w-full h-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse shadow-lg flex items-center justify-center">
                  <div className="text-gray-400 text-sm">
                    {photo.year}
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <ZoomIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Photo Mosaic - Two Rows 500px Total Height */}
      <div ref={containerRef} className="w-full overflow-hidden">
        <div className="relative h-[500px] overflow-hidden flex flex-col">
          
          {/* Render photos only when visible */}
          {isVisible ? (
            <>
              {/* Top Row - Moving Right (2024) */}
              {renderPhotoRow(topRowPhotos, true)}
              
              {/* Bottom Row - Moving Left (2025) */}
              {renderPhotoRow(bottomRowPhotos, false)}
            </>
          ) : (
            /* Placeholder while not visible */
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400">Loading photos...</div>
            </div>
          )}
          
        </div>
      </div>

      {/* Custom Fullscreen Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={handleCloseDialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
        >
          {/* Screen reader content */}
          <div className="sr-only">
            <div id="lightbox-title">{selectedPhoto.alt}</div>
            <div id="lightbox-description">
              Powiększone zdjęcie z poprzednich edycji III Międzynarodowego Kongresu &quot;Odkryj małżeństwo&quot;. 
              Naciśnij Escape lub kliknij aby zamknąć.
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleCloseDialog}
            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white transition-colors duration-200 z-10"
            aria-label="Zamknij zdjęcie"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Image container - prevent click from bubbling */}
          <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={selectedPhoto.fullSrc}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}