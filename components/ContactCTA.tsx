import Image from "next/image"
import Link from "next/link"

type ContactCTAProps = {
  variant?: "contact" | "vr"
}

export default function ContactCTA({ variant = "contact" }: ContactCTAProps) {
  if (variant === "vr") {
    const imageHolderClass =
      "relative w-44 sm:w-64 md:w-[22rem] lg:w-[30rem] aspect-[2.2/1] shrink-0 overflow-hidden bg-black/10 [clip-path:polygon(7%_0,100%_0,93%_100%,0_100%)]"

    return (
      <section className="bg-white pt-8 pb-6 md:pt-10 md:pb-8">
        <a
          href="https://www.viverse.com/es-ES/8iZUf73"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-stretch justify-between gap-0 w-full bg-[#FCDD2F] cursor-pointer transition-colors duration-300 hover:bg-[#e6c92a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black motion-reduce:transition-none"
        >
          <div className={imageHolderClass}>
            <Image
              src="/trouble-train.jpeg"
              alt="Trouble Train"
              fill
              className="object-cover translate-x-[20px] translate-y-[5px] scale-110"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 240px, (max-width: 1024px) 320px, 448px"
            />
          </div>
          <h2 className="flex-1 min-w-0 flex items-center justify-center text-center text-base sm:text-xl md:text-3xl lg:text-4xl text-black font-western leading-snug px-3 sm:px-5 md:px-8">
            ¡Juega aquí nuestro juego VR más reciente!
          </h2>
          {/* Misma huella en móvil para mantener el texto centrado */}
          <div className="w-44 aspect-[2.2/1] shrink-0 sm:hidden" aria-hidden="true" />
          <div className={`hidden sm:block ${imageHolderClass}`}>
            <Image
              src="/trouble-train.jpeg"
              alt="Trouble Train"
              fill
              className="object-cover translate-x-[20px] translate-y-[5px] scale-110"
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 320px, 448px"
            />
          </div>
        </a>
      </section>
    )
  }

  return (
    <section className="bg-white pt-2 pb-16 md:pt-4 md:pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link
          href="/contacto#contact"
          className="block bg-[#FCDD2F] p-8 rounded-2xl cursor-pointer transition-colors duration-300 hover:bg-[#e6c92a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
        >
          <h2 className="text-3xl font-bold mb-4 text-black font-heading text-center">
            Transforma tu empresa con tecnología inmersiva
          </h2>
          <p className="text-lg leading-relaxed text-black/80 text-center">
            Contáctanos y descubre cómo las <strong>experiencias interactivas</strong> pueden llevar tu negocio al siguiente nivel.
          </p>
        </Link>
      </div>
    </section>
  )
}
