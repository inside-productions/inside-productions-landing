"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { VimeoPlayer } from "@/components/VimeoPlayer"

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

interface ProjectModalProps {
  showProjectModal: boolean
  selectedProject: Project | null
  currentModalImage: number
  setCurrentModalImage: (index: number) => void
  closeModals: () => void
  nextModalImage: () => void
  prevModalImage: () => void
}

export default function ProjectModal({
  showProjectModal,
  selectedProject,
  currentModalImage,
  setCurrentModalImage,
  closeModals,
  nextModalImage,
  prevModalImage,
}: ProjectModalProps) {
  if (!showProjectModal || !selectedProject) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={closeModals}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModals}
          className="absolute top-4 right-4 bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black p-2 rounded-full transition-all duration-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-8">
          <h3 className="text-3xl font-bold tracking-wider text-center mb-2 text-black font-heading">
            {selectedProject.title}
          </h3>
          <p className="text-gray-600 text-center mb-8">
            {selectedProject.fullDescription.split('\n').map((text, i) => (
              <span key={i}>
                {text}
                {i < selectedProject.fullDescription.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>

          {/* Carousel Container */}
          <div className="relative mb-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden relative" style={{ height: "500px" }}>
              {(() => {
                const totalItems = selectedProject.gallery.length + selectedProject.videos.length
                const isVideo = currentModalImage >= selectedProject.gallery.length

                if (isVideo) {
                  const videoIndex = currentModalImage - selectedProject.gallery.length
                  const videoItem = selectedProject.videos[videoIndex]
                  
                  if (!videoItem) {
                    return (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <div className="text-white text-lg text-center">
                          <p>Error: Video no encontrado</p>
                        </div>
                      </div>
                    )
                  }
                  
                  const { title, link } = videoItem
                  
                  // Extract video ID from Vimeo URL
                  const getVimeoId = (url: string) => {
                    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
                    return match ? match[1] : ''
                  }
                  
                  const videoId = getVimeoId(link)
                  
                  if (videoId) {
                    return (
                      <VimeoPlayer
                        key={`video-${selectedProject.id}-${videoIndex}-${videoId}`}
                        videoId={videoId}
                        title={title}
                        className="w-full h-full"
                      />
                    )
                  } else {
                    return (
                      <div className="w-full h-full flex items-center justify-center bg-black">
                        <div className="text-white text-lg text-center">
                          <p>Error al cargar el video</p>
                          <p className="text-sm text-gray-400 mt-2">URL: {link}</p>
                        </div>
                      </div>
                    )
                  }
                } else {
                  return (
                    <Image
                      src={selectedProject.gallery[currentModalImage] || "/placeholder.svg"}
                      alt={`${selectedProject.title} ${currentModalImage + 1}`}
                      fill
                      className="object-contain bg-white"
                    />
                  )
                }
              })()}

              {/* Navigation Arrows */}
              {selectedProject.gallery.length + selectedProject.videos.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator */}
            {selectedProject.gallery.length + selectedProject.videos.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: selectedProject.gallery.length + selectedProject.videos.length }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentModalImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentModalImage ? "bg-[#FCDD2F] scale-125" : "bg-gray-300 hover:bg-[#FFD700]"
                      }`}
                    />
                  ),
                )}
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              {currentModalImage < selectedProject.gallery.length
                ? `Imagen ${currentModalImage + 1} de ${selectedProject.gallery.length + selectedProject.videos.length} total`
                : `Video ${currentModalImage - selectedProject.gallery.length + 1} de ${selectedProject.videos.length} | ${selectedProject.gallery.length + selectedProject.videos.length} elementos total`}
            </p>
            {currentModalImage >= selectedProject.gallery.length && (
              <>
                <p className="text-[#FCDD2F] text-sm mt-2 font-medium">
                  {selectedProject.videos[currentModalImage - selectedProject.gallery.length]?.title || ""}
                </p>
                <p className="text-[#FCDD2F]/70 text-xs mt-1 font-medium">
                  🎬 Reproduciendo desde Vimeo
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}