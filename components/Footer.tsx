"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const footerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const footerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function Footer() {
  return (
    <footer className="relative z-30 mt-32 border-t border-neutral-200 bg-[#f4f2ef]">

      {/* HERO → FOOTER SOFT TRANSITION */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-[#f4f2ef]/60 to-[#f4f2ef]" />

      {/* NEWSLETTER */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mx-auto max-w-[900px] px-8 pt-36 pb-32 text-center"
      >

        <h2 className="text-sm tracking-[0.6em] text-neutral-700">
          JOIN THE FREQUENCY
        </h2>

        <p className="mt-6 text-sm text-neutral-500">
          Stay connected with Arvella.
        </p>

        <form
          action="https://formspree.io/f/yourformid"
          method="POST"
          className="mt-12 flex justify-center gap-6"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            autoComplete="off"
            className="w-[340px] border-b border-neutral-300 bg-transparent pb-2 text-sm outline-none placeholder:text-neutral-400 transition focus:border-neutral-700"
          />

          <button
            type="submit"
            className="border border-neutral-800 px-7 py-2 text-sm tracking-[0.2em] transition duration-300 hover:bg-neutral-900 hover:text-white"
          >
            SEND
          </button>
        </form>

      </motion.div>

      {/* MAIN FOOTER */}
      <motion.div
        variants={footerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-[1400px] px-8 pb-24"
      >

        <div className="grid grid-cols-3 gap-16 items-start">

          {/* LEFT */}
          <motion.div variants={footerItem} className="max-w-sm">
            <h3 className="text-[13px] font-medium tracking-[0.5em] text-neutral-900">
              ARVELLA
            </h3>

            <p className="mt-6 text-sm leading-relaxed text-neutral-500">
              Minimal frequency-driven apparel designed for calm confidence
              and timeless presence.
            </p>
          </motion.div>

          {/* CENTER */}
          <motion.div
            variants={footerItem}
            className="flex flex-col items-center gap-5 text-sm"
          >
            <Link href="/" className="text-neutral-500 transition hover:text-black">
              Home
            </Link>

            <Link href="/shop" className="text-neutral-500 transition hover:text-black">
              Shop
            </Link>

            <Link href="/about" className="text-neutral-500 transition hover:text-black">
              About
            </Link>

            <Link href="/contact" className="text-neutral-500 transition hover:text-black">
              Contact
            </Link>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={footerItem}
            className="flex flex-col items-end gap-5 text-sm"
          >
            <a
              href="https://instagram.com"
              className="text-neutral-500 transition hover:text-black"
            >
              Instagram
            </a>

            <a
              href="https://pinterest.com"
              className="text-neutral-500 transition hover:text-black"
            >
              Pinterest
            </a>

            <a
              href="mailto:info@arvellacollective.com"
              className="text-neutral-500 transition hover:text-black"
            >
              Email
            </a>
          </motion.div>

        </div>

        <motion.div
          variants={footerItem}
          className="mt-24 text-xs tracking-[0.15em] text-neutral-400"
        >
          © {new Date().getFullYear()} ARVELLA COLLECTIVE
        </motion.div>

      </motion.div>
    </footer>
  )
}