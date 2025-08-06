import { useState, useEffect } from 'react';

interface BackgroundContainerProps {
  children: React.ReactNode;
}

export function BackgroundContainer({ children }: BackgroundContainerProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Don't load video on mobile devices for performance
    if (window.innerWidth <= 768) {
      return;
    }

    // Start loading video after a delay to show photo first
    const initialDelay = setTimeout(() => {
      setIsVideoLoaded(true);
      
      // Show video after 5 seconds total (keep photo visible for ~5s)
      const showDelay = setTimeout(() => {
        setShowVideo(true);
      }, 2000); // 3s initial + 2s loading = 5s total

      return () => clearTimeout(showDelay);
    }, 3000); // Increased delay to show photo longer

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!isVideoLoaded || !showVideo) return;

    // Create and configure the iframe for Vimeo video
    const iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/1107472316?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&h=d920a1c998';
    iframe.className = 'video-background';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.border = 'none';

    const container = document.querySelector('.video-container');
    if (container) {
      container.appendChild(iframe);
    }

    return () => {
      if (container && iframe.parentNode === container) {
        container.removeChild(iframe);
      }
    };
  }, [isVideoLoaded, showVideo]);

  return (
    <div className="relative">
      {/* Background Image Placeholder - full screen background */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url('https://photo.misterogrande.pl/unsafe/rs:fit:1920:1080/plain/local:///2025/275.jpg@jpg')`,
          zIndex: 1,
        }}
      />

      {/* Background Video - full screen background */}
      {isVideoLoaded && (
        <div
          className={`video-container fixed top-0 left-0 w-full h-screen video-fade-in ${
            showVideo ? 'loaded' : ''
          }`}
          style={{ zIndex: 1 }}
        />
      )}

      {/* Dark overlay - over both image and video */}
      <div className="fixed top-0 left-0 w-full h-screen bg-black/60" style={{ zIndex: 2 }} />

      {/* Content - header and hero */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}