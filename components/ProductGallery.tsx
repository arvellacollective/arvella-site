"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type Props = {
  title: string
  image: string
  gallery?: string[]
}

const TRANSITION_KEY = "arvella_transition"

export default function ProductGallery({ title, image, gallery }: Props) {
  const images = [image, ...(gallery || [])].filter(
    (img) => typeof img === "string" && img.trim() !== ""
  )

  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 🔥 NEW
  const [transitionData, setTransitionData] = useState<any>(null)

  const imageRef = useRef<HTMLDivElement | null>(null)
  const mainImageRef = useRef<HTMLDivElement | null>(null) // 🔥 NEW
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

  // 🔥 TRANSITION INIT
  useEffect(() => {
    const raw = sessionStorage.getItem(TRANSITION_KEY)
    if (!raw) return

    const data = JSON.parse(raw)

    const target = mainImageRef.current?.getBoundingClientRect()
    if (!target) return

    setTransitionData({
      ...data,
      targetX: target.left,
      targetY: target.top,
      targetW: target.width,
      targetH: target.height,
    })

    sessionStorage.removeItem(TRANSITION_KEY)
  }, [])

  // 🔥 ANIMATION TRIGGER
  useEffect(() => {
    if (!transitionData) return

    requestAnimationFrame(() => {
      const el = document.getElementById("arvella-transition")
      if (!el) return

      el.style.transform = `
        translate(${transitionData.targetX}px, ${transitionData.targetY}px)
        scale(${transitionData.targetW / transitionData.width})
      `
    })

    setTimeout(() => {
      setTransitionData(null)
    }, 650)
  }, [transitionData])

  // 🔥 MAIN ZOOM
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

  // 🔥 LIGHTBOX
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
      {/* 🔥 TRANSITION OVERLAY */}
      {transitionData && (
        <div
          id="arvella-transition"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: transitionData.width,
            height: transitionData.height,
            transform: `translate(${transitionData.x}px, ${transitionData.y}px) scale(1)`,
            transition: "all 650ms cubic-bezier(0.22,1,0.36,1)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          <Image
            src={transitionData.image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

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
          ref={mainImageRef}
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

      {/* LIGHTBOX (AYNI) */}
      {mounted &&
        isOpen &&
        activeImage &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] bg-black/95 flex items-center justify-center"
            onMouseDown={closeLightbox}
          >
            <button
              className="absolute top-6 right-8 text-3xl text-white z-[999999]"
              onMouseDown={closeLightbox}
            >
              ✕
            </button>

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

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl">
                {images.map((img, index) => {
                  const isActive = activeIndex === index

                  return (
                    <button
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`relative h-[70px] w-[56px] overflow-hidden rounded-lg border ${
                        isActive
                          ? "border-white"
                          : "border-white/30 opacity-70"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
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