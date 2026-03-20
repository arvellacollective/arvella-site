"use client"

import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    await new Promise((res) => setTimeout(res, 1200))

    setLoading(false)
    setSuccess(true)
  }

  return (
    <main className="bg-white">

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-40 md:pt-48 pb-32 md:pb-40">

        <div className="grid grid-cols-1 md:grid-cols-[0.45fr_0.55fr] gap-16 md:gap-24">

          {/* LEFT */}
          <div>

            <h1 className="text-[44px] md:text-[72px] font-semibold tracking-[0.08em] text-neutral-900 leading-[1.05]">
              CONTACT
            </h1>

            <div className="mt-6 w-10 h-[1px] bg-neutral-900/10" />

            <p className="mt-6 text-[15px] md:text-[16px] text-neutral-500 leading-relaxed max-w-[420px]">
              Let’s build something intentional.
              <br />
              For inquiries, collaborations, or support — reach out.
            </p>

            <div className="mt-20 space-y-2">
              <p className="text-[11px] tracking-[0.12em] text-neutral-400">
                EMAIL
              </p>
              <p className="text-[14px] tracking-[0.04em] text-neutral-900">
                contact@arvellacollective.com
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="w-full max-w-[600px] md:pt-4">

            <form onSubmit={handleSubmit} className="space-y-12">

              {/* NAME */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  NAME
                </label>

                <input
                  type="text"
                  required
                  disabled={loading || success}
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      "Please enter your name."
                    )
                  }
                  onInput={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity("")
                  }
                  className="w-full mt-3 outline-none bg-transparent py-3 relative z-10 disabled:opacity-40"
                />

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />

                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* EMAIL */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  EMAIL
                </label>

                <input
                  type="email"
                  required
                  disabled={loading || success}
                  onInvalid={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity(
                      "Please enter a valid email address."
                    )
                  }
                  onInput={(e) =>
                    (e.target as HTMLInputElement).setCustomValidity("")
                  }
                  className="w-full mt-3 outline-none bg-transparent py-3 relative z-10 disabled:opacity-40"
                />

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />

                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* MESSAGE */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  MESSAGE
                </label>

                <textarea
                  rows={4}
                  disabled={loading || success}
                  className="w-full mt-3 outline-none bg-transparent py-3 resize-none relative z-10 disabled:opacity-40"
                />

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />

                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* BUTTON + SUCCESS */}
              <div className="pt-6 space-y-4 inline-block">

                <button
                  type="submit"
                  disabled={loading || success}
                  className={`
                    self-start
                    px-8
                    py-3
					w-full
                    border rounded-[6px]
                    text-[12px]
                    tracking-[0.28em]
                    flex items-center justify-center

                    transition-all duration-300 ease-out

                    ${
                      success
                        ? "border-green-600 text-green-600 bg-green-600/5"
                        : "border-black/20 text-neutral-900/90 hover:border-black/40 hover:bg-black/[0.04]"
                    }

                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {success ? (
                    "MESSAGE SENT"
                  ) : loading ? (
                    <span className="relative flex items-center">
                      SENDING

                      <span className="absolute left-0 -bottom-[6px] h-[1px] w-full overflow-hidden">
                        <span className="block h-full w-full bg-gradient-to-r from-transparent via-neutral-900/70 to-transparent blur-[0.5px] animate-[loadingBar_1.2s_ease-in-out_infinite]" />
                      </span>
                    </span>
                  ) : (
                    "SEND"
                  )}
                </button>

                <p
                  className={`
                    w-
                    text-left
                    text-[12px]
                    tracking-[0.04em]
                    text-green-600
                    transition-all duration-500 ease-out
                    ${success ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                  `}
                >
                  Your message has been successfully sent.
                </p>

              </div>

            </form>

          </div>

        </div>

      </div>

    </main>
  )
}