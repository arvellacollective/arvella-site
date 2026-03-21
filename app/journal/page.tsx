export default function JournalPage() {
  return (
    <main className="bg-white">

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-8 pt-36 md:pt-44 pb-32 md:pb-40">

        {/* subtle background depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent" />

        {/* editorial vertical line */}
        <div className="absolute -left-4 top-0 bottom-0 hidden w-[1px] bg-neutral-900/5 md:block" />

        {/* HERO */}
        <div>
          <h1 className="
            text-[40px]
            md:text-[72px]
            font-medium
            tracking-[0.08em]
            text-neutral-900
            leading-[1.05]
          ">
            JOURNAL
          </h1>

          {/* editorial lines */}
          <div className="mt-8 flex flex-col gap-1">
            <div className="w-12 h-[1px] bg-neutral-900/20" />
            <div className="w-6 h-[1px] bg-neutral-900/10" />
          </div>

          <p className="
            mt-8
            text-[15px]
            md:text-[17px]
            text-neutral-500/80
            leading-[1.9]
            max-w-[420px]
          ">
            Notes, thoughts, and fragments of perspective.
          </p>

          {/* emotional layer */}
          <p className="
            mt-10
            text-[14px]
            tracking-[0.12em]
            text-neutral-400
          ">
            — a space between silence
            <br />
            and expression.
          </p>
        </div>

        {/* EMPTY STATE → PREMIUM */}
        <div className="mt-28 md:mt-36 flex flex-col items-center text-center">

          <div className="space-y-4 max-w-[420px]">
            <p className="text-neutral-900 text-[16px] tracking-[0.04em]">
              No entries yet.
            </p>

            <p className="text-neutral-400 text-[14px] leading-[1.8]">
              This space is reserved for what is still becoming.
            </p>
          </div>

        </div>

        {/* SIGNATURE */}
        <div className="mt-32 md:mt-40 flex flex-col items-center text-center space-y-2">
          <p className="text-[11px] tracking-[0.18em] text-neutral-400/60">
            ARVELLA
          </p>
          <p className="text-[13px] tracking-[0.08em] text-neutral-900/80">
            A living archive of thought.
          </p>
        </div>

      </div>

    </main>
  )
}