import { Metadata } from 'next'
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/button"

export const metadata: Metadata = {
  title: 'Realidad Virtual (VR) México | Capacitación Empresarial VR | Inside Productions',
  description: 'Soluciones de realidad virtual (VR) en México para capacitación empresarial, entrenamiento industrial y experiencias inmersivas. Reduce costos y acelera el aprendizaje con VR.',
  keywords: [
    'realidad virtual México',
    'VR México',
    'capacitación VR',
    'entrenamiento virtual',
    'realidad virtual empresarial',
    'VR training México',
    'simulación VR',
    'Querétaro VR',
  ],
  alternates: {
    canonical: 'https://insideproductions.mx/realidad-virtual',
  },
}

export default function RealidadVirtualPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Desarrollo de Realidad Virtual para Empresas',
    provider: {
      '@type': 'Organization',
      name: 'Inside Productions',
    },
    description: 'Soluciones de realidad virtual para capacitación empresarial y entrenamiento industrial en México',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    url: 'https://insideproductions.mx/realidad-virtual',
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
            {/* Hero Section */}
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black font-heading">
                Realidad Virtual (VR) para Empresas en México
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Transforma la capacitación de tu equipo con experiencias inmersivas que reducen costos, 
                aceleran el aprendizaje y eliminan riesgos.
              </p>
            </div>

            {/* Image */}
            <div className="mb-16 rounded-2xl overflow-hidden">
              <Image
                src="/realidad-virtual.jpeg"
                alt="Realidad Virtual para Capacitación Empresarial en México"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-black font-heading">
                ¿Qué es la Realidad Virtual Empresarial?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La <strong>realidad virtual (VR)</strong> permite simular entornos y situaciones reales en un espacio 
                completamente seguro y controlado. Con un headset VR, tus empleados pueden practicar procedimientos 
                complejos, tomar decisiones críticas y desarrollar habilidades sin los costos y riesgos del entrenamiento 
                tradicional.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Aplicaciones de VR en tu Empresa
              </h2>
              
              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                1. Capacitación en Seguridad Industrial
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Simula escenarios peligrosos sin poner en riesgo a tus empleados. Evacuaciones, procedimientos de 
                emergencia, trabajo en alturas, manejo de maquinaria pesada y más.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                2. Entrenamiento Técnico
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Practica reparaciones, mantenimiento y operación de equipos costosos en un ambiente virtual donde los 
                errores no tienen consecuencias reales.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                3. Presentaciones Inmersivas
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Muestra tus productos o instalaciones a clientes y stakeholders de manera inolvidable, sin limitaciones 
                físicas o geográficas.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Beneficios de la Realidad Virtual
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Reducción de costos:</strong> Hasta 70% menos que métodos tradicionales</li>
                <li><strong>Aprendizaje acelerado:</strong> 400% más rápido según estudios</li>
                <li><strong>Mayor retención:</strong> 75% de retención vs 10% en capacitación tradicional</li>
                <li><strong>Cero riesgos:</strong> Practica escenarios peligrosos sin consecuencias</li>
                <li><strong>Escalabilidad:</strong> Entrena a múltiples personas simultáneamente</li>
                <li><strong>Medición precisa:</strong> Analytics detallados de desempeño</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Nuestro Proceso de Desarrollo VR
              </h2>
              <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li>Análisis de necesidades de capacitación</li>
                <li>Diseño de escenarios y mecánicas de aprendizaje</li>
                <li>Desarrollo 3D y programación en Unity/Unreal</li>
                <li>Testing con usuarios reales</li>
                <li>Implementación y capacitación de facilitadores</li>
                <li>Soporte y actualizaciones continuas</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Tecnología VR que Utilizamos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Desarrollamos para las plataformas VR más populares: <strong>Meta Quest 2/3</strong>, 
                <strong> HTC Vive</strong>, <strong>Valve Index</strong>, <strong>PlayStation VR2</strong>, 
                y <strong>PICO</strong>. Utilizamos <strong>Unity</strong> y <strong>Unreal Engine 5</strong> para 
                crear experiencias fotorrealistas y optimizadas.
              </p>

              <div className="bg-[#FCDD2F]/10 p-8 rounded-2xl mt-12">
                <h2 className="text-3xl font-bold mb-4 text-black font-heading text-center">
                  ¿Listo para Revolucionar tu Capacitación?
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                  Agenda una demo gratuita y descubre cómo la realidad virtual puede transformar tu empresa.
                </p>
                <div className="text-center">
                  <Link href="/contacto">
                    <Button className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full">
                      Contactar Ahora
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

