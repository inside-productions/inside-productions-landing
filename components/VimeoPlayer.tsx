"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VimeoPlayerProps {
  videoId: string
  title?: string
  className?: string
}

declare global {
  interface Window {
    Vimeo: any
  }
}

export function VimeoPlayer({ videoId, title = "Video", className = "" }: VimeoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitializingRef = useRef(false)

  // Separate effect to load script
  useEffect(() => {
    const loadScript = () => {
      const existingScript = document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')
      
      if (existingScript || window.Vimeo) {
        setScriptLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://player.vimeo.com/api/player.js"
      script.async = true
      
      script.onload = () => {
        setScriptLoaded(true)
      }

      script.onerror = () => {
        console.error("Failed to load Vimeo Player script")
      }

      document.head.appendChild(script)
    }

    loadScript()
  }, [])

  // Separate effect to initialize player
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !videoId || isInitializingRef.current) {
      return
    }

    const initializePlayer = async () => {
      isInitializingRef.current = true
      
      try {
        // Destroy existing player
        if (playerRef.current) {
          try {
            playerRef.current.destroy()
          } catch (e) {
            console.log("Error destroying player:", e)
          }
          playerRef.current = null
        }

        // Reset states
        setIsPlaying(false)
        setIsLoaded(false)
        setShowControls(true)
        setIsMuted(false)

        // Clear any existing timeouts
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current)
          hideControlsTimeoutRef.current = null
        }

        // Wait a bit for cleanup
        await new Promise(resolve => setTimeout(resolve, 100))

        // Initialize new player
        if (!containerRef.current) return

        playerRef.current = new window.Vimeo.Player(containerRef.current, {
          id: videoId,
          width: "100%",
          height: "100%",
          responsive: true,
          controls: false,
          autoplay: false,
          muted: false,
          background: false,
        })

        // Set up event listeners
        playerRef.current.on("play", () => {
          setIsPlaying(true)
          // Hide controls after 3 seconds when playing starts
          if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current)
          }
          hideControlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false)
          }, 3000)
        })

        playerRef.current.on("pause", () => {
          setIsPlaying(false)
          setShowControls(true)
          if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current)
          }
        })

        playerRef.current.on("ended", () => {
          setIsPlaying(false)
          setShowControls(true)
          if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current)
          }
        })

        playerRef.current.on("error", (error: any) => {
          console.error("Vimeo player error:", error)
          setIsLoaded(false)
          setIsPlaying(false)
          setShowControls(true)
        })

        // Wait for player to be ready
        await playerRef.current.ready()
        
        setIsLoaded(true)
        
        // Check initial volume
        try {
          const volume = await playerRef.current.getVolume()
          setIsMuted(volume === 0)
        } catch (err) {
          console.error("Error getting initial volume:", err)
          setIsMuted(false)
        }

      } catch (error) {
        console.error("Error initializing player:", error)
        setIsLoaded(false)
        setIsPlaying(false)
        setShowControls(true)
      } finally {
        isInitializingRef.current = false
      }
    }

    initializePlayer()

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          console.log("Error in cleanup:", e)
        }
        playerRef.current = null
      }
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
        hideControlsTimeoutRef.current = null
      }
    }
  }, [scriptLoaded, videoId])

  const togglePlay = async () => {
    if (!playerRef.current || !isLoaded || isInitializingRef.current) {
      return
    }

    try {
      if (isPlaying) {
        await playerRef.current.pause()
      } else {
        await playerRef.current.play()
      }
    } catch (error) {
      console.error("Error controlling video playback:", error)
      // Reset state on error
      setIsPlaying(false)
      setShowControls(true)
    }
  }
  
  const toggleMute = async () => {
    if (!playerRef.current) return
    
    try {
      const currentVolume = await playerRef.current.getVolume()
      
      if (currentVolume > 0) {
        // Store current volume before muting
        playerRef.current._previousVolume = currentVolume
        await playerRef.current.setVolume(0)
        setIsMuted(true)
      } else {
        // Restore previous volume or default to 1
        const volumeToSet = playerRef.current._previousVolume || 1
        await playerRef.current.setVolume(volumeToSet)
        setIsMuted(false)
      }
    } catch (error) {
      console.error("Error controlling video volume:", error)
    }
  }

  const handleMouseEnter = () => {
    setShowControls(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (isPlaying) {
      // Hide controls after 2 seconds when mouse leaves
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2000)
    }
  }

  const handleContainerClick = () => {
    togglePlay()
  }

  return (
    <div 
      className={`relative w-full aspect-[16/9] bg-black rounded-2xl overflow-hidden shadow-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleContainerClick}
      style={{ cursor: 'pointer', maxHeight: '675px' }}
    >
      {/* Vimeo Player Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      
      {/* Custom Play Button Overlay - Only when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black p-6 rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-[#FCDD2F]/50 group"
          >
            <Play className="w-12 h-12 ml-1 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Pause Button on Hover - Only when playing and controls visible */}
      {isPlaying && showControls && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlay()
              }}
              className="bg-white/90 hover:bg-white text-black p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <Pause className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
      
      {/* Volume/Mute Button - Always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleMute()
        }}
        className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-20"
        aria-label={isMuted ? "Unmute" : "Mute"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-lg flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FCDD2F]"></div>
            <span>Cargando video...</span>
          </div>
        </div>
      )}

      {/* Video Title Overlay */}
      {title && (
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}