"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MeshGradient } from "@paper-design/shaders-react"
import { Playfair_Display } from "next/font/google"
import { SpotlightBackground } from "@/components/ui/spotlight-background"
import { ShowcaseColumns } from "@/components/ui/showcase-columns"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"]
})

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      // Calculate progress from 0 to 1 over 2 screen heights
      const progress = Math.min(scrollPosition / (windowHeight * 2), 1)
      setScrollProgress(progress)
    }

    // Add scroll listener with passive flag for better mobile performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Also listen to touchmove for iOS
    window.addEventListener("touchmove", handleScroll, { passive: true })
    // Initial call
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("touchmove", handleScroll)
    }
  }, [])

  // Interpolate colors from original to black based on scroll
  const getColor = (originalColor: string, progress: number) => {
    const hex = originalColor.replace("#", "")
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    
    const newR = Math.round(r * (1 - progress))
    const newG = Math.round(g * (1 - progress))
    const newB = Math.round(b * (1 - progress))
    
    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
  }

  const colors = [
    getColor("#1E104E", scrollProgress),
    getColor("#2a1a5e", scrollProgress),
    getColor("#3d2a7a", scrollProgress),
    getColor("#FFC300", scrollProgress),
  ]

  // Calculate zoom and fade for different elements
  const logoScale = 1 + scrollProgress * 3 // Zoom from 1x to 4x
  const logoOpacity = scrollProgress < 0.7 ? 1 : 1 - ((scrollProgress - 0.7) / 0.3)
  const textOpacity = Math.max(0, 1 - scrollProgress * 2) // Text fades out quickly
  
  // Radial gradient blackout - starts small in center, grows outward
  const radialSize = scrollProgress * 150 // Grows from 0% to 150%
  const radialOpacity = Math.pow(scrollProgress, 0.8) // Smooth fade in

  return (
    <div className="relative bg-black">
      {/* Hero Section with Shader */}
      <section className="sticky top-0 h-screen overflow-hidden">
        {/* Animated CSS Gradient - Swirling effect for all devices */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, ${getColor("#FFC300", scrollProgress * 0.4)} 0%, transparent 40%),
              radial-gradient(ellipse at 70% 60%, ${getColor("#3d2a7a", scrollProgress * 0.4)} 0%, transparent 40%),
              radial-gradient(ellipse at 50% 80%, ${getColor("#2a1a5e", scrollProgress * 0.5)} 0%, transparent 50%),
              linear-gradient(135deg, 
                ${getColor("#1E104E", scrollProgress)} 0%, 
                ${getColor("#2a1a5e", scrollProgress)} 25%,
                ${getColor("#3d2a7a", scrollProgress)} 50%,
                ${getColor("#5a4595", scrollProgress)} 75%,
                ${getColor("#FFC300", scrollProgress)} 100%)
            `,
            backgroundSize: '150% 150%, 150% 150%, 150% 150%, 300% 300%',
            animation: 'swirl 15s ease-in-out infinite, gradientShift 20s ease infinite',
            opacity: scrollProgress < 1 ? 1 - scrollProgress : 0
          }}
        />
        
        {/* Shader Background - Will work on desktop, fallback to CSS on mobile */}
        <div className="absolute inset-0">
          <MeshGradient
            className="w-full h-full"
            colors={colors}
            speed={1.0}
          />
        </div>
        
        {/* Content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
          {/* Logo - Zooms in */}
          <div 
            className="mb-2 transition-transform duration-100 ease-out"
            style={{ 
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              willChange: 'transform, opacity'
            }}
          >
            <Image
              src="/logo.png"
              alt="Clay Group Logo"
              width={280}
              height={280}
              priority
              className="drop-shadow-2xl"
            />
          </div>
          
          {/* Text - Fades out quickly */}
          <div 
            className="transition-opacity duration-300"
            style={{ 
              opacity: textOpacity,
              willChange: 'opacity'
            }}
          >
            {/* Clay Group */}
            <h2 className={`${playfair.className} text-5xl md:text-6xl font-black text-white mb-2 tracking-wider drop-shadow-2xl italic`}>
              Clay Group
            </h2>
            
            {/* Make it Better */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wide drop-shadow-lg">
              Make it Better
            </h1>
            
            {/* Subheading */}
            <p className="text-base md:text-lg text-white/90 max-w-3xl leading-relaxed drop-shadow-md font-light">
              No business problem should be left unsolved. Connect your business<br />
              to great solutions for a better and sustainable future, now!
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce transition-opacity duration-300"
          style={{ opacity: textOpacity }}
        >
          <svg className="w-6 h-6 text-white/60" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        {/* Radial gradient blackout from center - grows like a circle */}
        <div 
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(0,0,0,${radialOpacity}) 0%, 
              rgba(0,0,0,${radialOpacity * 0.95}) ${Math.max(0, radialSize - 40)}%, 
              rgba(0,0,0,${radialOpacity * 0.8}) ${Math.max(0, radialSize - 20)}%, 
              rgba(0,0,0,${radialOpacity * 0.5}) ${radialSize}%, 
              rgba(0,0,0,${radialOpacity * 0.2}) ${radialSize + 10}%, 
              transparent ${radialSize + 30}%)`,
            opacity: scrollProgress > 0.2 ? 1 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        />
      </section>

      {/* Spacer for scroll - pure black */}
      <div className="h-[100vh] bg-black"></div>

      {/* About Us Section */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Futuristic Grid Background */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 195, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 195, 0, 0.03) 1px, transparent 1px),
              linear-gradient(rgba(255, 195, 0, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 195, 0, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
            backgroundPosition: '0 0, 0 0, 0 0, 0 0',
            animation: 'fadeInGrid 2s ease-out forwards, gridMove 20s linear infinite'
          }}
        />

        {/* Spotlight Background */}
        <div className="absolute inset-0">
          <SpotlightBackground />
        </div>

        {/* Subtle Circuit Lines */}
        <div 
          className="absolute inset-0 opacity-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255, 195, 0, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255, 195, 0, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 195, 0, 0.03) 0%, transparent 60%)
            `,
            animation: 'fadeInGrid 2.5s ease-out 0.5s forwards'
          }}
        />

        {/* About Us Content - Moved to top */}
        <div className="relative z-10 px-8 pt-32">
          <div 
            className="text-center max-w-6xl mx-auto opacity-0"
            style={{
              animation: 'fadeInUp 1.5s ease-out 1s forwards'
            }}
          >
            {/* About Us Title */}
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12">About Us</h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-20">
              We are a team of passionate professionals committed to delivering quality, innovation, and value.<br />
              Our mission is to help businesses grow and create a positive impact.
            </p>

            {/* Three Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {/* Our People */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-[#FFC300]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our People</h3>
                <div className="w-12 h-0.5 bg-[#FFC300] mx-auto mb-4"></div>
                <p className="text-white/70 leading-relaxed">
                  Talented individuals working together towards a common goal.
                </p>
              </div>

              {/* Our Values */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-[#FFC300]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Values</h3>
                <div className="w-12 h-0.5 bg-[#FFC300] mx-auto mb-4"></div>
                <p className="text-white/70 leading-relaxed">
                  Integrity, innovation, and commitment in everything we do.
                </p>
              </div>

              {/* Our Mission */}
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <svg className="w-16 h-16 text-[#FFC300]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                <div className="w-12 h-0.5 bg-[#FFC300] mx-auto mb-4"></div>
                <p className="text-white/70 leading-relaxed">
                  To empower businesses with smart and sustainable solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <ShowcaseColumns />

    </div>
  )
}
