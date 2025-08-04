"use client"

import { Linkedin, Instagram, Youtube, Facebook, Video, Music } from "lucide-react"
import Link from "next/link"

interface SocialMediaSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

export default function SocialMediaSection({ AnimatedParticles }: SocialMediaSectionProps) {
  const socialLinks = [
    { icon: <Linkedin className="w-6 h-6" />, url: "https://www.linkedin.com/company/the-inside-productions/", name: "LinkedIn" },
    { icon: <Instagram className="w-6 h-6" />, url: "https://www.instagram.com/inside__productions?igsh=YmY2d2did2l2M3hj", name: "Instagram" },
    { icon: <Youtube className="w-6 h-6" />, url: "https://www.youtube.com/@InsideProductions-mx", name: "YouTube" },
    { icon: <Facebook className="w-6 h-6" />, url: "https://www.facebook.com/share/1CuAqhddpA/?mibextid=wwXIfr", name: "Facebook" },
    { icon: <Video className="w-6 h-6" />, url: "https://vimeo.com/user244469943?fl=pp&fe=sh", name: "Vimeo" },
    { icon: <Music className="w-6 h-6" />, url: "https://www.tiktok.com/@inside__productions?_t=ZS-8yaQrSYsxzm&_r=1", name: "TikTok" },
  ]

  return (
    <section className="py-16 bg-black text-white relative overflow-hidden">
      {/* Energetic sparks background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={50} 
          className="animate-particle-dance opacity-20" 
          sizeRange={[2, 7]}
          animationRange={[6, 10]}
          delayRange={[0, 6]}
          backgroundType="radial"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h3 className="text-2xl font-bold tracking-wide mb-8 animate-slide-up font-heading">SÍGUENOS EN REDES</h3>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FCDD2F] text-black hover:text-black p-4 rounded-full transition-all duration-500 transform hover:scale-125 hover:rotate-12 shadow-lg hover:shadow-2xl animate-bounce-in"
              aria-label={social.name}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}