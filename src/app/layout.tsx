import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
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
      <body className="antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}