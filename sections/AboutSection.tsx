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
    <section id="about" className="min-h-screen py-20 bg-white relative overflow-hidden flex items-center">
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
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold tracking-wide mb-8 hover:text-[#FCDD2F] transition-colors duration-500 animate-slide-up-delay font-heading">
            INNOVACIÓN EN CADA PIXEL
          </h3>
          <div className="space-y-4 mb-8 animate-fade-in-up">
            <p className="text-base md:text-lg leading-relaxed">
              Somos un estudio creativo especializado en el desarrollo de experiencias interactivas que combinan realidad aumentada (AR), realidad virtual (VR) y videojuegos. Diseñamos soluciones a la medida para empresas e instituciones con fines educativos, de capacitación y entretenimiento.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Nuestra misión es convertir procesos complejos en vivencias claras, dinámicas y memorables, facilitando el aprendizaje acelerado, optimizando entrenamientos y mejorando la eficiencia en distintos entornos. Con un enfoque multidisciplinario y el uso de las últimas tecnologías de realidad extendida, conectamos a las personas con el conocimiento de manera innovadora y efectiva.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Procesos Optimizados", "Equipo Multidisciplinario", "Visión Innovadora"].map((badge, index) => (
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