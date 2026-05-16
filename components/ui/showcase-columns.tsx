"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const showcaseItems = [
  {
    image: "/showcase/clay1.png",
    title: "Clay Builders",
    category: "Construction & Development",
  },
  {
    image: "/showcase/clay2.jpg",
    title: "Clay Technologies",
    category: "Tech Solutions",
  },
  {
    image: "/showcase/clay3.png",
    title: "Clay Group",
    category: "Business Solutions",
  },
  {
    image: "/showcase/clay4.png",
    title: "Clay Builders",
    category: "Infrastructure",
  },
  {
    image: "/showcase/clay5.jpg",
    title: "Clay Technologies",
    category: "Digital Innovation",
  },
  {
    image: "/showcase/clay6.jpg",
    title: "Clay Group",
    category: "Enterprise Solutions",
  },
  {
    image: "/showcase/clay7.png",
    title: "Clay Builders",
    category: "Project Development",
  },
  {
    image: "/showcase/clay8.jpg",
    title: "Clay Technologies",
    category: "Smart Systems",
  },
  {
    image: "/showcase/clay9.png",
    title: "Clay Group",
    category: "Sustainable Future",
  },
  {
    image: "/showcase/clay10.png",
    title: "Clay Builders",
    category: "Modern Construction",
  },
  {
    image: "/showcase/clay11.jpg",
    title: "Clay Technologies",
    category: "Innovation Hub",
  },
]

// Split into 3 columns
const col1 = showcaseItems.filter((_, i) => i % 3 === 0)
const col2 = showcaseItems.filter((_, i) => i % 3 === 1)
const col3 = showcaseItems.filter((_, i) => i % 3 === 2)

function ScrollColumn({
  items,
  direction = "up",
  speed = 30,
}: {
  items: typeof showcaseItems
  direction?: "up" | "down"
  speed?: number
}) {
  const columnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const column = columnRef.current
    if (!column) return

    let animationId: number
    let position = direction === "down" ? -column.scrollHeight / 2 : 0

    const animate = () => {
      if (direction === "up") {
        position -= 0.5
        if (position <= -column.scrollHeight / 2) position = 0
      } else {
        position += 0.5
        if (position >= 0) position = -column.scrollHeight / 2
      }
      column.style.transform = `translateY(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction])

  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden h-full">
      <div ref={columnRef} className="flex flex-col gap-4">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden border border-white/10 group flex-shrink-0"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ShowcaseColumns() {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 text-center mb-16 px-8">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Showcase
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          A glimpse into the projects and solutions delivered by Clay Builders and Clay Technologies.
        </p>
      </div>

      {/* Scrolling Columns */}
      <div className="relative z-0 grid grid-cols-3 gap-4 px-4 md:px-8 h-[600px]">
        <ScrollColumn items={col1} direction="up" />
        <ScrollColumn items={col2} direction="down" />
        <ScrollColumn items={col3} direction="up" />
      </div>
    </section>
  )
}
