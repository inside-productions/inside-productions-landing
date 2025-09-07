"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/card"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import ProjectModal from "@/sections/ProjectModal"
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

export default function GallerySection({ AnimatedParticles }: GallerySectionProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState(0)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentModalImage, setCurrentModalImage] = useState(0)

  useEffect(() => {
    setProjects(projectsData)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [projects.length])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setCurrentModalImage(0)
    setShowProjectModal(true)
  }

  const closeModal = () => {
    setShowProjectModal(false)
    setSelectedProject(null)
  }

  const nextModalImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.gallery.length + selectedProject.videos.length
      setCurrentModalImage((prev) => (prev + 1) % totalImages)
    }
  }

  const prevModalImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.gallery.length + selectedProject.videos.length
      setCurrentModalImage((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }
  return (
    <section id="gallery" className="min-h-screen py-20 bg-black text-white relative overflow-hidden flex items-center">
      {/* Dynamic sparks and energy */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles 
          count={70} 
          className="animate-particle-dance opacity-30" 
          sizeRange={[2, 10]}
          animationRange={[10, 15]}
          delayRange={[0, 8]}
          backgroundType="conic"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-16 animate-slide-up font-heading">
          GALERÍA DE PROYECTOS
        </h2>
        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl shadow-2xl glass-effect w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0 px-2 sm:px-3 md:px-4">
                  <Card
                    className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 rounded-2xl overflow-hidden bg-white h-full group cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-[#FCDD2F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {project.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-[#FCDD2F] rounded-full p-3 hover:scale-125 transition-all duration-300 cursor-pointer shadow-lg">
                            <Play className="w-6 h-6 text-black" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FCDD2F]/0 via-[#FFD700]/5 to-[#FFA500]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <h3 className="text-lg font-bold tracking-wide mb-3 group-hover:text-[#FCDD2F] transition-colors duration-300 relative z-10 text-black font-heading">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                        {project.description.split('\n').map((text, i) => (
                          <span key={i}>
                            {text}
                            {i < project.description.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 sm:-translate-x-4 md:-translate-x-6 bg-white hover:bg-[#FCDD2F] text-black hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 hover:scale-110 hover:rotate-12"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 sm:translate-x-4 md:translate-x-6 bg-white hover:bg-[#FCDD2F] text-black hover:text-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-10 hover:scale-110 hover:-rotate-12"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: projects.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentProject ? "bg-[#FCDD2F] scale-125" : "bg-gray-300 hover:bg-[#FFD700]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal 
        showProjectModal={showProjectModal}
        selectedProject={selectedProject}
        currentModalImage={currentModalImage}
        setCurrentModalImage={setCurrentModalImage}
        closeModals={closeModal}
        nextModalImage={nextModalImage}
        prevModalImage={prevModalImage}
      />
    </section>
  )
}