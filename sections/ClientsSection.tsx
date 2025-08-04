"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    setClients(clientsData)
  }, [])
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
        <div className="overflow-hidden">
          <div className={`flex space-x-12 hover:pause ${clients.length === 1 ? 'animate-scroll-single' : 'animate-scroll'}`}>
            {/* Duplicar múltiples veces para scroll infinito continuo */}
            {Array.from({ length: clients.length === 1 ? 6 : clients.length * 2 }, (_, i) => 
              clients[i % clients.length]
            ).map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-md border border-[#FCDD2F]/20 hover:shadow-xl hover:scale-105 hover:-rotate-2 transition-all duration-300 glass-effect"
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
      </div>
    </section>
  )
}