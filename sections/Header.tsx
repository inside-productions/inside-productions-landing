"use client"

import Image from "next/image"

interface HeaderProps {
  scrollToSection: (sectionId: string) => void
  scrollToTop: () => void
}

export default function Header({ scrollToSection, scrollToTop }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={scrollToTop}>
          <Image
            src="/logo-inside.svg"
            alt="Inside Productions Logo"
            width={50}
            height={50}
            className="h-12 w-12 transition-all duration-700 ease-out group-hover:rotate-6 group-hover:scale-110"
          />
          <div className="text-2xl font-bold tracking-wider group-hover:text-[#FCDD2F] transition-all duration-500 ease-out font-heading">
            INSIDE PRODUCTIONS
          </div>
        </div>
        <nav className="hidden md:flex space-x-8">
          {[
            { label: "Demo Reel", id: "video" },
            { label: "Qué hacemos", id: "services" },
            { label: "Quiénes somos", id: "about" },
            { label: "Galería", id: "gallery" },
            { label: "Clientes", id: "clients" },
            { label: "Contacto", id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative hover:border-b-2 hover:border-[#FCDD2F] transition-all duration-300 pb-1 group"
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-[#FCDD2F]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></div>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}