import { Metadata } from 'next'
import Header from "@/sections/Header"
import HeroClient from "@/components/HeroClient"
import SEOContent from "@/components/SEOContent"
import Footer from "@/sections/Footer"

export const metadata: Metadata = {
  title: 'Inside Productions | Desarrollo de Videojuegos, Realidad Virtual y Aumentada en México',
  description: 'Desarrollo de videojuegos, experiencias de realidad virtual (VR) y realidad aumentada (AR) en México. Gamificación empresarial, edutainment y capacitaciones interactivas en Querétaro.',
  keywords: [
    'desarrollo de videojuegos México',
    'realidad virtual México',
    'realidad aumentada México',
    'VR México',
    'AR México',
    'gamificación empresarial',
    'edutainment',
    'capacitación virtual',
    'videojuegos Querétaro',
    'experiencias interactivas',
    'estudio indie México',
  ],
  alternates: {
    canonical: 'https://insideproductions.mx',
  },
}

export default function InsideProductionsLanding() {
  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Inside Productions',
    url: 'https://insideproductions.mx',
    logo: 'https://insideproductions.mx/logo-inside-white.jpeg',
    description: 'Desarrollo de videojuegos, experiencias de realidad virtual y aumentada para capacitación empresarial en México',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Querétaro',
      addressRegion: 'QRO',
      addressCountry: 'MX',
    },
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    serviceType: [
      'Desarrollo de Videojuegos',
      'Realidad Virtual',
      'Realidad Aumentada',
      'Gamificación Empresarial',
      'Edutainment',
      'Capacitación Virtual',
    ],
    knowsAbout: [
      'Desarrollo de Videojuegos',
      'Realidad Virtual',
      'Realidad Aumentada',
      'Unity',
      'Unreal Engine',
      'Gamificación',
      'Edutainment',
      'VR Training',
      'AR Experiences',
    ],
    sameAs: [
      'https://www.linkedin.com/company/inside-productions',
      'https://www.instagram.com/insideproductions',
      'https://www.facebook.com/insideproductions',
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
        <Header />
        
        <HeroClient />
        
        <SEOContent />
        
        <Footer />
      </div>
    </>
  )
}