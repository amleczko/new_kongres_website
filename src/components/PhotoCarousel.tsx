"use client";

import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { getPhotosForDay, getTotalPhotosForDay } from '../contexts/LanguageContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { CarouselApi } from './ui/carousel';

interface PhotoCarouselProps {
  year: number;
  dayIndex: number;
  dayName: string;
  initialPhotos: string[];
}

export function PhotoCarousel({ year, dayIndex, dayName, initialPhotos }: PhotoCarouselProps) {
  const { t } = useLanguage();
  const totalPhotos = getTotalPhotosForDay(year, dayIndex);
  const [loadedPhotos, setLoadedPhotos] = useState<Record<number, string>>({});
  const [api, setApi] = useState<CarouselApi>();

  // Initialize with initial photos
  useEffect(() => {
    const initial: Record<number, string> = {};
    initialPhotos.forEach((photo, index) => {
      initial[index] = photo;
    });
    setLoadedPhotos(initial);
  }, [initialPhotos]);

  // Lazy load photos based on slides in view
  useEffect(() => {
    if (!api) return;

    const loadPhotosInView = () => {
      const slidesInView = api.slidesInView();
      const newLoaded = { ...loadedPhotos };
      let hasNewPhotos = false;

      slidesInView.forEach(slideIndex => {
        // Load current slide and next 2-3 slides ahead
        for (let i = slideIndex; i < slideIndex + 4 && i < totalPhotos; i++) {
          if (!newLoaded[i]) {
            const photos = getPhotosForDay(year, dayIndex, i, 1);
            if (photos.length > 0) {
              newLoaded[i] = photos[0];
              hasNewPhotos = true;
            }
          }
        }
      });

      if (hasNewPhotos) {
        setLoadedPhotos(newLoaded);
      }
    };

    api.on('slidesInView', loadPhotosInView);
    loadPhotosInView(); // Initial load
    
    return () => {
      api.off('slidesInView', loadPhotosInView);
    };
  }, [api, loadedPhotos, totalPhotos, year, dayIndex]);


  return (
    <div className="mb-8">
      <Carousel className="w-full max-w-4xl mx-auto" setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: totalPhotos }, (_, index) => {
            const photo = loadedPhotos[index];
            return (
              <CarouselItem
                key={`${dayIndex}-${index}`}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  {photo ? (
                    <ImageWithFallback
                      src={photo}
                      alt={t('congress.photo-alt', { day: dayName, index: index + 1 })}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      {/* Photo counter */}
      <div className="text-center mt-2 text-sm text-muted-foreground">
        {Object.keys(loadedPhotos).length} / {totalPhotos} {t('congress.photos')}
      </div>
    </div>
  );
}