"use client"

import Header from "@/sections/Header"
import ContactSection from "@/sections/ContactSection"
import SocialMediaSection from "@/sections/SocialMediaSection"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <ContactSection AnimatedParticles={AnimatedParticles} />
      
      <SocialMediaSection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}

