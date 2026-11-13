"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const menuItems = [
    { label: "Qué hacemos", href: "/que-hacemos" },
    { label: "Galería", href: "/galeria" },
    { label: "Quiénes somos", href: "/quienes-somos" },
    { label: "Contáctanos", href: "/contacto" },
  ]

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] ${
          scrolled || mobileMenuOpen ? "bg-white shadow-2xl" : "bg-white/95 backdrop-blur-md"
        } transition-all duration-500`}
      >
        <div className="container mx-auto px-4 h-[72px] md:h-[80px] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 cursor-pointer group" onClick={handleMenuItemClick}>
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
          </Link>

          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative hover:border-b-2 hover:border-[#FCDD2F] transition-all duration-300 pb-1 group ${
                  pathname === item.href ? "border-b-2 border-[#FCDD2F]" : ""
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-[#FCDD2F]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg -z-10"></div>
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 bg-[#FCDD2F] rounded-md shadow-md shrink-0"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </header>

      {/* Spacer to offset fixed header */}
      <div className="h-[72px] md:h-[80px]" />

      {/* Mobile Menu Overlay — starts below the stable header */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 bg-white z-50 flex flex-col md:hidden">
          <nav className="flex flex-col items-center justify-center flex-grow">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleMenuItemClick}
                className={`py-4 text-xl font-medium w-full text-center hover:bg-[#FCDD2F]/10 transition-colors duration-300 ${
                  pathname === item.href ? "bg-[#FCDD2F]/20" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
