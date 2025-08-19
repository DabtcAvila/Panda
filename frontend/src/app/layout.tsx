import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Panda Technologies - Soluciones Corporativas de IA',
  description: 'Transformamos empresas con soluciones de Inteligencia Artificial de vanguardia',
  keywords: 'IA, Inteligencia Artificial, Machine Learning, Deep Learning, Consultoría, Tecnología',
  authors: [{ name: 'Panda Technologies' }],
  openGraph: {
    title: 'Panda Technologies',
    description: 'Soluciones Corporativas de Inteligencia Artificial',
    url: 'https://panda-technologies.com',
    siteName: 'Panda Technologies',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panda Technologies',
    description: 'Soluciones Corporativas de Inteligencia Artificial',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}