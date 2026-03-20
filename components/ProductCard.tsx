"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"

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

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const [transform, setTransform] = useState("")

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 4
    const rotateY = ((x - centerX) / centerX) * -4

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    )
  }

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)")
  }

  // 🔥 EN ÖNEMLİ KISIM
  const handleClick = () => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()

    const data = {
      slug: product.slug,
      image: product.image,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }

    sessionStorage.setItem(TRANSITION_KEY, JSON.stringify(data))
  }

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.images && product.images.length > 0
      ? product.images
      : product.image2
      ? [product.image, product.image2]
      : [product.image]

  const mainImage = galleryImages[0] || product.image
  const hoverImage = galleryImages[1] || null
  const shipping = product.shipping || "COMPLIMENTARY U.S. SHIPPING"

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block w-full"
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform }}
        className="w-full transition-transform duration-300 ease-out will-change-transform"
      >
        {/* IMAGE */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100"
        >
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-700 ${
              hoverImage
                ? "group-hover:opacity-0 group-hover:scale-110"
                : "group-hover:scale-110"
            }`}
          />

          {hoverImage && (
            <Image
              src={hoverImage}
              alt="hover"
              fill
              className="object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
            />
          )}
        </div>

        {/* TEXT */}
        <div className="mt-4">
          <h3 className="text-[15px]">{product.title}</h3>
          <p className="text-[14px]">{product.price}</p>
        </div>
      </div>
    </Link>
  )
}