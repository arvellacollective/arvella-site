export default function JournalPage() {
  return (
    <main className="bg-white">

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-24 md:pb-32">

        <h1 className="
          text-[36px]
          md:text-[64px]
          font-semibold
          tracking-[0.06em]
          text-neutral-900
          leading-[1.05]
        ">
          JOURNAL
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
          Notes, thoughts, and fragments of perspective.
        </p>

        {/* EMPTY STATE */}
        <div className="mt-20 text-neutral-400 text-sm">
          Coming soon.
        </div>

      </div>

    </main>
  )
}