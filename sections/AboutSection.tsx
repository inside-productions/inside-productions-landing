"use client"

import { useState } from "react"
import { Badge } from "@/components/badge"
import { Eye } from "lucide-react"
import TeamModal from "@/sections/TeamModal"

interface AboutSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

export default function AboutSection({ AnimatedParticles }: AboutSectionProps) {
  const [showTeamModal, setShowTeamModal] = useState(false)

  const closeModal = () => {
    setShowTeamModal(false)
  }
  return (
    <section id="about" className="h-screen py-20 bg-white relative overflow-hidden flex items-center">
      {/* Dynamic sparks background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={80} 
          className="animate-float-gentle opacity-20" 
          sizeRange={[3, 13]}
          animationRange={[10, 16]}
          delayRange={[0, 12]}
          backgroundType="radial"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex items-center justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center animate-slide-up mr-4 font-heading">
            QUIÉNES SOMOS
          </h2>
          <button
            onClick={() => setShowTeamModal(true)}
            className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg"
          >
            <Eye className="w-6 h-6" />
          </button>
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold tracking-wide mb-8 hover:text-[#FCDD2F] transition-colors duration-500 animate-slide-up-delay font-heading">
            INNOVACIÓN EN CADA PIXEL
          </h3>
          <p className="text-lg leading-relaxed mb-8 animate-fade-in-up">
            Somos un equipo multidisciplinario de creativos, desarrolladores y visionarios especializados en crear
            experiencias inmersivas que trascienden los límites de la realidad tradicional. Nuestra misión es
            transformar ideas complejas en experiencias tangibles y memorables, utilizando las últimas tecnologías de
            realidad extendida para conectar marcas con sus audiencias de maneras nunca antes imaginadas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["+50 Proyectos", "5 Años Experiencia", "Equipo Internacional"].map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-[#FCDD2F] text-black px-4 py-2 text-sm hover:scale-110 hover:rotate-3 transition-all duration-300 animate-bounce-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <TeamModal 
        showTeamModal={showTeamModal}
        closeModals={closeModal}
      />
    </section>
  )
}