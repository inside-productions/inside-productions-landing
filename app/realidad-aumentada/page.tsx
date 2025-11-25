import { Metadata } from 'next'
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/button"

export const metadata: Metadata = {
  title: 'Realidad Aumentada (AR) México | Marketing Interactivo AR | Inside Productions',
  description: 'Desarrollo de realidad aumentada (AR) en México. Experiencias AR para marketing, educación, catálogos interactivos y aplicaciones móviles. Innovación visual que impacta.',
  keywords: [
    'realidad aumentada México',
    'AR México',
    'marketing AR',
    'aplicaciones AR',
    'realidad aumentada empresarial',
    'AR marketing México',
    'catálogos AR',
    'experiencias AR',
  ],
  alternates: {
    canonical: 'https://insideproductions.mx/realidad-aumentada',
  },
}

export default function RealidadAumentadaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Desarrollo de Realidad Aumentada',
    provider: {
      '@type': 'Organization',
      name: 'Inside Productions',
    },
    description: 'Soluciones de realidad aumentada para marketing, educación y retail en México',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    url: 'https://insideproductions.mx/realidad-aumentada',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
        <Header />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black font-heading">
                Realidad Aumentada (AR) - Innovación Visual
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Integra el mundo digital con el físico. Crea experiencias que sorprenden, educan y generan engagement.
              </p>
            </div>

            <div className="mb-16 rounded-2xl overflow-hidden">
              <Image
                src="/realidad-aumentada.jpeg"
                alt="Realidad Aumentada para Marketing y Educación en México"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-black font-heading">
                ¿Qué es la Realidad Aumentada?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La <strong>realidad aumentada (AR)</strong> superpone elementos digitales (imágenes, modelos 3D, 
                videos, información) sobre el mundo real a través de dispositivos móviles o gafas AR. Es la 
                tecnología perfecta para crear experiencias interactivas accesibles que no requieren hardware especial.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Aplicaciones de AR para tu Negocio
              </h2>
              
              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Marketing y Publicidad Interactiva
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Crea campañas publicitarias memorables con <strong>filtros AR para redes sociales</strong>, 
                anuncios interactivos y experiencias de marca que generan viralidad orgánica.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Catálogos y Visualización de Productos
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Permite a tus clientes ver productos en 3D en su espacio real antes de comprar. Muebles, equipos, 
                vehículos, maquinaria - cualquier producto cobra vida con AR.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Experiencias Educativas y Culturales
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Transforma museos, exposiciones y espacios culturales con guías AR interactivas, reconstrucciones 
                históricas y experiencias educativas inmersivas.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Manuales y Guías Técnicas
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Reemplaza manuales impresos con instrucciones AR paso a paso superpuestas sobre el equipo real. 
                Perfecto para mantenimiento y ensamblaje.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Ventajas de la Realidad Aumentada
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Accesible:</strong> Funciona en smartphones, tablets sin hardware adicional</li>
                <li><strong>Viral:</strong> Experiencias compartibles que generan engagement</li>
                <li><strong>Conversión:</strong> Aumenta ventas al permitir "probar antes de comprar"</li>
                <li><strong>Diferenciación:</strong> Destaca frente a la competencia</li>
                <li><strong>Medible:</strong> Trackea interacciones y conversiones</li>
                <li><strong>Memorable:</strong> 70% más de recordación que publicidad tradicional</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Casos de Éxito con AR
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Retail:</strong> IKEA aumentó conversiones 35% con visualización AR de muebles.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Automotriz:</strong> Configuradores AR de vehículos generan 5x más engagement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Educación:</strong> Instituciones reportan 60% más de retención con contenido AR.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Tecnologías AR que Manejamos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Desarrollamos experiencias AR con <strong>ARKit (iOS)</strong>, <strong>ARCore (Android)</strong>, 
                <strong> WebAR</strong> (sin apps), <strong>Spark AR</strong> (Instagram/Facebook), 
                <strong> Lens Studio</strong> (Snapchat) y <strong>8th Wall</strong>. Creamos desde filtros sociales 
                hasta aplicaciones AR enterprise complejas.
              </p>

              <div className="bg-[#FCDD2F]/10 p-8 rounded-2xl mt-12">
                <h2 className="text-3xl font-bold mb-4 text-black font-heading text-center">
                  Destaca con Realidad Aumentada
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                  Crea experiencias AR que tus clientes recordarán. Agenda una consultoría gratuita.
                </p>
                <div className="text-center">
                  <Link href="/contacto">
                    <Button className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full">
                      Iniciar Proyecto AR
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

