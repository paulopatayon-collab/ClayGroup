"use client"

import { useEffect, useRef } from "react"

export function SpotlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 3
    let targetX = mouseX
    let targetY = mouseY

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      // Smooth follow
      mouseX += (targetX - mouseX) * 0.1
      mouseY += (targetY - mouseY) * 0.1

      // Clear canvas
      ctx.fillStyle = "rgb(0, 0, 0)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create radial gradient (spotlight effect)
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        canvas.width * 0.4
      )

      gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
      gradient.addColorStop(0.3, "rgba(200, 200, 200, 0.08)")
      gradient.addColorStop(0.6, "rgba(100, 100, 100, 0.03)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      // Draw spotlight
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
