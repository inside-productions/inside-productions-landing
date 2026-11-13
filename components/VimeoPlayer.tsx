"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"

interface VimeoPlayerProps {
  videoId: string
  title?: string
  className?: string
}

const SEEK_SECONDS = 5

declare global {
  interface Window {
    Vimeo: any
  }
}

export function VimeoPlayer({ videoId, title = "Video", className = "" }: VimeoPlayerProps) {
  const volumeInputId = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideVolumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitializingRef = useRef(false)
  const volumeBeforeMuteRef = useRef(1)
  const fillContainer = /\bh-full\b/.test(className)

  const openVolumeSlider = () => {
    if (hideVolumeTimeoutRef.current) {
      clearTimeout(hideVolumeTimeoutRef.current)
      hideVolumeTimeoutRef.current = null
    }
    setShowVolumeSlider(true)
  }

  const scheduleHideVolumeSlider = () => {
    if (hideVolumeTimeoutRef.current) {
      clearTimeout(hideVolumeTimeoutRef.current)
    }
    hideVolumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
      hideVolumeTimeoutRef.current = null
    }, 1000)
  }

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

  // Fullscreen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      const active =
        document.fullscreenElement === wrapperRef.current ||
        // @ts-expect-error webkit prefix
        document.webkitFullscreenElement === wrapperRef.current
      setIsFullscreen(Boolean(active))
    }

    document.addEventListener("fullscreenchange", onFullscreenChange)
    document.addEventListener("webkitfullscreenchange", onFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange)
    }
  }, [])

  // Keyboard: ← / → seek when this player is active
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current || !isLoaded) return

      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return
      }

      const wrapper = wrapperRef.current
      const focusedInside = Boolean(wrapper?.contains(document.activeElement))
      const isActive = isHovered || isFullscreen || focusedInside
      if (!isActive) return

      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return

      e.preventDefault()
      e.stopPropagation()

      const delta = e.key === "ArrowRight" ? SEEK_SECONDS : -SEEK_SECONDS
      void (async () => {
        try {
          const current = await playerRef.current.getCurrentTime()
          const duration = await playerRef.current.getDuration()
          const next = Math.min(duration, Math.max(0, current + delta))
          await playerRef.current.setCurrentTime(next)
          setShowControls(true)
        } catch (error) {
          console.error("Error seeking video:", error)
        }
      })()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isLoaded, isHovered, isFullscreen])

  // Separate effect to initialize player
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !videoId || isInitializingRef.current) {
      return
    }

    const initializePlayer = async () => {
      isInitializingRef.current = true
      
      try {
        if (playerRef.current) {
          try {
            playerRef.current.destroy()
          } catch (e) {
            console.log("Error destroying player:", e)
          }
          playerRef.current = null
        }

        setIsPlaying(false)
        setIsLoaded(false)
        setShowControls(true)
        setIsMuted(false)
        setVolume(1)

        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current)
          hideControlsTimeoutRef.current = null
        }

        await new Promise(resolve => setTimeout(resolve, 100))

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

        playerRef.current.on("play", () => {
          setIsPlaying(true)
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

        playerRef.current.on("volumechange", ({ volume: v }: { volume: number }) => {
          setVolume(v)
          setIsMuted(v === 0)
        })

        playerRef.current.on("error", (error: any) => {
          console.error("Vimeo player error:", error)
          setIsLoaded(false)
          setIsPlaying(false)
          setShowControls(true)
        })

        await playerRef.current.ready()
        
        setIsLoaded(true)
        
        try {
          const currentVolume = await playerRef.current.getVolume()
          setVolume(currentVolume)
          setIsMuted(currentVolume === 0)
          volumeBeforeMuteRef.current = currentVolume > 0 ? currentVolume : 1
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
      if (hideVolumeTimeoutRef.current) {
        clearTimeout(hideVolumeTimeoutRef.current)
        hideVolumeTimeoutRef.current = null
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
      setIsPlaying(false)
      setShowControls(true)
    }
  }
  
  const toggleMute = async () => {
    if (!playerRef.current) return
    
    try {
      const currentVolume = await playerRef.current.getVolume()
      
      if (currentVolume > 0) {
        volumeBeforeMuteRef.current = currentVolume
        await playerRef.current.setVolume(0)
        setVolume(0)
        setIsMuted(true)
      } else {
        const volumeToSet = volumeBeforeMuteRef.current || 1
        await playerRef.current.setVolume(volumeToSet)
        setVolume(volumeToSet)
        setIsMuted(false)
      }
    } catch (error) {
      console.error("Error controlling video volume:", error)
    }
  }

  const handleVolumeChange = async (next: number) => {
    if (!playerRef.current) return
    const clamped = Math.min(1, Math.max(0, next))
    try {
      await playerRef.current.setVolume(clamped)
      setVolume(clamped)
      setIsMuted(clamped === 0)
      if (clamped > 0) {
        volumeBeforeMuteRef.current = clamped
      }
    } catch (error) {
      console.error("Error setting volume:", error)
    }
  }

  const toggleFullscreen = async () => {
    const el = wrapperRef.current
    if (!el) return

    try {
      const isActive =
        document.fullscreenElement === el ||
        // @ts-expect-error webkit prefix
        document.webkitFullscreenElement === el

      if (!isActive) {
        if (el.requestFullscreen) {
          await el.requestFullscreen()
        } else if ((el as any).webkitRequestFullscreen) {
          await (el as any).webkitRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShowControls(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!showVolumeSlider && isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2000)
    }
  }

  const handleContainerClick = () => {
    wrapperRef.current?.focus({ preventScroll: true })
    togglePlay()
  }

  return (
    <div 
      ref={wrapperRef}
      tabIndex={0}
      className={`relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl outline-none ${
        fillContainer ? "h-full" : "aspect-[16/9]"
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setShowControls(true)}
      onClick={handleContainerClick}
      style={{
        cursor: "pointer",
        maxHeight: isFullscreen || fillContainer ? "100%" : "675px",
      }}
      aria-label={`${title}. Usa las flechas izquierda y derecha para retroceder o adelantar.`}
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
            aria-label="Reproducir"
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
              aria-label="Pausar"
            >
              <Pause className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
      
      {/* Volume control — top right */}
      <div
        className="absolute top-4 right-4 z-20 flex items-center"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={openVolumeSlider}
        onMouseLeave={scheduleHideVolumeSlider}
      >
        <div
          className={`flex items-center mr-2 px-3 py-2 rounded-lg bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
            showVolumeSlider ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <label className="sr-only" htmlFor={volumeInputId}>
            Volumen
          </label>
          <input
            id={volumeInputId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(volume * 100)}
            onChange={(e) => handleVolumeChange(Number(e.target.value) / 100)}
            onFocus={openVolumeSlider}
            onBlur={scheduleHideVolumeSlider}
            className="w-24 h-1.5 accent-neutral-300 cursor-pointer"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(volume * 100)}
            aria-label="Volumen del video"
          />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          onTouchStart={openVolumeSlider}
          className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          title={isMuted ? "Activar sonido" : "Silenciar"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Fullscreen — bottom right */}
      <div
        className="absolute bottom-4 right-4 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleFullscreen()
          }}
          className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5" />
          ) : (
            <Maximize className="w-5 h-5" />
          )}
        </button>
      </div>

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
        <div className="absolute bottom-4 left-4 right-24">
          <h3 className="text-white text-lg font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}
