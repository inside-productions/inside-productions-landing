import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Be_Vietnam_Pro, Outfit } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
})

// Usando Outfit como alternativa a Funnel Sans
const bodyFont = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Inside Productions | Edutainment, Gamificación, Realidad Virtual y Aumentada en México',
  description: 'Creamos videojuegos, y experiencias de realidad Virtual y Aumentada para capacitar, innovar y generar más interacción.',
  keywords: [
    'Edutainment',
    'Gamificación',
    'Realidad Virtual',
    'Realidad Aumentada',
    'México',
    'Desarrollo de Videojuegos',
    'Capacitaciones',
    'Indie',
    'Juegos',
    'Experiencia Interactiva',
    'Querétaro'
  ],
  metadataBase: new URL('https://insideproductions.mx'),
  openGraph: {
    title: 'Inside Productions',
    description: 'Creamos videojuegos, y experiencias de realidad Virtual y Aumentada para capacitar, innovar y generar más interacción.',
    url: 'https://insideproductions.mx',
    siteName: 'Inside Productions',
    images: [
      {
        url: 'https://insideproductions.mx/logo-inside-white.jpeg',
        width: 1200,
        height: 630,
        alt: 'Inside Productions - Desarrollo de videojuegos, Realidad Virtual y Aumentada',
      }
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inside Productions',
    description: 'Creamos videojuegos, y experiencias de realidad Virtual y Aumentada para capacitar, innovar y generar más interacción.',
    images: ['https://insideproductions.mx/logo-inside-white.jpeg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${beVietnamPro.variable} ${bodyFont.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${bodyFont.style.fontFamily};
  --font-sans: ${bodyFont.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
