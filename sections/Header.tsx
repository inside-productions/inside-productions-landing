"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  scrollToSection: (sectionId: string) => void
  scrollToTop: () => void
}

export default function Header({ scrollToSection, scrollToTop }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { label: "Demo Reel", id: "video" },
    { label: "Qué hacemos", id: "services" },
    { label: "Quiénes somos", id: "about" },
    { label: "Galería", id: "gallery" },
    { label: "Clientes", id: "clients" },
    { label: "Contacto", id: "contact" },
  ]

  const handleMenuItemClick = (id: string) => {
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-white shadow-2xl' : 'bg-white/95 backdrop-blur-md'} transition-all duration-500`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={scrollToTop}>
            <Image
              src="/logo-inside-black.png"
              alt="Inside Productions Logo"
              width={50}
              height={50}
              className="h-10 w-10 md:h-12 md:w-12 transition-all duration-700 ease-out group-hover:rotate-6 group-hover:scale-110"
            />
            <div className="text-xl md:text-2xl font-bold tracking-wider group-hover:text-[#FCDD2F] transition-all duration-500 ease-out font-heading">
              INSIDE PRODUCTIONS
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 bg-[#FCDD2F] rounded-md shadow-md"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-inside-black.png"
                alt="Inside Productions Logo"
                width={50}
                height={50}
                className="h-10 w-10"
              />
              <div className="text-xl font-bold tracking-wider font-heading">
                INSIDE PRODUCTIONS
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 bg-[#FCDD2F] rounded-md shadow-md"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>
          
          <nav className="flex flex-col items-center justify-center flex-grow">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className="py-4 text-xl font-medium w-full text-center hover:bg-[#FCDD2F]/10 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}