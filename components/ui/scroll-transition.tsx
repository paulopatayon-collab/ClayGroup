"use client"

import { useEffect } from "react"

export function ScrollTransition() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const heroSection = document.querySelector(".transition-section") as HTMLElement
      const shaderWrapper = document.querySelector(".shader-wrapper") as HTMLElement
      const heroContent = document.querySelector(".hero-content") as HTMLElement

      if (!heroSection || !shaderWrapper || !heroContent) return

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollPosition / windowHeight, 1)

      // Apply zoom and fade effects
      const scale = 1 + scrollProgress * 0.3 // Zoom from 1 to 1.3
      const opacity = 1 - scrollProgress // Fade from 1 to 0
      const blur = scrollProgress * 10 // Blur from 0 to 10px

      shaderWrapper.style.transform = `scale(${scale})`
      shaderWrapper.style.opacity = opacity.toString()
      shaderWrapper.style.filter = `blur(${blur}px)`

      heroContent.style.opacity = opacity.toString()
      heroContent.style.transform = `scale(${scale})`
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return null
}
