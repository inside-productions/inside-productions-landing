"use client"

import { Card, CardContent } from "@/components/card"
import { Eye, CuboidIcon as Cube, Layers, Gamepad2 } from "lucide-react"

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
    icon: <Eye className="w-6 h-6" />,
    title: "Realidad Aumentada",
    description:
      "Experiencias AR que fusionan el mundo digital con el físico, creando interacciones inmersivas y memorables.",
  },
  {
    icon: <Cube className="w-6 h-6" />,
    title: "Mundos Virtuales",
    description:
      "Entornos VR completamente inmersivos para entrenamientos, presentaciones y experiencias de marca únicas.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Realidad Mixta",
    description:
      "Soluciones MR que combinan elementos virtuales y reales para crear experiencias híbridas innovadoras.",
  },
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Experiencias Interactivas",
    description: "Instalaciones y aplicaciones interactivas que transforman la manera de conectar con tu audiencia.",
  },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white/80 backdrop-blur-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className="text-[#FCDD2F] mb-4 flex justify-center relative z-10">{service.icon}</div>
                <h3 className="text-lg font-bold tracking-wide mb-4 relative z-10 text-black font-heading">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}