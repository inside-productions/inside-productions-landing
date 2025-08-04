"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import teamMembersData from "@/data/teamMembers.json"

interface TeamMember {
  id: number
  name: string
  position: string
  description: string
  image: string
}

interface TeamModalProps {
  showTeamModal: boolean
  closeModals: () => void
}

export default function TeamModal({ showTeamModal, closeModals }: TeamModalProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    setTeamMembers(teamMembersData)
  }, [])
  if (!showTeamModal) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={closeModals}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModals}
          className="absolute top-4 right-4 bg-[#FCDD2F] hover:bg-[#FCDD2F]/90 text-black p-2 rounded-full transition-all duration-300 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-8">
          <h3 className="text-3xl font-bold tracking-wider text-center mb-8 text-black font-heading">
            NUESTRO EQUIPO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-black mb-2 font-heading">{member.name}</h4>
                <p className="text-[#FCDD2F] font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}