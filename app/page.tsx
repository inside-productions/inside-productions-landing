"use client"

// Import sections
import Header from "@/sections/Header"
import HeroSection from "@/sections/HeroSection"
import VideoSection from "@/sections/VideoSection"
import ServicesSection from "@/sections/ServicesSection"
import AboutSection from "@/sections/AboutSection"
import GallerySection from "@/sections/GallerySection"
import ClientsSection from "@/sections/ClientsSection"
import SocialMediaSection from "@/sections/SocialMediaSection"
import ContactSection from "@/sections/ContactSection"
import Footer from "@/sections/Footer"

// Import components
import AnimatedParticles from "@/components/AnimatedParticles"

export default function InsideProductionsLanding() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <Header scrollToSection={scrollToSection} scrollToTop={scrollToTop} />
      
      <HeroSection scrollToSection={scrollToSection} AnimatedParticles={AnimatedParticles} />
      
      <VideoSection AnimatedParticles={AnimatedParticles} />
      
      <ServicesSection AnimatedParticles={AnimatedParticles} />
      
      <AboutSection AnimatedParticles={AnimatedParticles} />
      
      <GallerySection AnimatedParticles={AnimatedParticles} />
      
      <ClientsSection AnimatedParticles={AnimatedParticles} />
      
      <SocialMediaSection AnimatedParticles={AnimatedParticles} />
      
      <ContactSection AnimatedParticles={AnimatedParticles} />
      
      <Footer />
    </div>
  )
}