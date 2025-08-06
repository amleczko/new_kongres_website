"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { Play, X } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    // Don't load video on mobile devices for performance
    if (window.innerWidth <= 768) {
      return;
    }

    // Start loading video after a delay to show photo first
    const initialDelay = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 3000); // Show photo for 3 seconds

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded) return;

    // Create and configure the iframe for Vimeo video
    const iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/1107472316?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&h=d920a1c998';
    iframe.style.position = 'absolute';
    iframe.style.top = '50%';
    iframe.style.left = '50%';
    iframe.style.width = '100vw';
    iframe.style.height = '56.25vw'; // 16:9 aspect ratio
    iframe.style.minHeight = '100vh';
    iframe.style.minWidth = '177.78vh'; // 16:9 aspect ratio
    iframe.style.transform = 'translate(-50%, -50%)';
    iframe.style.border = 'none';
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 2s ease-in-out';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');

    // Wait for video to be ready before showing
    iframe.onload = () => {
      setTimeout(() => {
        setIsVideoReady(true);
        iframe.style.opacity = '1';
        // Delay showing video overlay to ensure smooth transition
        setTimeout(() => {
          setShowVideo(true);
        }, 500);
      }, 1000); // Give video time to start playing
    };

    const container = document.querySelector('.hero-video-container');
    if (container) {
      container.appendChild(iframe);
    }

    return () => {
      if (container && iframe.parentNode === container) {
        container.removeChild(iframe);
      }
    };
  }, [isVideoLoaded]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        setIsVideoModalOpen(false);
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  return (
    <>
      {/* Hero section - EXACT 100VH HEIGHT */}
      <section className="relative h-screen flex items-center justify-center" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        
        {/* Background Image - FILLS ENTIRE SECTION */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: `url('https://photo.misterogrande.pl/unsafe/rs:fit:1920:1080/plain/local:///2025/275.jpg@jpg')`,
            zIndex: 1,
          }}
        />

        {/* Background Video - FILLS ENTIRE SECTION */}
        {isVideoLoaded && (
          <div
            className="hero-video-container absolute inset-0"
            style={{ 
              zIndex: showVideo ? 1 : 0,
              opacity: showVideo ? 1 : 0,
              transition: 'opacity 2s ease-in-out'
            }}
          />
        )}

        {/* Dark overlay - COVERS ENTIRE SECTION */}
        <div className="absolute inset-0 bg-black/70" style={{ zIndex: 2 }} />

        {/* Content - CENTERED IN SECTION */}
        <div className="relative text-center text-white px-4" style={{ zIndex: 5 }}>
          <div className="max-w-4xl space-y-8">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight" style={{ fontFamily: 'p22-mackinac-pro, serif' }}>
              {t('hero.title-line1')}<br />{t('hero.title-line2')}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')} —<br />{t('hero.description-break')}
            </p>

            {/* Watch Video Button */}
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="bg-white text-gray-800 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              {t('hero.watch-video')}
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
            aria-label="Zamknij film"
          >
            <X className="w-6 h-6" />
          </button>
          
          <iframe
            src="https://www.youtube.com/embed/9LB5o7N3OMc?autoplay=1&rel=0&modestbranding=1"
            className="w-[90vw] h-[50.625vw] max-w-[1400px] max-h-[calc(100vh-100px)]"
            style={{ aspectRatio: '16/9' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${t('hero.watch-video')} - ${t('hero.title-line1')} ${t('hero.title-line2')}`}
          />
        </div>
      )}
    </>
  );
}