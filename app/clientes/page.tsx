"use client"

import Header from "@/sections/Header"
import ClientsSection from "@/sections/ClientsSection"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function ClientesPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <ClientsSection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}

