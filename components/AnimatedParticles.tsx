"use client"

import { useState, useEffect } from "react"

interface AnimatedParticlesProps {
  count: number
  className?: string
  sizeRange?: [number, number]
  animationRange?: [number, number]
  delayRange?: [number, number]
  backgroundType?: "linear" | "radial" | "conic"
}

export default function AnimatedParticles({ 
  count, 
  className, 
  sizeRange = [4, 16], 
  animationRange = [6, 12],
  delayRange = [0, 8],
  backgroundType = "linear"
}: AnimatedParticlesProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  
  const getBackground = () => {
    switch (backgroundType) {
      case "radial":
        return `radial-gradient(circle, #FCDD2F, #FFD700, #FFA500)`
      case "conic":
        return `conic-gradient(from ${Math.random() * 360}deg, #FCDD2F, #FFD700, #FFA500, #FF8C00, #FCDD2F)`
      default:
        return `linear-gradient(45deg, #FCDD2F, #FFD700, #FFA500, #FF8C00)`
    }
  }
  
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${className}`}
          style={{
            width: `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`,
            height: `${Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: getBackground(),
            animationDelay: `${Math.random() * (delayRange[1] - delayRange[0]) + delayRange[0]}s`,
            animationDuration: `${Math.random() * (animationRange[1] - animationRange[0]) + animationRange[0]}s`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 10px rgba(252, 221, 47, 0.5)",
          }}
        />
      ))}
    </>
  )
}