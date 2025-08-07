import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "„Odkryj małżeństwo\" - III Międzynarodowy Kongres Projektu Misterogrande, 1-3 maja 2026, Gniezno",
  description: "Majówka z Misterogrande to świetny sposób na długi weekend majowy dla całej rodziny. Coś dla ducha i coś dla ciała.",
  keywords: "Misterogrande, małżeństwo, sakrament, kongres, Gniezno, 2026",
  authors: [{ name: "Fundacja Misterogrande" }],
  icons: {
    icon: "/img/favicon.ico",
    apple: "/img/favicon.ico",
  },
  openGraph: {
    title: "„Odkryj małżeństwo\" - III Międzynarodowy Kongres Projektu Misterogrande, 1-3 maja 2026, Gniezno",
    siteName: "„Odkryj małżeństwo\" - III Międzynarodowy Kongres Projektu Misterogrande, 1-3 maja 2026, Gniezno",
    url: "https://kongres.misterogrande.pl",
    description: "Majówka z Misterogrande to świetny sposób na długi weekend majowy dla całej rodziny. Coś dla ducha i coś dla ciała.",
    type: "website",
    images: [
      {
        url: "https://kongres.misterogrande.pl/img/social.png",
        width: 1200,
        height: 630,
        alt: "„Odkryj małżeństwo\" - III Międzynarodowy Kongres Projektu Misterogrande, 1-3 maja 2026, Gniezno",
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        <link rel="preload" href="https://use.typekit.net/irt6ttx.js" as="script" />
        <link rel="preload" href="https://use.typekit.net/irt6ttx.css" as="style" />
        <link rel="stylesheet" href="https://use.typekit.net/irt6ttx.css" />
      </head>
      <body className="antialiased">
        {/* Typekit loading AFTER hydration to avoid SSR conflicts */}
        <Script
          src="https://use.typekit.net/irt6ttx.js"
          strategy="afterInteractive"
        />
        <Script
          id="typekit-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (typeof Typekit !== 'undefined') {
                  try {
                    Typekit.load({
                      async: false,
                      active: function() {
                        document.documentElement.classList.add('fonts-loaded');
                      },
                      inactive: function() {
                        document.documentElement.classList.add('fonts-failed');
                      }
                    });
                  } catch(e) {
                    document.documentElement.classList.add('fonts-failed');
                  }
                }
              });
            `,
          }}
        />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}