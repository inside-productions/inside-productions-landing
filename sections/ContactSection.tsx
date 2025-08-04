"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Textarea } from "@/components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select"
import { Send, Loader2 } from "lucide-react"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  })

  // Optimizamos las funciones de manejo de cambios con useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSelectChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', projectType: '', message: '' })
        
        // Resetear después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Error al enviar el mensaje')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])
  // Usamos un useEffect para renderizar las partículas solo una vez al cargar
  const [particlesRendered, setParticlesRendered] = useState(false)
  
  useEffect(() => {
    // Solo renderizamos las partículas una vez
    if (!particlesRendered) {
      setParticlesRendered(true)
    }
  }, [particlesRendered])

  return (
    <section id="contact" className="h-screen py-20 bg-black text-white relative overflow-hidden flex items-center">
      {/* Static sparks constellation - solo se renderiza una vez */}
      <div className="absolute inset-0 overflow-hidden">
        {particlesRendered && (
          <div className="particles-container" style={{ pointerEvents: 'none' }}>
            <AnimatedParticles 
              count={60} // Reducimos la cantidad para mejorar el rendimiento
              className="animate-float-gentle opacity-40" 
              sizeRange={[2, 8]}
              animationRange={[15, 25]} // Animación más lenta
              delayRange={[0, 0]} // Sin delay aleatorio
              backgroundType="linear"
            />
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-center mb-16 animate-slide-up font-heading">
          CONTACTO
        </h2>
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-[#FCDD2F] text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold tracking-wide mb-4 font-heading">¡Mensaje Enviado!</h3>
              <p className="text-gray-300">Gracias por contactarnos. Te responderemos pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 glass-effect p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium mb-2 group-hover:text-[#FCDD2F] transition-colors duration-300">
                    Nombre
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F] transition-all duration-300 hover:shadow-lg"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium mb-2 group-hover:text-[#FCDD2F] transition-colors duration-300">
                    Correo
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F] transition-all duration-300 hover:shadow-lg"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium mb-2 group-hover:text-[#FCDD2F] transition-colors duration-300">
                  Tipo de Proyecto
                </label>
                <Select value={formData.projectType} onValueChange={handleSelectChange}>
                  <SelectTrigger className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F] transition-all duration-300 hover:shadow-lg">
                    <SelectValue placeholder="Selecciona el tipo de proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">Realidad Aumentada</SelectItem>
                    <SelectItem value="vr">Realidad Virtual</SelectItem>
                    <SelectItem value="mr">Realidad Mixta</SelectItem>
                    <SelectItem value="interactive">Experiencia Interactiva</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="group">
                <label className="block text-sm font-medium mb-2 group-hover:text-[#FCDD2F] transition-colors duration-300">
                  Mensaje
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-white/90 text-black border-gray-300 focus:border-[#FCDD2F] focus:ring-[#FCDD2F] transition-all duration-300 hover:shadow-lg"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black font-semibold py-4 text-lg rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FCDD2F]/50"
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
          )}
        </div>
      </div>
    </section>
  )
}