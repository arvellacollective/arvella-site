"use client"

import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import { getFeaturedProducts } from "@/lib/products"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import type { Product } from "@/types/product"

export default function Page() {

  const heroRef = useRef(null)

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [currentHero, setCurrentHero] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [scrollLocked, setScrollLocked] = useState(false)

  const heroes = [
    "/hero-arvella-4k.jpg",
    "/hero-arvella-4k-2.jpg",
    "/hero-arvella-4k-3.jpg",
  ]

  const { scrollY } = useScroll()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  useEffect(() => {

    getFeaturedProducts(5).then(setFeaturedProducts)

    const readyTimer = setTimeout(() => {
      setHeroReady(true)
    }, 80)

    const interval = setInterval(() => {

      if (!scrollLocked) {
        setCurrentHero((prev) => (prev + 1) % heroes.length)
      }

    }, 7000)

    const unsubscribe = scrollY.on("change", (v) => {

      if (v > 20 && !scrollLocked) {
        setScrollLocked(true)
      }

      if (v < 5) {
        setScrollLocked(false)
      }

    })

    return () => {
      clearTimeout(readyTimer)
      clearInterval(interval)
      unsubscribe()
    }

  }, [scrollLocked])

  const textY = useTransform(scrollY, [0, 400], [0, -220])
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0])

  const blurAmount = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"])
  const blurOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const fadeSlide = useTransform(scrollYProgress, [0, 1], ["translateX(100%)", "translateX(0%)"])

  return (
    <main className="relative min-h-screen bg-white">

      {/* HERO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, x: 700 }}
            animate={heroReady ? { opacity: 1, x: 0 } : { opacity: 0 }}
            exit={{ opacity: 0, x: -120 }}
            transition={{
  opacity: {
    duration: 2,
    ease: [0.4, 0, 0.2, 1],
  },
  scale: {
    duration: 8,
    ease: "linear",
  },
}}
            className="absolute inset-0"
          >

            <Image
              src={heroes[currentHero]}
              alt="Arvella Collection"
              fill
              priority
              quality={100}
              unoptimized
              sizes="100vw"
              className="object-cover object-[15%_20%] md:object-[30%_45%]"
            />

          </motion.div>
        </AnimatePresence>

        {/* PREMIUM FADE EFFECT */}

        <motion.div
  style={{
    opacity: useTransform(scrollYProgress, [0, 0.85], [0, 1]),
  }}
  className="absolute inset-0 pointer-events-none backdrop-blur-[14px]"
>
  <div
    className="absolute inset-0"
    style={{
      WebkitMaskImage:
        "linear-gradient(to left, black 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.75) 36%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.08) 84%, transparent 96%)",
      maskImage:
        "linear-gradient(to left, black 0%, rgba(0,0,0,0.92) 18%, rgba(0,0,0,0.75) 36%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.22) 72%, rgba(0,0,0,0.08) 84%, transparent 96%)",
    }}
  />
</motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/22" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-black/12 via-black/6 to-transparent" />

      </div>

      {/* HERO */}

      <section ref={heroRef} className="relative z-10 h-screen">

        <div className="sticky top-0 h-screen">

          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="mx-auto flex h-full max-w-[1400px] items-center justify-center md:justify-end px-6 md:px-8"
          >

            <div className="inline-block text-center text-white">

              <h1 className="text-4xl md:text-7xl font-light tracking-[0.20em] md:translate-x-[0.11em]">
                ARVELLA
              </h1>

              <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed mx-auto max-w-[520px]">
                Elevated essentials designed to move with your energy.
              </p>

              <div className="mt-12 flex justify-center">

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center border border-white/80 px-10 py-4 text-xs tracking-[0.32em] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                >
                  SHOP COLLECTION
                </Link>

              </div>

              <div className="mt-14 flex justify-center gap-3">

                {heroes.map((_, i) => (

                  <button
  key={i}
  onClick={() => setCurrentHero(i)}
  className="relative flex items-center justify-center w-10 h-10"
>
  <span
    className={`h-[6px] rounded-full transition-all duration-300 ${
      currentHero === i
        ? "w-[22px] bg-white"
        : "w-[6px] bg-white/40 hover:bg-white/70"
    }`}
  />
</button>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURED */}

      <section className="relative z-20 mt-24 pb-32">

        <div className="mx-auto max-w-[1440px] px-8">

          <div className="mb-16 flex items-center justify-between">

            <h2 className="text-2xl font-medium tracking-wide text-white">
              Featured
            </h2>

            <Link
              href="/shop"
              className="text-sm tracking-widest text-white/90 transition hover:text-white"
            >
              VIEW ALL
            </Link>

          </div>

          {featuredProducts[0] && (

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >

              <ProductCard product={featuredProducts[0]} />

            </motion.div>

          )}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {featuredProducts.slice(1, 5).map((product, index) => (

              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >

                <ProductCard product={product} />

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </main>
  )
}