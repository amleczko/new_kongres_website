"use client";

import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Play,
  ExternalLink,
} from "lucide-react";
import { imgproxyHelpers } from "../../lib/imgproxy";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent } from "./ui/card";
import { PhotoCarousel } from "./PhotoCarousel";
import { useLanguage } from "../contexts/LanguageContext";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  const handleExternalOpen = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className="relative cursor-pointer group rounded-lg overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={thumbnailUrl} 
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-3 group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleExternalOpen();
          }}
          className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="w-4 h-4 text-white" />
        </button>
      </div>

      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[1000] bg-black bg-opacity-95 flex items-center justify-center p-8"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ aspectRatio: '16/9' }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label={t('congress.close')}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function Congress2024() {
  const { t, getSpeakers2024, getDailyProgram2024, currentLanguage } = useLanguage();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const speakers2024 = getSpeakers2024();
  const dailyProgram = getDailyProgram2024();

  return (
    <div className="min-h-screen flex flex-col">
      <Header showPreviousEditions={true} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-white py-24 lg:py-32">
          <ImageWithFallback
            src={imgproxyHelpers.fit(1920, 1080, '2024/662.jpg')}
            alt="Kongres małżeński 2024 - sala konferencyjna"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-tajemnica/80"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Back Button */}
              <div className="mb-8">
                <Link
                  href={currentLanguage === 'pl' ? '/' : `/${currentLanguage}`}
                  className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('congress.back-to-home')}
                </Link>
              </div>

              <div className="text-6xl md:text-7xl lg:text-8xl font-light mb-4 opacity-90">
                2024
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl mb-6"
                style={{
                  fontFamily: "p22-mackinac-pro, serif",
                }}
              >
                {t('congress.2024.title')}
              </h1>
              <p
                className="text-2xl md:text-3xl mb-8 opacity-90"
                style={{
                  fontFamily: "p22-mackinac-pro, serif",
                }}
              >
                {t('congress.2024.subtitle')}
              </p>

              {/* Date and Location Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">{t('congress.date-location-2024')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{t('congress.location')}</span>
                </div>
              </div>

              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
                {t('congress.2024.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl md:text-4xl mb-12 text-center"
                style={{
                  fontFamily: "p22-mackinac-pro, serif",
                }}
              >
                {t('congress.speakers')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {speakers2024.map((speaker, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3
                        className="text-lg mb-2"
                        style={{
                          fontFamily: "p22-mackinac-pro, serif",
                        }}
                      >
                        {speaker.name}
                      </h3>
                      <p className="text-brand-blask mb-3 font-medium">
                        {speaker.title}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {speaker.bio}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conference Materials Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2
                className="text-3xl md:text-4xl mb-12 text-center"
                style={{
                  fontFamily: "p22-mackinac-pro, serif",
                }}
              >
                {t('congress.materials')}
              </h2>

              {/* Daily Program with Materials */}
              <div className="space-y-16">
                {dailyProgram.map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <h3
                      className="text-2xl mb-8 text-center text-brand-blask"
                      style={{
                        fontFamily: "p22-mackinac-pro, serif",
                      }}
                    >
                      {day.day}
                    </h3>

                    {/* Photo Gallery for this day with infinite scroll */}
                    <PhotoCarousel
                      year={day.year || 2024}
                      dayIndex={day.dayIndex || dayIndex}
                      dayName={day.day}
                      initialPhotos={day.photos}
                    />

                    <div className={`grid grid-cols-1 gap-8 ${
                      day.conferences.length === 1 
                        ? 'lg:grid-cols-1' 
                        : day.conferences.length === 2 
                        ? 'md:grid-cols-2 lg:grid-cols-2' 
                        : 'md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {day.conferences.map(
                        (conference, confIndex) => (
                          <Card
                            key={confIndex}
                            className="overflow-hidden flex flex-col"
                          >
                            <CardContent className="p-6 flex-1 flex flex-col">
                              <div className="flex-1">
                                <h4
                                  className="text-lg mb-2"
                                  style={{
                                    fontFamily:
                                      "p22-mackinac-pro, serif",
                                  }}
                                >
                                  {conference.title}
                                </h4>
                                <p className="text-brand-blask mb-4 font-medium">
                                  {conference.speaker}
                                </p>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                  {conference.summary}
                                </p>
                              </div>

                              <div className="mt-auto space-y-4">
                                {/* Embedded Spotify */}
                                <div>
                                  <iframe
                                    src={`https://open.spotify.com/embed/episode/${conference.spotify}?utm_source=generator&theme=0`}
                                    width="100%"
                                    height="152"
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="rounded-lg"
                                  ></iframe>
                                </div>

                                {/* Embedded YouTube */}
                                {conference.youtube && (
                                  <div>
                                    <YouTubePlayer 
                                      videoId={conference.youtube}
                                      title={conference.title}
                                    />
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}