"use client"

import Header from "@/sections/Header"
import VideoSection from "@/sections/VideoSection"
import Footer from "@/sections/Footer"
import AnimatedParticles from "@/components/AnimatedParticles"

export default function DemoReelPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header />
      
      <VideoSection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}

