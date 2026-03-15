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

  // scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
  }, [menuOpen])

  return (
    <>
      <header
        className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500 ease-out
        ${scrolled
? "bg-white/60 backdrop-blur-lg h-[64px]"
: "bg-transparent h-[76px]"
}
        `}
      >

        <div className="max-w-[1440px] mx-auto px-8 h-full grid grid-cols-3 items-center">

          {/* LEFT NAV */}

          <div className="justify-self-start">

            <Link
              href="/shop"
              className="text-[13px] tracking-[0.25em] text-neutral-900 hover:opacity-60 transition"
            >
              SHOP
            </Link>

          </div>

          {/* LOGO */}

          <div className="justify-self-center">

            <Link
              href="/"
              className="text-[16px] tracking-[0.35em] font-medium text-neutral-900 hover:opacity-70 transition"
            >
              ARVELLA
            </Link>

          </div>

          {/* RIGHT NAV */}

          <div className="justify-self-end flex items-center gap-10 text-[13px] tracking-[0.25em]">

            <Link
              href="/about"
              className="hidden md:block hover:opacity-60 transition"
            >
              ABOUT
            </Link>

            <Link
              href="/journal"
              className="hidden md:block hover:opacity-60 transition"
            >
              JOURNAL
            </Link>

            {/* HAMBURGER */}

            <div
              className="md:hidden text-[22px] cursor-pointer z-[70]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
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

        </div>
      )}
    </>
  )
}