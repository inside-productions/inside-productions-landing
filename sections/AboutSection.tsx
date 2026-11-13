"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/badge"
import Image from "next/image"
import teamMembersData from "@/data/teamMembers.json"

interface TeamMember {
  id: number
  name: string
  position: string
  description: string
  image: string
}

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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    setTeamMembers(teamMembersData)
  }, [])
  return (
    <section id="about" className="min-h-screen py-20 bg-white relative overflow-hidden">
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
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center animate-slide-up mb-8 font-heading">
            QUIÉNES SOMOS
          </h2>
        </div>

        <div className="w-full mx-auto px-4 md:px-6 lg:px-8 text-center mb-8 animate-fade-in-up space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-black">
            Somos un estudio interdisciplinario especializado en el desarrollo de experiencias interactivas. Diseñamos soluciones a la medida para empresas e instituciones con fines educativos, de capacitación y entretenimiento.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
          {["Procesos Optimizados", "Equipo Multidisciplinario", "Visión Innovadora"].map((badge, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-[#FCDD2F] text-black px-4 py-2 text-sm hover:bg-[#FCDD2F] transition-none animate-bounce-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {badge}
            </Badge>
          ))}
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto px-4 mt-20">
            <h3 className="text-3xl md:text-4xl font-bold tracking-wider text-center mb-12 text-black font-heading">
              NUESTRO EQUIPO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id} 
                  className="text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative mb-4 mx-auto w-48 h-48">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={192}
                      height={192}
                      className="w-48 h-48 rounded-full object-cover border-4 border-transparent"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2 font-heading">
                    {member.name}
                  </h4>
                  <p className="text-[#FCDD2F] font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm leading-relaxed px-2">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}