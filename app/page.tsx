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
  const [progressKey, setProgressKey] = useState(0)

  const heroes = [
    "/hero-arvella-4k.webp",
    "/hero-arvella-4k-2.webp",
    "/hero-arvella-4k-3.webp",
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

  let timer

  if (!scrollLocked) {
    timer = setTimeout(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length)
      setProgressKey((prev) => prev + 1)
    }, 5000)
  }

  const unsubscribe = scrollY.on("change", (v) => {
    if (v > 20 && !scrollLocked) setScrollLocked(true)
    if (v < 5) setScrollLocked(false)
  })

  return () => {
    clearTimeout(readyTimer)
    clearTimeout(timer)
    unsubscribe()
  }

}, [currentHero, scrollLocked])

  const textY = useTransform(scrollY, [0, 400], [0, -220])
  const textOpacity = useTransform(scrollY, [0, 250], [1, 0])
  

  // 🔥 FADE + DEPTH
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const heroFilter = useTransform(scrollYProgress, [0, 0.2, 1], [
  "brightness(1) blur(0px)",
  "brightness(1) blur(0px)",
  "brightness(0.75) blur(2px)"
])

  return (
    <main className="relative min-h-screen bg-white">

      {/* HERO BACKGROUND */}
      <div className="fixed inset-0 z-0 overflow-hidden">

        <AnimatePresence mode="wait">
		<motion.div
  style={{
    opacity: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
  }}
  className="absolute inset-0 pointer-events-none"
>
  <div className="absolute inset-y-0 right-0 w-[45%] 
    bg-gradient-to-l 
    from-black/45 
    via-black/25 
    via-black/10 
    to-transparent" />
</motion.div>
          <motion.div
            key={currentHero}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={heroReady ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              scale: heroScale,
              filter: heroFilter
            }}
            className="absolute inset-0"
          >

            <Image
              src={heroes[currentHero]}
              alt="Arvella Collection"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 200vw, 100vw"
              className="object-cover object-[15%_20%] md:object-[30%_45%]"
            />

          </motion.div>
        </AnimatePresence>

        {/* 🔥 PREMIUM FADE (STABLE) */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>

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
<div className="mt-6 flex justify-center gap-3">
  {heroes.map((_, i) => (
    <button
      key={i}
      onClick={() => {
  setCurrentHero(i)
  setProgressKey((prev) => prev + 1)
}}
      className="relative h-8 flex items-center justify-center px-1 group"
    >
      {/* BACK BAR */}
      <span className="block w-10 h-[3px] bg-white/20 rounded-full overflow-hidden">

        {/* PROGRESS */}
        {i === currentHero && (
          <span
            key={progressKey}
            className="block h-full bg-white rounded-full animate-[progressBar_5s_linear]"
          />
        )}

      </span>
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
              className="text-sm tracking-widest !text-white/60 transition hover:!text-white"
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