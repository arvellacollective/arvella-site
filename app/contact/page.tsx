export default function ContactPage() {
  return (
    <main className="bg-white">

      <div className="max-w-[900px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-24 md:pb-32">

        {/* HERO */}
        <div>
          <h1 className="
            text-[36px]
            md:text-[64px]
            font-semibold
            tracking-[0.06em]
            text-neutral-900
            leading-[1.05]
          ">
            CONTACT
          </h1>

          <div className="mt-6 w-10 h-[1px] bg-neutral-900/10" />

          <p className="
            mt-6
            text-[14px]
            md:text-[16px]
            text-neutral-500
            leading-relaxed
            max-w-[420px]
          ">
            For inquiries, collaborations, or support — reach out.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="mt-16 md:mt-20 space-y-2 text-sm text-neutral-700">
          <p>arvellacollective@gmail.com</p>
        </div>

        {/* FORM */}
        <form className="mt-16 md:mt-20 space-y-8">

          <div>
            <label className="text-xs tracking-[0.08em] text-neutral-500">
              NAME
            </label>
            <input
              type="text"
              className="
                w-full
                mt-2
                border-b
                border-neutral-300
                focus:border-neutral-900
                outline-none
                py-2
                bg-transparent
              "
            />
          </div>

          <div>
            <label className="text-xs tracking-[0.08em] text-neutral-500">
              EMAIL
            </label>
            <input
              type="email"
              className="
                w-full
                mt-2
                border-b
                border-neutral-300
                focus:border-neutral-900
                outline-none
                py-2
                bg-transparent
              "
            />
          </div>

          <div>
            <label className="text-xs tracking-[0.08em] text-neutral-500">
              MESSAGE
            </label>
            <textarea
              rows={4}
              className="
                w-full
                mt-2
                border-b
                border-neutral-300
                focus:border-neutral-900
                outline-none
                py-2
                bg-transparent
                resize-none
              "
            />
          </div>

          <button
            type="submit"
            className="
              mt-6
              text-sm
              tracking-[0.08em]
              text-neutral-900
              border-b
              border-neutral-900
              pb-1
              hover:opacity-60
              transition
            "
          >
            SEND
          </button>

        </form>

      </div>

    </main>
  )
}