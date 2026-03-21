"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
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
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (success) return

    setLoading(true)

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) return

      if (data.success) {
        setSuccess(true)
        setEmail("")
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative z-30 border-t border-neutral-200 bg-[#f4f2ef]">

      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-[#f4f2ef]/60 to-[#f4f2ef]" />

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

        <form onSubmit={handleSubmit} className="mt-12 flex justify-center gap-6">

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={success}
            placeholder="Email address"
            autoComplete="off"
            className="w-[340px] border-b border-neutral-300 bg-transparent pb-2 text-sm outline-none placeholder:text-neutral-400 transition focus:border-neutral-700 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading || success}
            className="border border-neutral-800/60 px-7 py-2 text-sm tracking-[0.2em] text-neutral-800 rounded-[6px] transition-all duration-300 ease-out hover:border-neutral-900 hover:bg-neutral-900/5 hover:text-neutral-900 disabled:opacity-50"
          >
            {loading ? "..." : success ? "DONE" : "SEND"}
          </button>

        </form>

        {success && (
          <p className="mt-6 text-sm text-green-600 tracking-wide">
            You're now inside the frequency.
          </p>
        )}

      </motion.div>

      <motion.div
        variants={footerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-[1400px] px-8 pb-24"
      >
        <div className="grid grid-cols-3 gap-16 items-start">

          <motion.div variants={footerItem} className="max-w-sm">
            <h3 className="text-[13px] font-medium tracking-[0.5em] text-neutral-900">
              ARVELLA
            </h3>

            <p className="mt-6 text-sm leading-relaxed text-neutral-500">
              Minimal frequency-driven apparel designed for calm confidence
              and timeless presence.
            </p>
          </motion.div>

          <motion.div variants={footerItem} className="flex flex-col items-center gap-5 text-sm">
            <Link href="/" className="text-neutral-500 hover:text-black">Home</Link>
            <Link href="/shop" className="text-neutral-500 hover:text-black">Shop</Link>
            <Link href="/about" className="text-neutral-500 hover:text-black">About</Link>
            <Link href="/contact" className="text-neutral-500 hover:text-black">Contact</Link>
          </motion.div>

          <motion.div variants={footerItem} className="flex flex-col items-end gap-5 text-sm">
            <a href="https://instagram.com" className="text-neutral-500 hover:text-black">Instagram</a>
            <a href="https://pinterest.com" className="text-neutral-500 hover:text-black">Pinterest</a>
            <a href="mailto:info@arvellacollective.com" className="text-neutral-500 hover:text-black">Email</a>
          </motion.div>

        </div>

        {/* 🔥 PREMIUM DOT LINKS */}
        <motion.div
          variants={footerItem}
          className="mt-20 flex justify-center items-center text-[11px] tracking-[0.2em] text-neutral-400 group"
        >
          <Link href="/privacy" className="hover:text-black transition">PRIVACY</Link>

          <span className="mx-4 text-[14px] text-neutral-300 transition group-hover:text-neutral-200">
            •
          </span>

          <Link href="/terms" className="hover:text-black transition">TERMS</Link>

          <span className="mx-4 text-[14px] text-neutral-300 transition group-hover:text-neutral-200">
            •
          </span>

          <Link href="/shipping" className="hover:text-black transition">SHIPPING</Link>

          <span className="mx-4 text-[14px] text-neutral-300 transition group-hover:text-neutral-200">
            •
          </span>

          <Link href="/refund" className="hover:text-black transition">RETURNS</Link>

          <span className="mx-4 text-[14px] text-neutral-300 transition group-hover:text-neutral-200">
            •
          </span>

          <Link href="/faq" className="hover:text-black transition">FAQ</Link>
        </motion.div>

        <motion.div variants={footerItem} className="mt-10 text-xs tracking-[0.15em] text-neutral-400 text-center">
          © {new Date().getFullYear()} ARVELLA COLLECTIVE
        </motion.div>

      </motion.div>
    </footer>
  )
}