import { Metadata } from 'next'
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/button"

export const metadata: Metadata = {
  title: 'Gamificación Empresarial México | Aumenta Productividad | Inside Productions',
  description: 'Gamificación empresarial en México. Aumenta productividad, engagement y motivación con sistemas de gamificación para capacitación, ventas y cultura organizacional.',
  keywords: [
    'gamificación empresarial México',
    'gamificación capacitación',
    'gamification México',
    'sistemas gamificados',
    'gamificación ventas',
    'engagement empresarial',
    'motivación laboral',
    'gamificación Querétaro',
  ],
  alternates: {
    canonical: 'https://insideproductions.mx/gamificacion',
  },
}

export default function GamificacionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gamificación Empresarial',
    provider: {
      '@type': 'Organization',
      name: 'Inside Productions',
    },
    description: 'Soluciones de gamificación empresarial para aumentar productividad y engagement en México',
    areaServed: {
      '@type': 'Country',
      name: 'México',
    },
    url: 'https://insideproductions.mx/gamificacion',
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
                Gamificación Empresarial en México
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Transforma procesos aburridos en experiencias motivadoras. Aumenta productividad hasta 50%.
              </p>
            </div>

            <div className="mb-16 rounded-2xl overflow-hidden">
              <Image
                src="/videojuegos-gamificacion.jpeg"
                alt="Gamificación Empresarial para Capacitación y Ventas"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-black font-heading">
                ¿Qué es la Gamificación Empresarial?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La <strong>gamificación empresarial</strong> aplica mecánicas de juego (puntos, niveles, logros, 
                desafíos, tablas de clasificación) a procesos de negocio para aumentar motivación, engagement y 
                resultados. No se trata de convertir todo en un juego, sino de aplicar principios de diseño lúdico 
                para hacer actividades más atractivas y efectivas.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Beneficios de la Gamificación
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>+50% de engagement:</strong> Participación activa en lugar de pasiva</li>
                <li><strong>+40% de productividad:</strong> Motivación intrínseca para cumplir objetivos</li>
                <li><strong>+60% de retención:</strong> Aprendizaje más efectivo y duradero</li>
                <li><strong>+35% de cumplimiento:</strong> Mayor adherencia a procesos y políticas</li>
                <li><strong>Datos accionables:</strong> Analytics detallados de desempeño</li>
                <li><strong>Cultura positiva:</strong> Ambiente laboral más dinámico y colaborativo</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Aplicaciones de Gamificación
              </h2>
              
              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                1. Capacitación y Onboarding
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Convierte programas de entrenamiento en aventuras interactivas. Los nuevos empleados avanzan por 
                niveles, desbloquean contenido y compiten sanamente mientras aprenden las políticas y procesos de 
                la empresa. Resultado: <strong>70% menos tiempo de onboarding</strong> y <strong>90% de retención 
                de información</strong>.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                2. Ventas y Cumplimiento de Objetivos
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Implementa sistemas de puntos, misiones diarias, rachas de éxito y recompensas virtuales/reales. 
                Equipos de ventas reportan <strong>aumento de 35% en conversiones</strong> cuando sus KPIs están 
                gamificados. Las tablas de clasificación fomentan competencia sana y visibilidad de logros.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                3. Compliance y Certificaciones
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Haz que los entrenamientos obligatorios sean menos tediosos. Quizzes interactivos, escenarios de 
                decisión y narrativas envolventes transforman contenido aburrido en experiencias memorables. 
                <strong>95% de tasa de completación</strong> vs 45% en cursos tradicionales.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                4. Cultura Organizacional
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Sistemas de reconocimiento peer-to-peer gamificados, desafíos de bienestar, iniciativas de 
                innovación colaborativa. La gamificación hace visibles y celebra los comportamientos que quieres 
                fomentar en tu organización.
              </p>

              <h3 className="text-2xl font-bold mb-4 text-black font-heading">
                5. Seguridad e Higiene
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Auditorías gamificadas, reportes de near-miss con recompensas, simulacros con scoring. Empresas 
                industriales han reducido <strong>accidentes hasta 60%</strong> con programas de seguridad gamificados.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Elementos de Gamificación que Implementamos
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Puntos y Monedas:</strong> Sistema de recompensas acumulables</li>
                <li><strong>Niveles y Progresión:</strong> Sensación de avance y maestría</li>
                <li><strong>Logros y Badges:</strong> Reconocimiento de hitos específicos</li>
                <li><strong>Leaderboards:</strong> Competencia sana y visibilidad</li>
                <li><strong>Misiones y Desafíos:</strong> Objetivos claros y alcanzables</li>
                <li><strong>Narrativa:</strong> Contexto que da significado a las acciones</li>
                <li><strong>Feedback Instantáneo:</strong> Respuestas inmediatas a acciones</li>
                <li><strong>Elementos Sociales:</strong> Colaboración y competencia entre equipos</li>
                <li><strong>Personalización:</strong> Avatares, perfiles, preferencias</li>
              </ul>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Nuestro Proceso de Gamificación
              </h2>
              <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3 mb-8">
                <li><strong>Análisis:</strong> Identificamos los comportamientos que quieres modificar</li>
                <li><strong>Objetivos:</strong> Definimos KPIs medibles y metas claras</li>
                <li><strong>Diseño:</strong> Creamos la arquitectura de gamificación y flujos de usuario</li>
                <li><strong>Desarrollo:</strong> Implementamos plataforma web/móvil/integración</li>
                <li><strong>Pilot:</strong> Probamos con grupo control y ajustamos</li>
                <li><strong>Lanzamiento:</strong> Rollout completo con capacitación</li>
                <li><strong>Optimización:</strong> Iteramos basado en datos y feedback</li>
              </ol>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Plataformas de Gamificación
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Desarrollamos soluciones custom o integramos con tu <strong>LMS existente</strong> (Moodle, SAP 
                SuccessFactors, Cornerstone). Nuestras plataformas incluyen dashboards administrativos completos, 
                analytics en tiempo real, integración con sistemas HR, y apps móviles nativas.
              </p>

              <h2 className="text-3xl font-bold mb-6 text-black font-heading mt-12">
                Casos de Éxito
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Retail:</strong> Cadena nacional aumentó +42% en venta de productos promocionales con 
                gamificación del punto de venta.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                <strong>Manufactura:</strong> Planta automotriz redujo 65% tiempo de certificación de nuevos 
                operadores con training gamificado.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Banca:</strong> Institución financiera aumentó +50% adopción de nueva plataforma digital 
                interna con programa gamificado.
              </p>

              <div className="bg-[#FCDD2F]/10 p-8 rounded-2xl mt-12">
                <h2 className="text-3xl font-bold mb-4 text-black font-heading text-center">
                  Gamifica tu Empresa Hoy
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6">
                  Descubre cómo la gamificación puede transformar tu organización. Consultoría gratuita.
                </p>
                <div className="text-center">
                  <Link href="/contacto">
                    <Button className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full">
                      Iniciar Gamificación
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

