export default function AboutPage() {
  return (
    <main className="bg-white">

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-24 md:pb-32">

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
            ABOUT
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
            A quiet expression of identity, presence, and intention.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 md:mt-24 max-w-[700px] space-y-6">

          <p className="text-neutral-700 leading-relaxed text-[15px] md:text-[16px]">
            Arvella is built around the idea that presence does not need to be loud to be powerful.
            Each piece is designed with intention — not just to be worn, but to be felt.
          </p>

          <p className="text-neutral-700 leading-relaxed text-[15px] md:text-[16px]">
            We believe in restraint, clarity, and quiet confidence. The absence of excess is where identity becomes visible.
          </p>

          <p className="text-neutral-700 leading-relaxed text-[15px] md:text-[16px]">
            This is not fast fashion. This is frequency.
          </p>

        </div>

      </div>

    </main>
  )
}