/** Smooth-scroll so the Demo Reel player is optically centered below the fixed header. */
export function scrollToDemoReel() {
  const el =
    document.getElementById("demo-reel-player") ?? document.getElementById("video")
  if (!el) return

  const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 80 : 72
  const rect = el.getBoundingClientRect()
  const elementCenter = window.scrollY + rect.top + rect.height / 2
  const visibleCenter = headerOffset + (window.innerHeight - headerOffset) / 2

  window.scrollTo({
    top: Math.max(0, elementCenter - visibleCenter),
    behavior: "smooth",
  })
}
