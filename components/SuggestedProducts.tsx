"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import products from "@/data/products.json"

type Props = {
  currentSlug: string
  variant?: "soft" | "hard"
}

export default function SuggestedProducts({
  currentSlug,
  variant = "hard",
}: Props) {
  const suggested = (products as any[])
    .filter((item) => item.product.slug !== currentSlug)
    .slice(0, 4)

  const title =
    variant === "soft" ? "More You’ll Feel" : "Complete Your Selection"

  return (
    <section className="mt-24 md:mt-32">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-[20px] md:text-[24px] tracking-[-0.02em] text-neutral-900">
          {title}
        </h2>

        <span className="text-[11px] uppercase tracking-[0.24em] text-neutral-400">
          Recommended
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {suggested.map(({ product }) => (
          <Link
            key={product.slug}
            href={`/shop/${product.slug}`}
            className="group block"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-[20px] bg-neutral-100"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              />

              {/* overlay premium gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>

            <div className="mt-3 space-y-1">
              <p className="text-[13px] text-neutral-900 tracking-[0.01em]">
                {product.title}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[13px] text-neutral-900 font-medium">
                  {product.price}
                </span>

                <span className="text-[11px] text-green-600 tracking-[0.02em]">
                  Free Shipping
                </span>
              </div>

              {variant === "hard" && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Popular choice
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}