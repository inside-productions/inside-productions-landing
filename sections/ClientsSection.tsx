"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import clientsData from "@/data/clients.json"

interface Client {
  name: string
  logo: string
}

interface ClientsSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

export default function ClientsSection({ AnimatedParticles }: ClientsSectionProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setClients(clientsData)
  }, [])
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const newPosition = Math.max(0, scrollPosition - 350)
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const newPosition = Math.min(
        container.scrollWidth - container.clientWidth,
        scrollPosition + 350
      )
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }
  return (
    <section id="clients" className="h-screen py-20 bg-white relative overflow-hidden flex items-center">
      {/* Sparks and energy field */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={90} 
          className="animate-float-gentle opacity-25" 
          sizeRange={[2, 8]}
          animationRange={[8, 14]}
          delayRange={[0, 10]}
          backgroundType="linear"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-16 animate-slide-up font-heading">
          CONFÍAN EN NOSOTROS
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={scrollContainerRef}>
            <div className="flex space-x-12 px-4 pb-4 snap-x snap-mandatory">
              {clients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-md border border-[#FCDD2F]/20 hover:shadow-xl hover:scale-105 hover:-rotate-2 transition-all duration-300 glass-effect snap-center"
                  style={{ width: "320px", height: "180px" }}
                >
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                    <div className="flex-1 flex items-center justify-center">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        width={300}
                        height={100}
                        className="max-h-24 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-6 bg-white hover:bg-[#FCDD2F] text-black hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 hover:scale-110 hover:rotate-12"
            aria-label="Anterior cliente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-6 bg-white hover:bg-[#FCDD2F] text-black hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 hover:scale-110 hover:-rotate-12"
            aria-label="Siguiente cliente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}