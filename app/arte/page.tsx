"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Header from "@/sections/Header"
import Footer from "@/sections/Footer"
import { VimeoPlayer } from "@/components/VimeoPlayer"
import artProjectsData from "@/data/artProjects.json"

const { projects2D, projects3D } = artProjectsData

type Project2D = typeof projects2D[0]
type Project3D = typeof projects3D[0]

// Helper function to extract Vimeo video ID from URL
const extractVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : ""
}

export default function ArtePage() {
  const [activeCategory, setActiveCategory] = useState<"2D" | "3D">("2D")
  const [selectedProject, setSelectedProject] = useState<Project2D | Project3D | null>(null)

  const currentProjects = activeCategory === "2D" ? projects2D : projects3D

  // Hide body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedProject])

  const handleProjectClick = (project: Project2D | Project3D) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  // Check if project is 3D (has vfx property)
  const is3DProject = (project: Project2D | Project3D): project is Project3D => {
    return "vfx" in project
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FCDD2F]/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-heading tracking-tight">
              ARTE
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Desarrollo de Arte para Videojuegos
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex justify-center gap-4 mb-16">
            <button
              onClick={() => setActiveCategory("2D")}
              className={`
                px-10 py-4 text-xl font-bold rounded-lg transition-all duration-300 
                border-2 tracking-wider
                ${activeCategory === "2D" 
                  ? "bg-[#FCDD2F] text-black border-[#FCDD2F] shadow-[0_0_30px_rgba(252,221,47,0.4)]" 
                  : "bg-transparent text-white border-white/20 hover:border-[#FCDD2F]/50 hover:text-[#FCDD2F]"
                }
              `}
            >
              2D
            </button>
            <button
              onClick={() => setActiveCategory("3D")}
              className={`
                px-10 py-4 text-xl font-bold rounded-lg transition-all duration-300 
                border-2 tracking-wider
                ${activeCategory === "3D" 
                  ? "bg-[#FCDD2F] text-black border-[#FCDD2F] shadow-[0_0_30px_rgba(252,221,47,0.4)]" 
                  : "bg-transparent text-white border-white/20 hover:border-[#FCDD2F]/50 hover:text-[#FCDD2F]"
                }
              `}
            >
              3D
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group relative aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer 
                           border border-white/5 hover:border-[#FCDD2F]/30 transition-all duration-500
                           hover:shadow-[0_0_40px_rgba(252,221,47,0.15)]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Project Image */}
                <Image
                  src={project.mainImage}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay with Project Name */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1">
                      {project.name}
                    </h3>
                    <span className="text-[#FCDD2F] text-xs font-medium">
                      Click para ver más
                    </span>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 
                                border-t-[40px] border-t-[#FCDD2F]/0 
                                border-l-[40px] border-l-transparent
                                group-hover:border-t-[#FCDD2F]/80 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          <div 
            className="min-h-screen py-8 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-[#FCDD2F] 
                         rounded-full transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-black" />
            </button>

            <div className="max-w-6xl mx-auto">
              {/* Project Title */}
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 pt-8 font-heading">
                {selectedProject.name}
              </h2>

              {/* Main Content - Image + Gameplay */}
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-12 items-start">
                {/* Main Image + Description */}
                <div className="space-y-4">
                  <div className="aspect-[4/3] max-w-[365px] bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10
                                  relative group">
                    <Image
                      src={selectedProject.mainImage}
                      alt={selectedProject.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed max-w-[400px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                {/* Gameplay Video */}
                <div className="w-full">
                  <VimeoPlayer
                    key={`video-${selectedProject.id}-${extractVimeoId(selectedProject.video.link)}`}
                    videoId={extractVimeoId(selectedProject.video.link)}
                    title={selectedProject.video.title}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Assets Section */}
              <div className="mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading 
                               border-l-4 border-[#FCDD2F] pl-4">
                  ASSETS
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedProject.assets.map((asset, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/5
                                 hover:border-[#FCDD2F]/30 transition-all duration-300 cursor-pointer
                                 relative group"
                    >
                      <Image
                        src={asset}
                        alt={`${selectedProject.name} Asset ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* VFX Section - Only for 3D projects */}
              {is3DProject(selectedProject) && selectedProject.vfx && (
                <div className="mb-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-heading 
                                 border-l-4 border-[#FCDD2F] pl-4">
                    VFX
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProject.vfx.map((vfx, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/5
                                   hover:border-purple-500/30 transition-all duration-300 cursor-pointer
                                   relative group"
                      >
                        <Image
                          src={vfx}
                          alt={`${selectedProject.name} VFX ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation between projects */}
              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FCDD2F] transition-colors group">
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Anterior</span>
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-white/10 hover:bg-[#FCDD2F] text-white hover:text-black 
                             rounded-lg transition-all duration-300 font-medium"
                >
                  Volver a la galería
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-[#FCDD2F] transition-colors group">
                  <span>Siguiente</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

