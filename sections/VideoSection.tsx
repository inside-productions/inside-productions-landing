"use client"

import { VimeoPlayer } from "@/components/VimeoPlayer"

interface VideoSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

export default function VideoSection({ AnimatedParticles }: VideoSectionProps) {
  return (
    <section id="video" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white py-20">
      {/* Animated background with sparks */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={40} 
          className="animate-float-gentle opacity-30" 
          sizeRange={[3, 11]}
          animationRange={[8, 12]}
          delayRange={[0, 6]}
          backgroundType="radial"
        />
      </div>
      <div className="relative z-10 text-center text-black px-4 w-full max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-wider mb-5 animate-slide-up font-heading">
          DEMO REEL
        </h2>
        <div className="w-full max-w-4xl lg:max-w-[1100px] xl:max-w-[1200px] mx-auto px-0 md:px-4">
          <VimeoPlayer
            videoId="1106243202"
            title="INSIDE PRODUCTIONS DEMO REEL 2025"
            className="shadow-2xl hover:shadow-[#FCDD2F]/20 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  )
}