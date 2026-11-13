"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"
import { Send, Loader2, ChevronDown, Calendar } from "lucide-react"

const PROJECT_OPTIONS = [
  { value: "ar", label: "Realidad Aumentada" },
  { value: "vr", label: "Realidad Virtual" },
  { value: "game", label: "Videojuego" },
  { value: "interactive", label: "Experiencia Interactiva" },
  { value: "other", label: "Otro" },
]

const CALENDAR_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3rWwaJUUL8QeEyFD-BWt4D8BUTrRDwt81RyIQrFVbNs_IUsiXNOAEo0q4P7OKhix6VzDZ7wFw3?gv=true"

interface ContactSectionProps {
  AnimatedParticles: React.ComponentType<{
    count: number
    className?: string
    sizeRange?: [number, number]
    animationRange?: [number, number]
    delayRange?: [number, number]
    backgroundType?: "linear" | "radial" | "conic"
  }>
}

export default function ContactSection({ AnimatedParticles }: ContactSectionProps) {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setFormData({ name: "", email: "", phone: "", projectType: "", message: "" })
          setStep(1)
        } else {
          throw new Error("Error al enviar el mensaje")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Error al enviar el mensaje. Por favor, intenta de nuevo.")
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  const [particlesRendered, setParticlesRendered] = useState(false)
  useEffect(() => {
    if (!particlesRendered) setParticlesRendered(true)
  }, [particlesRendered])

  // Permite abrir el paso de agenda directo (p. ej. /contacto#agenda)
  useEffect(() => {
    if (window.location.hash === "#agenda") {
      setStep(1)
    }
  }, [])

  const selectedLabel = PROJECT_OPTIONS.find((o) => o.value === formData.projectType)?.label

  // Paso 2: markup mínimo — sin particles, sin z-index, sin overflow, sin transform
  if (step === 1) {
    return (
      <section
        id="contact"
        className="min-h-screen pt-12 pb-20 md:pt-16 md:pb-24 bg-black text-white scroll-mt-[72px] md:scroll-mt-[80px]"
      >
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-10 md:mb-12 font-heading">
            COTIZA CON NOSOTROS
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6" aria-label="Progreso del formulario">
            <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-[#FCDD2F]/40 text-black">
              1
            </div>
            <div className="w-10 h-0.5 bg-[#FCDD2F]" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-[#FCDD2F] text-black">
              2
            </div>
          </div>

          <div className="text-center mb-6 space-y-2">
            <p className="text-[#FCDD2F] font-semibold text-sm tracking-wide">¡Mensaje enviado!</p>
            <h3 className="text-2xl md:text-3xl font-bold font-heading">Agenda una reunión con nuestro equipo</h3>
            <p className="text-white/70 text-sm md:text-base">
              Recibimos la información de tu proyecto. Selecciona una fecha y hora que prefieras para reunirnos, conocer tus requerimientos y preparar una cotización.
            </p>
          </div>

          {/* Fondo blanco + altura amplia para mostrar el calendario completo sin scroll interno */}
          <div
            className="w-full overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ colorScheme: "light" }}
          >
            {/* Google Calendar Appointment Scheduling begin */}
            <iframe
              src={CALENDAR_URL}
              style={{
                border: 0,
                width: "100%",
                height: 1100,
                background: "#ffffff",
                colorScheme: "light",
                pointerEvents: "auto",
                overflow: "hidden",
                display: "block",
              }}
              width="100%"
              height={1100}
              scrolling="no"
              frameBorder={0}
              title="Agendar cita con Inside Productions"
            />
            {/* end Google Calendar Appointment Scheduling */}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FCDD2F] hover:text-white text-sm font-medium"
            >
              <Calendar className="w-4 h-4" />
              Abrir en nueva pestaña
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="contact"
      className="min-h-screen pt-12 pb-20 md:pt-16 md:pb-24 bg-black text-white relative scroll-mt-[72px] md:scroll-mt-[80px]"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particlesRendered && (
          <AnimatedParticles
            count={40}
            className="animate-float-gentle opacity-30 pointer-events-none"
            sizeRange={[2, 8]}
            animationRange={[15, 25]}
            delayRange={[0, 0]}
            backgroundType="linear"
          />
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-10 md:mb-12 font-heading">
          COTIZA CON NOSOTROS
        </h2>

        <div className="flex items-center justify-center gap-3 mb-6" aria-label="Progreso del formulario">
          <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-[#FCDD2F] text-black">
            1
          </div>
          <div className="w-10 h-0.5 bg-white/20" />
          <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold bg-white/10 text-white/50">
            2
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 glass-effect p-6 md:p-8 rounded-2xl max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F]"
                placeholder="Tu nombre completo"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium mb-2">Correo</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F]"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-medium mb-2">Número de contacto</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F]"
                placeholder="+52 442 000 0000"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium mb-2">Tipo de Proyecto</label>
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full h-9 flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-white/90 text-black px-3 text-sm focus:outline-none focus:border-[#FCDD2F] focus:ring-2 focus:ring-[#FCDD2F]"
                >
                  <span className={selectedLabel ? "text-black" : "text-gray-400"}>
                    {selectedLabel ?? "Selecciona el tipo de proyecto"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <ul className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg overflow-hidden">
                    {PROJECT_OPTIONS.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, projectType: option.value }))
                          setDropdownOpen(false)
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer ${
                          formData.projectType === option.value
                            ? "bg-[#FCDD2F] text-black font-semibold"
                            : "text-black hover:bg-[#FCDD2F]/20"
                        }`}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F]"
              placeholder="Cuéntanos sobre tu proyecto..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold py-4 text-lg rounded-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
