"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type Props = {
  title: string
  image: string
  gallery?: string[]
}

export default function ProductGallery({ title, image, gallery }: Props) {
  const images = [image, ...(gallery || [])].filter(
    (img) => typeof img === "string" && img.trim() !== ""
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const imageRef = useRef<HTMLDivElement | null>(null)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const activeImage = images[activeIndex]

  const changeImage = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  useEffect(() => {
    if (!isOpen || !sliderRef.current) return

    const container = sliderRef.current
    const activeThumb = container.children[activeIndex] as HTMLElement | undefined
    if (!activeThumb) return

    const offset =
      activeThumb.offsetLeft -
      container.clientWidth / 2 +
      activeThumb.clientWidth / 2

    container.scrollTo({
      left: Math.max(0, offset),
      behavior: "smooth",
    })
  }, [activeIndex, isOpen])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) return

    const el = imageRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.transformOrigin = `${x}% ${y}%`
    el.style.transform = "scale(1.8)"
  }

  const handleMouseLeave = () => {
    const el = imageRef.current
    if (!el) return

    el.style.transformOrigin = "center"
    el.style.transform = "scale(1)"
  }

  const openLightbox = () => {
    const el = imageRef.current
    if (el) {
      el.style.transform = "scale(1)"
      el.style.transformOrigin = "center"
    }

    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-[90px_1fr] gap-6 w-full max-w-[760px] aspect-[4/5]">
        <div
          className="grid h-full gap-3"
          style={{
            gridTemplateRows: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((img, index) => (
            <button
              key={`${img}-${index}`}
              onClick={() => changeImage(index)}
              className={`relative w-[90px] h-full overflow-hidden rounded-md border transition group cursor-zoom-in ${
                activeIndex === index
                  ? "border-black"
                  : "border-neutral-300 hover:border-neutral-500"
              }`}
              type="button"
            >
              <Image
                src={img}
                alt={title}
                fill
                unoptimized
                sizes="90px"
                className="object-cover transition duration-300 group-hover:scale-110"
              />
            </button>
          ))}
        </div>

        <div
          className="relative w-full h-full overflow-hidden rounded-lg bg-neutral-100 cursor-zoom-in"
          onClick={openLightbox}
        >
          {activeImage && (
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-0 transition-transform duration-300"
            >
              <Image
                key={activeIndex}
                src={activeImage}
                alt={title}
                fill
                unoptimized
                priority
                sizes="(max-width:768px) 100vw, 720px"
                className={`object-cover select-none pointer-events-none ${
                  direction === 1 ? "animate-slide-left" : ""
                } ${direction === -1 ? "animate-slide-right" : ""}`}
              />
            </div>
          )}
        </div>
      </div>

      {isOpen && activeImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8 animate-lightbox-in">
          <button
            className="absolute top-6 right-8 text-white text-3xl hover:opacity-70 transition"
            onClick={closeLightbox}
            type="button"
          >
            ✕
          </button>

          <div className="relative w-[80vw] max-w-5xl h-[70vh] overflow-hidden">
            <Image
              key={`lightbox-${activeIndex}`}
              src={activeImage}
              alt={title}
              fill
              unoptimized
              className={`object-contain ${
                direction === 1 ? "animate-slide-left" : ""
              } ${direction === -1 ? "animate-slide-right" : ""}`}
            />
          </div>

          <div className="w-full flex justify-center">
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto px-8 pb-6 max-w-4xl"
            >
              {images.map((img, index) => (
                <button
                  key={`lightbox-thumb-${img}-${index}`}
                  onClick={() => changeImage(index)}
                  className={`relative w-[80px] h-[100px] flex-shrink-0 overflow-hidden rounded-md border ${
                    activeIndex === index
                      ? "border-white"
                      : "border-neutral-600 hover:border-white"
                  }`}
                  type="button"
                >
                  <Image
                    src={img}
                    alt={title}
                    fill
                    unoptimized
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}