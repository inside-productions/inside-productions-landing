"use client"

import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0 group">
            <Image
              src="/logo-inside-white.jpeg"
              alt="Inside Productions Logo"
              width={40}
              height={40}
              className="h-10 w-10 group-hover:rotate-12 transition-transform duration-300"
            />
            <div className="text-2xl font-bold tracking-wider group-hover:text-[#FCDD2F] transition-colors duration-300 font-heading">
              INSIDE PRODUCTIONS
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
            <p className="text-gray-400">© 2025 Inside Productions. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-gray-400 hover:text-[#FCDD2F] transition-colors duration-300">
                Privacidad
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#FCDD2F] transition-colors duration-300">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}