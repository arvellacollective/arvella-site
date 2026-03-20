"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

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
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const imageRef = useRef<HTMLDivElement | null>(null)
  const lightboxImageRef = useRef<HTMLDivElement | null>(null)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeImage = images[displayIndex]

  const changeImage = (index: number) => {
    if (index === displayIndex || isTransitioning) return

    setActiveIndex(index)
    setIsTransitioning(true)

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setDisplayIndex(index)
      setIsTransitioning(false)
    }, 180)
  }

  useEffect(() => {
    setMounted(true)
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // 🔥 MAIN ZOOM (güçlendirildi)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) return

    const el = imageRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.transformOrigin = `${x}% ${y}%`
    el.style.transform = "scale(1.12)"
  }

  const handleMouseLeave = () => {
    const el = imageRef.current
    if (!el) return

    el.style.transformOrigin = "center"
    el.style.transition = "transform 500ms ease"
    el.style.transform = "scale(1)"
  }

  // 🔥 LIGHTBOX ZOOM (güçlendirildi)
  const handleLightboxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lightboxImageRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    el.style.transformOrigin = `${x}% ${y}%`
    el.style.transform = "scale(1.50)"
  }

  const handleLightboxMouseLeave = () => {
    const el = lightboxImageRef.current
    if (!el) return

    el.style.transformOrigin = "center"
    el.style.transition = "transform 500ms ease"
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
      {/* GALLERY */}
      <div className="grid grid-cols-[90px_1fr] gap-6 w-full max-w-[760px] aspect-[4/5]">

        {/* THUMBNAILS */}
        <div
          className="grid h-full gap-3"
          style={{
            gridTemplateRows: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((img, index) => {
            const isActive = activeIndex === index

            return (
              <button
                key={`${img}-${index}`}
                onClick={() => changeImage(index)}
                className={`group relative h-full w-[90px] overflow-hidden rounded-[16px] border bg-white transition-all duration-300 ${
                  isActive
                    ? "border-black shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-[1.04]"
                />
              </button>
            )
          })}
        </div>

        {/* MAIN IMAGE */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[22px] bg-neutral-100 cursor-zoom-in"
          onClick={openLightbox}
        >
          {activeImage && (
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <Image
                key={displayIndex}
                src={activeImage}
                alt={title}
                fill
                className={`object-cover transition-all duration-300 ${
                  isTransitioning
                    ? "opacity-0 blur-[6px]"
                    : "opacity-100 blur-0"
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* 🔥 LIGHTBOX */}
      {mounted &&
        isOpen &&
        activeImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center"
            onMouseDown={closeLightbox}
          >
            {/* CLOSE */}
            <button
              className="absolute top-6 right-8 text-3xl text-white z-[999999]"
              onMouseDown={closeLightbox}
            >
              ✕
            </button>

            {/* IMAGE */}
            <div
              className="relative w-[85vw] h-[75vh] max-w-4xl overflow-hidden"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div
                ref={lightboxImageRef}
                onMouseMove={handleLightboxMouseMove}
                onMouseLeave={handleLightboxMouseLeave}
                className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <Image
                  src={activeImage}
                  alt={title}
                  fill
                  className="object-contain brightness-[1.02] contrast-[1.03]"
                />
              </div>

              {/* 🔥 THUMB SLIDER (ETSY STYLE) */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {images.map((img, index) => {
                  const isActive = activeIndex === index

                  return (
                    <button
                      key={`lightbox-thumb-${index}`}
                      onClick={() => changeImage(index)}
                      className={`relative h-[70px] w-[56px] overflow-hidden rounded-lg border transition ${
                        isActive
                          ? "border-white"
                          : "border-white/30 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}