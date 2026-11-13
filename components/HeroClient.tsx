"use client"

import { Button } from "@/components/button"
import Link from "next/link"
import { scrollToDemoReel } from "@/lib/scrollToDemoReel"

export default function HeroClient() {
  return (
    <section
      className="relative min-h-[100svh] h-[100svh] flex items-center justify-center overflow-hidden"
      style={{
        position: "relative",
      }}
    >
      {/* Fondo blanco base */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Imagen de fondo a ancho completo, adaptable a móvil/tablet/desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-y-[40px] md:-translate-y-[60px] scale-[1.08] md:scale-105 origin-center">
          <img
            src="/hero-background-1.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        </div>
      </div>
      
      <div className="relative z-10 text-center text-black px-4 animate-fade-in -translate-y-[40px] md:-translate-y-[60px]">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 leading-tight font-heading">
          <span className="inline-block text-[#FCDD2F]">
            INSIDE PRODUCTIONS
          </span>
        </h1>
                
        <div className="text-xl md:text-3xl lg:text-4xl font-medium tracking-wide mb-8 mt-8 md:mt-16 font-heading text-white">
          <div className="flex flex-wrap justify-center gap-4">
            {["INNOVACIÓN", "INTERACTIVA", "AL"].map((word, index) => (
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
            {["SERVICIO", "DE", "TU", "EMPRESA"].map((word, index) => (
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
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#demo-reel-player"
            onClick={(e) => {
              e.preventDefault()
              scrollToDemoReel()
            }}
          >
            <Button
              className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-500 ease-out transform hover:scale-110 hover:shadow-2xl hover:shadow-[#FCDD2F]/30"
            >
              <span className="relative z-10">Ver Demo</span>
            </Button>
          </a>
          <Link href="/contacto">
            <Button
              className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold px-8 py-4 text-lg rounded-full transition-all duration-500 ease-out transform hover:scale-110 hover:shadow-2xl hover:shadow-[#FCDD2F]/30"
            >
              <span className="relative z-10">Cotiza un proyecto</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
