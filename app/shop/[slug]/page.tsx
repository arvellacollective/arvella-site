"use client"

import ProductGallery from "@/components/ProductGallery"
import products from "@/data/products.json"
import { notFound } from "next/navigation"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"

type Props = {
  params: { slug: string }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params

  const productRecord = (products as any[]).find(
    (item) => item.product.slug === slug
  )

  if (!productRecord) {
    notFound()
  }

  const product = productRecord.product

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const sizes = ["S", "M", "L", "XL"]
  const colors = ["Black", "Brown", "Heather"]

  const isReady = Boolean(selectedSize && selectedColor)

  const selectionText = useMemo(() => {
    const parts = []
    if (selectedSize) parts.push(`Size ${selectedSize}`)
    if (selectedColor) parts.push(selectedColor)
    parts.push(`Qty ${quantity}`)
    return parts.join(" · ")
  }, [selectedSize, selectedColor, quantity])

  const numericPrice = useMemo(() => {
    const parsed = Number(String(product.price).replace(/[^0-9.]/g, ""))
    return Number.isFinite(parsed) ? parsed : 59
  }, [product.price])

  const comparePrice = useMemo(() => numericPrice + 19, [numericPrice])

  const etsyUrl = isReady
    ? `${product.url}?size=${encodeURIComponent(
        selectedSize as string
      )}&color=${encodeURIComponent(
        selectedColor as string
      )}&qty=${quantity}`
    : "#"

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 pt-23 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,760px)_minmax(380px,500px)] gap-10 lg:gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-24 self-start"
        >
          <ProductGallery
            title={product.title}
            image={product.image}
            gallery={product.gallery}
          />

          <div className="mt-5 rounded-[26px] border border-neutral-200 bg-white/90 px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-neutral-400">
                  Editorial detail
                </p>
                <p className="mt-3 text-[20px] leading-[1.25] tracking-[-0.02em] text-neutral-900">
                  Quiet presence. Sharp silhouette.
                </p>
              </div>

              <div className="hidden sm:block text-right">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                  Limited drop
                </p>
                <p className="mt-2 text-[13px] text-neutral-600">
                  Curated for elevated everyday wear.
                </p>
              </div>
            </div>

            <div className="mt-5 h-px w-full bg-neutral-200" />

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                  Concept
                </p>
                <p className="mt-2 text-[14px] leading-7 text-neutral-600">
                  A premium layer designed to feel clean, deliberate, and easy
                  to live in.
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-400">
                  Mood
                </p>
                <p className="mt-2 text-[14px] leading-7 text-neutral-600">
                  Minimal structure, softer energy, and a silhouette that feels
                  intentional without trying hard.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <div className="self-start">
            <div className="space-y-4 mb-6">
              <p className="text-[10px] uppercase tracking-[0.36em] text-neutral-400">
                Arvella Edition
              </p>

              <h1 className="text-[36px] leading-[1.02] md:text-[46px] font-semibold tracking-[-0.04em] text-neutral-950">
                {product.title}
              </h1>

              <p className="text-[12px] uppercase tracking-[0.28em] text-neutral-400">
                For those who move differently
              </p>
            </div>

            <div className="mt-7 border-t border-neutral-200 pt-6">
              <div className="flex items-end gap-3 flex-wrap">
                <p className="text-[17px] text-neutral-400 line-through">
                  ${comparePrice}
                </p>

                <p className="text-[30px] leading-none tracking-[-0.03em] text-neutral-900">
                  ${numericPrice}
                </p>

                <span className="inline-flex h-7 items-center rounded-full bg-neutral-900 px-3 text-[10px] uppercase tracking-[0.22em] text-white">
                  Limited release pricing
                </span>
              </div>

              <p className="mt-5 max-w-[48ch] text-[15px] leading-8 text-neutral-600">
                {product.description} Refined for a cleaner silhouette, quiet
                presence, and premium everyday wear that still feels special the
                moment it arrives.
              </p>
            </div>

            <div className="mt-10 rounded-[28px] border border-neutral-200 bg-white/92 p-6 md:p-7 shadow-[0_14px_40px_rgba(0,0,0,0.035)]">
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                      Size
                    </span>

                    {selectedSize && (
                      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                        Selected: {selectedSize}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2.5">
                    {sizes.map((size) => {
                      const active = selectedSize === size

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 rounded-full border text-[13px] transition-all duration-300 ${
                            active
                              ? "border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                              : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900 hover:scale-[1.01]"
                          }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                      Color
                    </span>

                    {selectedColor && (
                      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                        Selected: {selectedColor}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {colors.map((color) => {
                      const active = selectedColor === color

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`h-12 rounded-full border px-4 text-[13px] transition-all duration-300 ${
                            active
                              ? "border-black bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
                              : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900 hover:scale-[1.01]"
                          }`}
                        >
                          {color}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                      Quantity
                    </span>

                    <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                      Editable before checkout
                    </span>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-2 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[18px] text-neutral-700 transition hover:bg-neutral-100"
                    >
                      −
                    </button>

                    <span className="min-w-[42px] text-center text-[15px] font-medium text-neutral-900">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[18px] text-neutral-700 transition hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-6">
                <div className="mb-4 min-h-[20px]">
                  {isReady ? (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      {selectionText}
                    </p>
                  ) : (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                      Select size and color to continue
                    </p>
                  )}
                </div>

                <a
                  href={etsyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!isReady}
                  onClick={(e) => {
                    if (!isReady) e.preventDefault()
                  }}
                  className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[24px] border px-5 py-5 transition-all duration-300 ${
                    isReady
                      ? "border-[#F1641E]/40 bg-white hover:border-[#F1641E] hover:shadow-[0_18px_42px_rgba(0,0,0,0.09)]"
                      : "border-neutral-200 bg-neutral-100 opacity-70"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${
                      isReady ? "group-hover:opacity-100" : ""
                    }`}
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(241,100,30,0.04) 0%, rgba(241,100,30,0.00) 45%, rgba(241,100,30,0.04) 100%)",
                    }}
                  />

                  <div className="relative flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-300 ${
                        isReady ? "bg-[#F1641E]" : "bg-neutral-300"
                      }`}
                    >
                      <span
                        className="text-[24px] leading-none"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        E
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">
                        Secure checkout
                      </span>
                      <span className="text-[16px] font-medium tracking-[0.02em] text-neutral-900">
                        Buy on Etsy
                      </span>
                    </div>
                  </div>

                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                      isReady
                        ? "border-neutral-200 text-neutral-900 group-hover:border-[#F1641E] group-hover:bg-[#F1641E] group-hover:text-white"
                        : "border-neutral-200 text-neutral-400"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 17L17 7M17 7H9M17 7V15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </a>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-[22px] bg-neutral-50 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Shipping
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-neutral-700">
                      {product.shipping}
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-neutral-50 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Checkout
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-neutral-700">
                      Secure payment via Etsy
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-neutral-50 px-4 py-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Support
                    </p>
                    <p className="mt-2 text-[13px] leading-6 text-neutral-700">
                      Easy post-purchase help
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-[26px] border border-neutral-200 bg-white/85 px-5 py-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                Editorial note
              </p>

              <p className="mt-3 text-[14px] leading-7 text-neutral-600">
                Built to feel elevated before checkout and effortless after it
                arrives — premium, understated, and designed to keep its
                presence in everyday wear.
              </p>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4">
                <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                  Arvella Collective
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                  Quiet Presence
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}