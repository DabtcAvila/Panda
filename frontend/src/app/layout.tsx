import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Panda Technologies - Soluciones Corporativas de IA',
  description: 'Transformamos empresas con soluciones de Inteligencia Artificial de vanguardia',
  keywords: 'IA, Inteligencia Artificial, Machine Learning, Deep Learning, Consultoría, Tecnología',
  authors: [{ name: 'Panda Technologies' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#000000' },
    ],
  },
  manifest: '/manifest.json',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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