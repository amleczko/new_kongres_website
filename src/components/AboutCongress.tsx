"use client";

import { PhotoMosaic } from "./PhotoMosaic";
import Link from "next/link";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { imgproxyHelpers } from "../../lib/imgproxy";

export function AboutCongress() {
  const { t, currentLanguage } = useLanguage();
  return (
    <section className="w-full py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              style={{
                fontFamily: "p22-mackinac-pro, serif",
              }}
            >
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Photo Mosaic - Full Width */}
      <div className="mb-16">
        <PhotoMosaic />
      </div>

      {/* Previous Editions - show for all languages */}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3
              className="mb-4 text-2xl md:text-3xl"
              style={{
                fontFamily: "p22-mackinac-pro, serif",
              }}
            >
              {t('nav.previous-editions')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.previous-subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Edition 2024 */}
            <div className="group">
              <div className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={imgproxyHelpers.fit(800, 450, '2024/629.jpg')}
                    alt="Kongres małżeński 2024 - sala konferencyjna"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-tajemnica/80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: 'p22-mackinac-pro, serif' }}>
                        2024
                      </div>
                      <div className="text-lg opacity-90">
                        {t('about.2024-edition')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4
                    className="text-xl mb-3"
                    style={{
                      fontFamily: "p22-mackinac-pro, serif",
                    }}
                  >
                    {t('about.2024-title')}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t('about.2024-description')}
                  </p>
                  <Link
                    href={currentLanguage === 'pl' ? '/2024' : `/${currentLanguage}/2024`}
                    className="inline-flex items-center text-brand-yellow hover:text-brand-yellow transition-colors duration-200 group-hover:translate-x-1 transition-transform"
                  >
                    {t('about.learn-more')}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Edition 2025 */}
            <div className="group">
              <div className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={imgproxyHelpers.fit(800, 450, '2025/268.jpg')}
                    alt="Kongres małżeński 2025 - uczestnicy w rozmowie"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-brand-navy-dark/80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: 'p22-mackinac-pro, serif' }}>
                        2025
                      </div>
                      <div className="text-lg opacity-90">
                        {t('about.2025-edition')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4
                    className="text-xl mb-3"
                    style={{
                      fontFamily: "p22-mackinac-pro, serif",
                    }}
                  >
                    {t('about.2025-title')}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {t('about.2025-description')}
                  </p>
                  <Link
                    href={currentLanguage === 'pl' ? '/2025' : `/${currentLanguage}/2025`}
                    className="inline-flex items-center text-brand-yellow hover:text-brand-yellow transition-colors duration-200 group-hover:translate-x-1 transition-transform"
                  >
                    {t('about.learn-more')}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
