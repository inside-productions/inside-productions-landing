"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react"
import Image from "next/image"
import { VimeoPlayer } from "@/components/VimeoPlayer"
import projectsData from "@/data/projects.json"

interface VideoItem {
  title: string
  link: string
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  hasVideo: boolean
  gallery: string[]
  videos: VideoItem[]
  fullDescription: string
  autoSlideshow?: boolean
}

interface GallerySectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

// Helper function to extract Vimeo video ID from URL
const extractVimeoId = (url: string): string => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : ""
}

export default function GallerySection({ AnimatedParticles }: GallerySectionProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [slideshowIndex, setSlideshowIndex] = useState(0)
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setProjects(projectsData as Project[])
  }, [])

  // Auto slideshow effect for projects with autoSlideshow flag
  useEffect(() => {
    if (hoveredProject !== null) {
      const project = projects.find(p => p.id === hoveredProject)
      if (project?.autoSlideshow && project.gallery.length > 0) {
        // Start slideshow
        slideshowIntervalRef.current = setInterval(() => {
          setSlideshowIndex(prev => (prev + 1) % project.gallery.length)
        }, 800) // Change image every 800ms
      }
    } else {
      // Clear interval and reset index
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current)
        slideshowIntervalRef.current = null
      }
      setSlideshowIndex(0)
    }
    
    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current)
      }
    }
  }, [hoveredProject, projects])

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

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentVideoIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentVideoIndex(0)
  }

  const navigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id)
    let newIndex: number
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1
    } else {
      newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedProject(projects[newIndex])
    setCurrentVideoIndex(0)
  }

  // Featured project is the first one
  const featuredProject = projects[0]
  const otherProjects = projects.slice(1)

  return (
    <section id="gallery" className="min-h-screen py-24 bg-gradient-to-br from-black via-[#0d0d0d] to-[#0a0a0a] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FCDD2F]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FCDD2F]/50 to-transparent" />
      
      {/* Geometric Decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#FCDD2F]/10 rotate-45 rounded-3xl" />
      <div className="absolute bottom-40 right-10 w-48 h-48 border border-[#FCDD2F]/10 rotate-12 rounded-3xl" />
      <div className="absolute top-1/2 left-5 w-2 h-40 bg-gradient-to-b from-[#FCDD2F]/30 to-transparent rounded-full" />
      <div className="absolute top-1/3 right-5 w-2 h-60 bg-gradient-to-b from-transparent to-[#FCDD2F]/30 rounded-full" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <AnimatedParticles 
          count={40} 
          className="animate-particle-dance" 
          sizeRange={[2, 6]}
          animationRange={[10, 15]}
          delayRange={[0, 8]}
          backgroundType="conic"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[#FCDD2F]" />
              <span className="text-[#FCDD2F] text-sm font-semibold tracking-widest uppercase">
                Nuestro Portafolio
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-heading">
              PROYECTOS
              <span className="block text-[#FCDD2F]">DESTACADOS</span>
        </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-md md:text-right">
            Videojuegos, realidad virtual y experiencias interactivas que transforman ideas en realidades
          </p>
        </div>

        {/* Featured Project - Large Card */}
        {featuredProject && (
          <div 
            className="mb-8 group cursor-pointer"
            onClick={() => openProjectModal(featuredProject)}
            onMouseEnter={() => setHoveredProject(featuredProject.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10
                            transition-all duration-700 hover:border-[#FCDD2F]/40
                            hover:shadow-[0_0_80px_rgba(252,221,47,0.15)]">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay with diagonal cut */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end md:justify-center md:max-w-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-1 bg-[#FCDD2F] rounded-full" />
                  <span className="text-[#FCDD2F] text-xs font-bold tracking-widest uppercase">
                    Proyecto Destacado
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading
                               transform transition-transform duration-500 group-hover:translate-x-2">
                  {featuredProject.title}
                </h3>
                
                <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-3">
                  {featuredProject.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-[#FCDD2F] text-black px-6 py-3 rounded-full
                                     font-semibold transition-all duration-300 hover:bg-white hover:scale-105
                                     hover:shadow-[0_0_30px_rgba(252,221,47,0.5)]">
                    <Play className="w-5 h-5" />
                    Ver Proyecto
                  </button>
                  {featuredProject.videos.length > 0 && (
                    <span className="text-gray-400 text-sm">
                      {featuredProject.videos.length} {featuredProject.videos.length === 1 ? 'video' : 'videos'} disponibles
                    </span>
                  )}
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-40 h-40">
                <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-[#FCDD2F]/50 
                                rounded-tr-3xl transition-all duration-500 group-hover:w-32 group-hover:h-32
                                group-hover:border-[#FCDD2F]" />
              </div>
            </div>
          </div>
        )}

        {/* Other Projects - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => {
            const isSlideshow = project.autoSlideshow && hoveredProject === project.id
            const currentImage = isSlideshow && project.gallery.length > 0
              ? project.gallery[slideshowIndex % project.gallery.length]
              : project.image
            
            return (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer 
                         border border-white/5 transition-all duration-500
                         hover:border-[#FCDD2F]/30 hover:shadow-[0_0_40px_rgba(252,221,47,0.1)]
                         ${index === 0 ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[4/3]'}`}
            >
              {/* Image - with slideshow support */}
                      <Image
                src={currentImage}
                        alt={project.title}
                fill
                className={`object-cover transition-all duration-500 ${isSlideshow ? '' : 'group-hover:scale-110'}`}
              />
              
              {/* Slideshow indicators */}
              {project.autoSlideshow && hoveredProject === project.id && (
                <div className="absolute top-4 left-4 flex gap-1.5 z-10">
                  {project.gallery.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === slideshowIndex % project.gallery.length
                          ? 'w-6 bg-[#FCDD2F]'
                          : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Hover Overlay - Slide up effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent
                              translate-y-1/2 group-hover:translate-y-0 transition-transform duration-500" />
              
              {/* Content - Always at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Number badge */}
                <div className="absolute top-0 right-6 -translate-y-1/2 w-12 h-12 bg-[#FCDD2F] rounded-full
                                flex items-center justify-center font-bold text-black text-lg
                                opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100
                                transition-all duration-500 delay-100">
                  {String(index + 2).padStart(2, '0')}
                </div>
                
                <h3 className="text-white font-bold text-xl md:text-2xl mb-2 font-heading
                               transform transition-all duration-500 group-hover:text-[#FCDD2F]">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2 opacity-0 group-hover:opacity-100
                              transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {project.description}
                </p>
                
                {/* Progress bar decoration */}
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden opacity-0 group-hover:opacity-100
                                transition-opacity duration-500">
                  <div className="h-full bg-[#FCDD2F] rounded-full transform -translate-x-full group-hover:translate-x-0
                                  transition-transform duration-1000 delay-200" 
                       style={{ width: '100%' }} />
                </div>
              </div>
              
              {/* Video indicator - only show if not in slideshow mode */}
              {project.videos.length > 0 && !(project.autoSlideshow && hoveredProject === project.id) && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm
                                px-3 py-1.5 rounded-full text-xs text-white">
                  <Play className="w-3 h-3 text-[#FCDD2F]" />
                  <span>{project.videos.length}</span>
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/98 z-50 overflow-y-auto"
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
                         rounded-full transition-all duration-300 group backdrop-blur-sm"
            >
              <X className="w-6 h-6 text-white group-hover:text-black" />
            </button>

            <div className="max-w-6xl mx-auto">
              {/* Project Header with number */}
              <div className="flex items-start gap-6 mb-8 pt-8">
                <div className="hidden md:flex w-20 h-20 bg-[#FCDD2F] rounded-2xl items-center justify-center
                                font-bold text-black text-3xl shrink-0">
                  {String(projects.findIndex(p => p.id === selectedProject.id) + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white font-heading">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-400 mt-2 max-w-2xl">
                    {selectedProject.description}
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mb-12 items-start">
                {/* Video Section */}
                <div className="space-y-4">
                  {selectedProject.videos.length > 0 && (
                    <>
                      <VimeoPlayer
                        key={`video-${selectedProject.id}-${extractVimeoId(selectedProject.videos[currentVideoIndex].link)}`}
                        videoId={extractVimeoId(selectedProject.videos[currentVideoIndex].link)}
                        title={selectedProject.videos[currentVideoIndex].title}
                        className="w-full rounded-2xl overflow-hidden"
                      />
                      
                      {/* Video Selector - Pills */}
                      {selectedProject.videos.length > 1 && (
                        <div className="flex gap-2 flex-wrap">
                          {selectedProject.videos.map((video, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentVideoIndex(index)}
                              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                                currentVideoIndex === index
                                  ? 'bg-[#FCDD2F] text-black font-semibold shadow-[0_0_20px_rgba(252,221,47,0.3)]'
                                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                              }`}
                            >
                              {video.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                      )}
                    </div>

                {/* Info Section */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl p-6 border border-white/10
                                  backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-1 bg-[#FCDD2F] rounded-full" />
                      <h3 className="text-lg font-bold text-white font-heading">
                        DESCRIPCIÓN
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                      <div className="text-2xl font-bold text-[#FCDD2F]">{selectedProject.gallery.length}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Imágenes</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5">
                      <div className="text-2xl font-bold text-[#FCDD2F]">{selectedProject.videos.length}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Videos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              {selectedProject.gallery.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-1 bg-[#FCDD2F] rounded-full" />
                    <h3 className="text-2xl font-bold text-white font-heading">
                      GALERÍA
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent ml-4" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProject.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5
                                   hover:border-[#FCDD2F]/30 transition-all duration-300 cursor-pointer
                                   relative group"
                      >
                        <Image
                          src={image}
                          alt={`${selectedProject.title} - Imagen ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
              )}

              {/* Navigation between projects */}
              <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <button
                  onClick={() => navigateProject('prev')}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                                  group-hover:bg-[#FCDD2F] transition-colors">
                    <ChevronLeft className="w-5 h-5 group-hover:text-black" />
                  </div>
                  <span className="hidden sm:inline">Proyecto Anterior</span>
          </button>
          <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-white/5 hover:bg-[#FCDD2F] text-white hover:text-black 
                             rounded-full transition-all duration-300 font-medium border border-white/10
                             hover:border-[#FCDD2F]"
                >
                  Cerrar
          </button>
              <button
                  onClick={() => navigateProject('next')}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="hidden sm:inline">Siguiente Proyecto</span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center
                                  group-hover:bg-[#FCDD2F] transition-colors">
                    <ChevronRight className="w-5 h-5 group-hover:text-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
