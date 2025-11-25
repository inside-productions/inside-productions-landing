"use client"

import Header from "@/sections/Header"
import AboutSection from "@/sections/AboutSection"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function QuienesSomosPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <AboutSection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}

