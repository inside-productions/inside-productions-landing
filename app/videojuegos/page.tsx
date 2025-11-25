import { Metadata } from 'next'
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/button"

export const metadata: Metadata = {
  title: 'Desarrollo de Videojuegos México | Estudio Indie Querétaro | Inside Productions',
  description: 'Desarrollo de videojuegos indie en México. Creamos juegos para PC, consolas, VR/AR y móviles. Estudio de videojuegos en Querétaro con experiencia en Unity y Unreal Engine.',
  keywords: [
    'desarrollo de videojuegos México',
    'videojuegos indie México',
    'estudio de videojuegos Querétaro',
    'desarrollo juegos Unity',
    'desarrollo juegos Unreal',
    'videojuegos VR',
    'juegos educativos México',
    'game development México',
  ],
  alternates: {
    canonical: 'https://insideproductions.mx/videojuegos',
  },
}

export default function VideojuegosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Desarrollo de Videojuegos',
    provider: {
      '@type': 'Organization',
      name: 'Inside Productions',
    },
    description: 'Estudio indie de desarrollo de videojuegos para PC, consolas, VR/AR y móviles en México',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    url: 'https://insideproductions.mx/videojuegos',
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
                Desarrollo de Videojuegos en México
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Creamos experiencias interactivas únicas. Desde juegos indie hasta proyectos AAA custom.
              </p>
            </div>

            <div className="mb-16 rounded-2xl overflow-hidden">
              <Image
                src="/videojuegos-gamificacion.jpeg"
                alt="Desarrollo de Videojuegos en México - Estudio Indie"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-black font-heading">
                Estudio Indie Mexicano
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Somos un <strong>estudio indie de videojuegos en Querétaro, México</strong>, apasionados por crear 
                experiencias interactivas que cuentan historias, desafían la mente y entretienen. Nuestro portafolio 
                incluye juegos de VR/AR, títulos narrativos, puzzles innovadores y experiencias educativas gamificadas.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Nuestros Juegos
              </h2>
              
              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Trouble Train (VR)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Juego de cooperación en realidad virtual donde los jugadores deben trabajar en equipo para resolver 
                puzzles mecánicos mientras el tren avanza. Perfecto para team building y entretenimiento inmersivo.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Restore It Yourself Studio (VR)
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Simulador de restauración en VR donde restauras y personalizas objetos antiguos. Experiencia relajante 
                y satisfactoria que combina creatividad con mecánicas precisas.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                Panoptic
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Juego multijugador asimétrico donde un jugador en VR es un vigilante omnisciente y otro en PC debe 
                esconderse entre la multitud. Mecánicas únicas que mezclan VR y pantalla tradicional.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Servicios de Desarrollo
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Además de nuestros proyectos propios, desarrollamos <strong>videojuegos personalizados</strong> para 
                empresas que buscan soluciones interactivas únicas:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Advergames:</strong> Juegos promocionales para marcas</li>
                <li><strong>Serious Games:</strong> Juegos con propósitos educativos o de entrenamiento</li>
                <li><strong>Juegos Corporativos:</strong> Experiencias para eventos y team building</li>
                <li><strong>Juegos Educativos:</strong> Contenido interactivo para instituciones</li>
                <li><strong>Prototipos y MVPs:</strong> Validación de conceptos de juego</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Tecnologías y Plataformas
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Engines:</strong> Unity, Unreal Engine 5, Godot
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Plataformas:</strong> PC (Steam), Consolas (PlayStation, Xbox, Nintendo Switch), VR/AR 
                (Meta Quest, PSVR2, HTC Vive), Móvil (iOS, Android), Web (WebGL)
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Especialidades:</strong> VR/AR, Multijugador, IA avanzada, Procedural generation, 
                Arte estilizado, Narrativa interactiva
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Proceso de Desarrollo
              </h2>
              <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Concepto:</strong> Definimos la visión, mecánicas core y público objetivo</li>
                <li><strong>Pre-producción:</strong> GDD, arte conceptual, prototipos jugables</li>
                <li><strong>Producción:</strong> Desarrollo iterativo con builds semanales</li>
                <li><strong>Alpha/Beta:</strong> Testing interno y con usuarios</li>
                <li><strong>Pulido:</strong> Optimización, balance y bug fixing</li>
                <li><strong>Lanzamiento:</strong> Deploy, marketing y soporte post-launch</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                ¿Por Qué Desarrollo Indie Mexicano?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                México tiene un talento excepcional en desarrollo de videojuegos a costos competitivos. 
                Nuestro equipo combina formación técnica de primer nivel (TEC de Monterrey, Universidad de los Andes) 
                con pasión por crear experiencias memorables. Comunicación fluida en español, zona horaria compatible 
                y resultados de calidad internacional.
              </p>

              <div className="bg-[#FCDD2F]/10 p-8 rounded-2xl mt-12">
                <h2 className="text-3xl font-bold mb-4 text-black font-heading text-center">
                  ¿Tienes una Idea de Juego?
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                  Convirtámosla en realidad. Desde el concepto hasta el lanzamiento, te acompañamos en todo el proceso.
                </p>
                <div className="text-center">
                  <Link href="/contacto">
                    <Button className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full">
                      Desarrollar mi Juego
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

