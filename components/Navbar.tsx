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
            ? "h-[64px] bg-white/95 backdrop-blur-md"
            : "h-[76px] bg-transparent"
        }
        `}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-8">
          <div className="relative flex items-center h-full">

            {/* LEFT */}
            <div className="flex-1" />

            {/* LOGO */}
            <div className="absolute left-1/2 -translate-x-1/2">
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

              {/* SHOP BUTTON */}
              <Link
                href="/shop"
                className="
px-3 md:px-4 py-2
border border-black/20
rounded-[6px]
text-[12px] tracking-[0.28em]
text-neutral-900/90

hover:border-black/40
hover:text-neutral-900
hover:bg-black/[0.04]

transition-all duration-300 ease-out
flex items-center justify-center gap-2
"
              >

                {/* Desktop */}
                <span className="hidden md:flex items-center gap-2">
                  SHOP
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5.5 8H14.5L13.7 15H6.3L5.5 8Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M7.8 8V6.5C7.8 5.6 8.6 5 10 5C11.4 5 12.2 5.6 12.2 6.5V8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                {/* Mobile */}
                <span className="md:hidden">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5.5 8H14.5L13.7 15H6.3L5.5 8Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M7.8 8V6.5C7.8 5.6 8.6 5 10 5C11.4 5 12.2 5.6 12.2 6.5V8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

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

          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition">
            HOME
          </Link>

          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition">
            ABOUT
          </Link>

          <Link href="/journal" onClick={() => setMenuOpen(false)} className="hover:opacity-60 transition">
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