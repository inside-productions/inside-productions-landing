"use client"

import Header from "@/sections/Header"
import ServicesSection from "@/sections/ServicesSection"
import SEOContent from "@/components/SEOContent"
import ContactCTA from "@/components/ContactCTA"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function QueHacemosPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <ServicesSection AnimatedParticles={AnimatedParticles} />
      
      <SEOContent />

      <ContactCTA />
      
      <Footer />
    </div>
  )
}

