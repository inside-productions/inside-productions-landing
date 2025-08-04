"use client"

import { Button } from "@/components/button"

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
  }>
}

export default function HeroSection({ scrollToSection, AnimatedParticles }: HeroSectionProps) {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        position: "relative",
      }}
    >
      {/* Fondo negro base */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Fondo con imagen semi-transparente */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles count={50} className="animate-particle-dance opacity-40" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 leading-tight font-heading">
          <span className="inline-block text-[#FCDD2F]">
            INSIDE PRODUCTIONS
          </span>
        </h1>
                
        <div className="text-xl md:text-3xl lg:text-4xl font-medium tracking-wide mb-8 mt-8 md:mt-16 font-heading text-white/80">
          <div className="flex flex-wrap justify-center gap-4">
            {["INNER", "VISSIONS"].map((word, index) => (
              <span
                key={index}
                className="inline-block hover:text-[#FCDD2F] transition-all duration-700 ease-out hover:scale-105 hover:-rotate-1"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {["OUTER", "REALITIES"].map((word, index) => (
              <span
                key={index + 3}
                className="inline-block hover:text-[#FCDD2F] transition-all duration-700 ease-out hover:scale-105 hover:rotate-1"
                style={{ animationDelay: `${(index + 3) * 0.2}s` }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => scrollToSection("video")}
          className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-500 ease-out transform hover:scale-110 hover:shadow-2xl hover:shadow-[#FCDD2F]/30"
        >
          <span className="relative z-10">Ver Demo</span>
        </Button>
      </div>
    </section>
  )
}