import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "III Międzynarodowy Kongres \"Odkryj małżeństwo\"",
  description: "1-3 maja 2026, Gniezno. Razem odkrywamy piękno sakramentu małżeństwa: konferencje, świadectwa, modlitwa — a między nimi przerwy na rozmowę przy dobrej kawie.",
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