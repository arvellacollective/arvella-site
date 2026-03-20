"use client"

import ProductGallery from "@/components/ProductGallery"
import products from "@/data/products.json"
import { notFound } from "next/navigation"
import { useMemo, useState } from "react"

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
    if (quantity) parts.push(`Qty ${quantity}`)
    return parts.join(" · ")
  }, [selectedSize, selectedColor, quantity])

  const etsyUrl = isReady
    ? `${product.url}?size=${encodeURIComponent(
        selectedSize as string
      )}&color=${encodeURIComponent(
        selectedColor as string
      )}&qty=${quantity}`
    : "#"

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-10 pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,760px)_minmax(360px,480px)] gap-10 lg:gap-14 items-start">
        <ProductGallery
          title={product.title}
          image={product.image}
          gallery={product.gallery}
        />

        <div className="lg:sticky lg:top-24 self-start">
          <div className="flex flex-col">
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.38em] text-neutral-400">
                  Arvella Edition
                </p>

                <h1 className="text-[36px] leading-[1.05] md:text-[44px] font-semibold tracking-[-0.03em] text-neutral-950">
                  {product.title}
                </h1>

                <p className="text-[12px] uppercase tracking-[0.26em] text-neutral-400">
                  For those who move differently
                </p>
              </div>

              <div className="space-y-4 border-t border-neutral-200 pt-5">
                <p className="text-[22px] tracking-[-0.02em] text-neutral-700">
                  {product.price}
                </p>

                <p className="max-w-[46ch] text-[15px] leading-8 text-neutral-600">
                  {product.description} Refined for a clean silhouette, quiet
                  presence, and everyday wear that still feels intentional.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[24px] border border-neutral-200 bg-white/90 p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
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

                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => {
                      const active = selectedSize === size

                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`h-12 rounded-full border text-[13px] transition-all duration-300 ${
                            active
                              ? "border-black bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                              : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900"
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

                  <div className="grid grid-cols-3 gap-2">
                    {colors.map((color) => {
                      const active = selectedColor === color

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`h-12 rounded-full border px-4 text-[13px] transition-all duration-300 ${
                            active
                              ? "border-black bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                              : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-900"
                          }`}
                        >
                          {color}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-[11px] uppercase tracking-[0.24em] text-neutral-500">
                    Quantity
                  </span>

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
                  className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] border px-5 py-5 transition-all duration-300 ${
                    isReady
                      ? "border-[#F1641E]/40 bg-white hover:border-[#F1641E] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
                      : "border-neutral-200 bg-neutral-100 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4">
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
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
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
                  <div className="rounded-2xl bg-neutral-50 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Shipping
                    </p>
                    <p className="mt-1 text-[13px] text-neutral-700">
                      {product.shipping}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Checkout
                    </p>
                    <p className="mt-1 text-[13px] text-neutral-700">
                      Secure via Etsy
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Returns
                    </p>
                    <p className="mt-1 text-[13px] text-neutral-700">
                      Easy support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 px-1">
              <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-400">
                Editorial note
              </p>
              <p className="mt-3 max-w-[50ch] text-[14px] leading-7 text-neutral-500">
                Built to feel understated, premium, and intentional before the
                first click to checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}