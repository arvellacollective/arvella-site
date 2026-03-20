"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"

type Product = {
  id: string
  slug: string
  title: string
  price: string
  image: string
  image2?: string
  images?: string[]
  gallery?: string[]
  comparePrice?: string
  shipping?: string
}

const TRANSITION_KEY = "arvella_transition"

export default function ProductCard({
  product,
  variant = "default"
}: {
  product: Product
  variant?: "default" | "hero"
}) {
  const imageRef = useRef<HTMLDivElement>(null)
  const mainImgRef = useRef<HTMLImageElement | null>(null)

  const isHero = variant === "hero"

  const handleClick = () => {
    if (!imageRef.current || !product) return

    const rect = imageRef.current.getBoundingClientRect()

    sessionStorage.setItem(
      TRANSITION_KEY,
      JSON.stringify({
        slug: product.slug,
        image: product.image,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      })
    )
  }

  const galleryImages =
    product?.gallery?.length
      ? product.gallery
      : product?.images?.length
      ? product.images
      : product?.image2
      ? [product.image, product.image2]
      : [product.image || "/placeholder.png"]

  const mainImage = galleryImages[0]
  const hoverImage = galleryImages[1] || null

  return (
    <Link
      href={`/shop/${product?.slug || "#"}`}
      className="group block w-full"
      onClick={handleClick}
    >
      <div className="relative">

        {/* IMAGE WRAPPER */}
        <div
          data-tilt
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()

            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const clamp = (val: number, min: number, max: number) =>
              Math.max(min, Math.min(max, val))

            const rotateX = clamp(-(y - centerY) / 60, -2.5, 2.5)
            const rotateY = clamp(-(x - centerX) / 60, -2.5, 2.5)

            const shadowX = (x - centerX) / 18
            const shadowY = (y - centerY) / 18

            e.currentTarget.style.transform = `
              perspective(1000px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              scale(${isHero ? 1.02 : 1.015})
              translateY(-2px)
            `

            e.currentTarget.style.boxShadow = `
              ${-shadowX}px ${12 + shadowY}px ${isHero ? "40px" : "32px"} rgba(0,0,0,0.16),
              0 18px ${isHero ? "48px" : "40px"} rgba(0,0,0,0.10)
            `
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `
              perspective(1000px)
              rotateX(0deg)
              rotateY(0deg)
              scale(1)
              translateY(0)
            `

            e.currentTarget.style.boxShadow =
              "0 10px 25px rgba(0,0,0,0.08)"
          }}
          className="
            w-full
            transition-[transform,box-shadow]
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            transform-gpu
            will-change-transform
          "
        >
          {/* IMAGE */}
          <div
            ref={imageRef}
            className={`
              relative
              w-full
              overflow-hidden
              bg-neutral-100
              ${isHero ? "aspect-[4/5]" : "aspect-[4/5]"}
            `}
          >
            <Image
              ref={mainImgRef}
              src={mainImage}
              alt={product?.title || "Product"}
              fill
              className={`
                object-cover
                transition-transform
                duration-300
                ease-out
                ${isHero ? "group-hover:scale-[1.05]" : "group-hover:scale-[1.03]"}
              `}
            />

            {hoverImage && (
              <Image
                src={hoverImage}
                alt="hover"
                fill
                className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              />
            )}

            {/* GRADIENT */}
            <div className={`
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              ${isHero ? "from-black/40 via-black/10" : "from-black/30 via-black/10"}
              to-transparent
              opacity-80
              transition-opacity
              duration-500
              group-hover:opacity-95
            `} />
          </div>
        </div>

        {/* TEXT */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            pb-6
            text-center
            transition-transform
            duration-300
            ease-out
          "
        >
          <div
            className={`
              ${isHero ? "space-y-2" : "space-y-1.5"}
            `}
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}
          >
            <h3 className={`
              text-white
              font-medium
              tracking-[0.12em]
              ${isHero ? "text-[18px]" : "text-[15.5px]"}
            `}>
              {product?.title || "Product"}
            </h3>

            <div>
              <span className={`
                text-white
                font-semibold
                tracking-[0.02em]
                ${isHero ? "text-[24px]" : "text-[21px]"}
              `}>
                {product?.price || ""}
              </span>
            </div>

            {product?.shipping && (
              <div className="pt-1">
                <span className="
                  inline-block
                  mt-1
                  px-3
                  py-[4px]
                  text-[10px]
                  tracking-[0.14em]
                  uppercase
                  text-[#5FAF92]
                  bg-[#EAF7F1]/80
                  backdrop-blur-sm
                  rounded-full
                ">
                  {product.shipping}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}