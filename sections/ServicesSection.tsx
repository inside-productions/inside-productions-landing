"use client"

import { Card, CardContent } from "@/components/card"
import Image from "next/image"

interface ServicesSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

const services = [
  {
    image: "/realidad-aumentada.jpeg",
    title: "Realidad Aumentada (AR)",
    description:
      "Experiencias que integran el mundo digital con el físico para educar, comunicar y sorprender, generando interacciones inmersivas y memorables.",
  },
  {
    image: "/realidad-virtual.jpeg",
    title: "Realidad Virtual (VR)",
    description:
      "Entornos completamente inmersivos que permiten explorar, aprender y vivir experiencias únicas, desde presentaciones hasta proyectos educativos o culturales.",
  },
  {
    image: "/videojuegos-gamificacion.jpeg",
    title: "Videojuegos y Gamificación",
    description:
      "Diseño de juegos y dinámicas interactivas que convierten procesos complejos en experiencias atractivas, potenciando el aprendizaje, la motivación y el entretenimiento.",
  }
]

export default function ServicesSection({ AnimatedParticles }: ServicesSectionProps) {
  return (
    <section id="services" className="min-h-screen py-20 bg-black text-white relative overflow-hidden flex items-center">
      {/* Dynamic background with sparks */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={60} 
          className="animate-particle-dance opacity-25" 
          sizeRange={[2, 8]}
          animationRange={[12, 20]}
          delayRange={[0, 10]}
          backgroundType="linear"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-16 animate-slide-up font-heading">
          QUÉ HACEMOS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0 text-center relative overflow-hidden">
                <div className="flex justify-center relative z-10 h-48 w-full overflow-hidden">
                  <Image 
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold tracking-wide mb-4 relative z-10 text-black font-heading">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed relative z-10 text-sm">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}