"use client"

import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState({
    reason: "",
    details: "",
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Failed")

      setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const isOther = form.reason === "Other"

  return (
    <main className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-40 md:pt-48 pb-32 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-[0.45fr_0.55fr] gap-16 md:gap-24">

          {/* LEFT */}
          <div className="md:pr-12 lg:pr-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.015] to-transparent pointer-events-none" />

            <h1 className="text-[44px] md:text-[72px] font-medium tracking-[0.12em] text-neutral-900 leading-[1.05]">
              CONTACT
            </h1>

            <div className="mt-8 flex flex-col gap-1">
              <div className="w-12 h-[1px] bg-neutral-900/20" />
              <div className="w-6 h-[1px] bg-neutral-900/10" />
            </div>

            <p className="mt-8 text-[15px] md:text-[16px] text-neutral-500/80 leading-[1.8] max-w-[420px]">
              Built with intention.
              <br />
              Made for quiet presence.
            </p>

            <div className="mt-24 space-y-3">
              <p className="text-[11px] tracking-[0.18em] text-neutral-400/70">
                EMAIL
              </p>
              <p className="text-[15px] tracking-[0.08em] text-neutral-900 hover:opacity-70 transition">
                contact@arvellacollective.com
              </p>
            </div>

            <div className="mt-16 space-y-2">
              <p className="text-[11px] tracking-[0.18em] text-neutral-400/60">
                ARVELLA COLLECTIVE
              </p>
              <p className="text-[13px] tracking-[0.08em] text-neutral-900/80">
                Quiet presence.
              </p>
            </div>

            <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-neutral-900/5 hidden md:block" />
          </div>

          {/* RIGHT */}
          <div className="w-full max-w-[600px] md:pt-4">
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* REASON */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  REASON
                </label>

                <select
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value, details: "" })
                  }
                  disabled={loading || success}
                  required
                  className="w-full mt-3 outline-none bg-transparent py-3 appearance-none text-neutral-900/80 disabled:opacity-40"
                >
                  <option value="" disabled>
                    Select reason
                  </option>
                  <option>Order Inquiry</option>
                  <option>Shipping Question</option>
                  <option>Payment Issue</option>
                  <option>Product Request</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />
                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* DETAILS */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  DETAILS
                </label>

                <input
                  type="text"
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  disabled={!isOther || loading || success}
                  placeholder="Optional — only if needed"
                  className={`w-full mt-3 outline-none bg-transparent py-3 relative z-10 transition-opacity duration-300
                    ${!isOther ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                />

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />
                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* NAME */}
              <div className="group relative">
                <label className="text-[11px] tracking-[0.12em] text-neutral-400">
                  NAME
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                  disabled={loading || success}
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
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                  disabled={loading || success}
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
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  disabled={loading || success}
                  className="w-full mt-3 outline-none bg-transparent py-3 resize-none relative z-10 disabled:opacity-40"
                />

                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-neutral-200" />
                <div className="absolute left-0 bottom-0 h-[1px] bg-neutral-900 w-0 transition-all duration-500 ease-out group-focus-within:w-full" />
              </div>

              {/* BUTTON */}
              <div className="pt-6 space-y-4 inline-block">
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`
                    px-8 py-3 w-full border rounded-[6px]
                    text-[12px] tracking-[0.28em]
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
                    text-[12px] text-green-600 transition-all duration-500
                    ${success ? "opacity-100" : "opacity-0"}
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