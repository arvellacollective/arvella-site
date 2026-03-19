"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
  }, [menuOpen])

  return (
    <>
      <header
        className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-500 ease-out
        ${
          scrolled
            ? "h-[64px] bg-white/95"
            : "h-[76px] bg-transparent"
        }
        `}
		

      >
        <div className="max-w-[1440px] mx-auto h-full px-6 md:px-10 lg:px-16 xl:px-20">
          
          <div className="relative flex items-center h-full">

            {/* LEFT (EMPTY FOR BALANCE) */}
            <div className="flex-1" />

            {/* LOGO (TRUE CENTER) */}
            <div className="absolute left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 left-6 translate-x-0">
              <Link
                href="/"
                className="text-[15px] md:text-[16px] tracking-[0.38em] font-medium text-neutral-900 hover:opacity-70 transition"
              >
                ARVELLA
              </Link>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex items-center justify-end gap-6 md:gap-8 text-[12px] md:text-[13px] tracking-[0.28em] text-neutral-900/80">

              <Link
                href="/about"
                className="hidden md:block hover:text-neutral-900 transition"
              >
                ABOUT
              </Link>

              <Link
                href="/journal"
                className="hidden md:block hover:text-neutral-900 transition"
              >
                JOURNAL
              </Link>

              {/* SHOP (PREMIUM RECTANGLE) */}
              <Link
                href="/shop"
                className="
px-4 py-2
border border-black/20
rounded-[6px]
text-[12px] tracking-[0.28em]
text-neutral-900/90

hover:border-black/40
hover:text-neutral-900
hover:bg-black/[0.04]


transition-all duration-300 ease-out
"
              >
                SHOP
              </Link>

              {/* MOBILE MENU */}
              <div
                className="md:hidden text-[22px] cursor-pointer z-[70]"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? "✕" : "☰"}
              </div>

            </div>

          </div>

        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-12 text-lg tracking-[0.25em]">

          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-[26px]"
          >
            ✕
          </button>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-60 transition"
          >
            HOME
          </Link>

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-60 transition"
          >
            ABOUT
          </Link>

          <Link
            href="/journal"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-60 transition"
          >
            JOURNAL
          </Link>

          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="
px-4 py-2
border border-black/20
rounded-[6px]
text-[12px] tracking-[0.28em]
text-neutral-900
transition-all duration-300
hover:border-black/40
hover:bg-black/[0.02]
"
          >
            SHOP
          </Link>

        </div>
      )}
    </>
  )
}