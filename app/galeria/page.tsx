"use client"

import Header from "@/sections/Header"
import GallerySection from "@/sections/GallerySection"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <GallerySection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}

