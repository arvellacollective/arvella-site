export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-8 pt-36 md:pt-44 pb-28 md:pb-36">
        {/* subtle background depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />

        {/* editorial vertical line */}
        <div className="absolute -left-4 top-0 bottom-0 hidden w-[1px] bg-neutral-900/5 md:block" />

        {/* HERO */}
        <div className="relative">
          <h1
            className="
              text-[40px]
              md:text-[72px]
              font-medium
              tracking-[0.08em]
              text-neutral-900
              leading-[1.05]
            "
          >
            ABOUT
          </h1>

          {/* editorial lines */}
          <div className="mt-8 flex flex-col gap-1">
            <div className="h-[1px] w-12 bg-neutral-900/20" />
            <div className="h-[1px] w-6 bg-neutral-900/10" />
          </div>

          <p
            className="
              mt-8
              max-w-[420px]
              text-[15px]
              leading-[1.9]
              text-neutral-500/80
              md:text-[17px]
            "
          >
            A quiet expression of identity, presence, and intention.
          </p>

          {/* emotional hook */}
          <p
            className="
              mt-10
              text-[14px]
              tracking-[0.12em]
              text-neutral-400
            "
          >
            — not made to be seen,
            <br />
            but to be felt.
          </p>
        </div>

        {/* CONTENT */}
        <div className="relative mt-20 max-w-[640px] space-y-10 md:mt-28">
          <p className="text-[15px] leading-[1.9] text-neutral-700 md:text-[16px]">
            Arvella is built on the belief that presence does not need to be
            loud to be powerful.
          </p>

          <p className="text-[15px] leading-[1.9] text-neutral-700 md:text-[16px]">
            In a world driven by noise, we choose restraint. In a culture of
            excess, we choose clarity.
          </p>

          <p className="text-[15px] leading-[1.9] text-neutral-700 md:text-[16px]">
            Each piece is designed not just to be worn, but to be felt.
          </p>

          <p className="text-[15px] leading-[1.9] text-neutral-700 md:text-[16px]">
            This is not about trends. This is about identity.
          </p>

          <p className="text-[15px] leading-[1.9] text-neutral-700 md:text-[16px]">
            Not fast fashion. Frequency.
          </p>
        </div>

        {/* SIGNATURE */}
        <div className="mt-28 space-y-2 md:mt-36">
          <p className="text-[11px] tracking-[0.18em] text-neutral-400/60">
            ARVELLA
          </p>
          <p className="text-[13px] tracking-[0.08em] text-neutral-900/80">
            Quiet Power.
          </p>
        </div>
      </div>
    </main>
  )
}