// app/terms/page.tsx

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ef] text-neutral-800 px-6 py-40 pb-12">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-[12px] tracking-[0.6em] text-neutral-500 mb-4">
            ARVELLA COLLECTIVE
          </h1>
          <h2 className="text-[26px] tracking-[0.35em] text-neutral-900">
            TERMS
          </h2>
        </div>

        {/* INTRO */}
        <p className="text-[15px] leading-[1.9] text-neutral-600 mb-16">
          These Terms of Service define the relationship between you and
          Arvella Collective when accessing this website. By entering this
          space, you agree to interact with the platform in a respectful,
          lawful, and intentional manner.
        </p>

        {/* SECTIONS */}
        <Section title="USE OF WEBSITE">
          This website exists as a curated digital environment for discovery,
          inspiration, and brand interaction. Any attempt to misuse, disrupt,
          or exploit the system is strictly prohibited.
        </Section>

        <Section title="INTELLECTUAL PROPERTY">
          Every element within this website — from typography to visuals to
          product presentation — is part of the Arvella identity. These assets
          are protected and may not be copied, reproduced, or redistributed
          without permission.
        </Section>

        <Section title="PRODUCT EXPERIENCE">
          We aim to represent each product with clarity and intention.
          However, subtle variations in color, texture, or perception may occur
          depending on screen settings and production differences.
        </Section>

        <Section title="TRANSACTIONS">
          This website does not process transactions. All purchases are
          completed externally through Etsy. Payment processing, checkout,
          and order handling are managed within Etsy’s infrastructure.
        </Section>

        <Section title="RESPONSIBILITY">
          While we maintain high standards of accuracy and clarity, Arvella
          Collective is not responsible for decisions made based on website
          content. Use of the site is at your own discretion.
        </Section>

        <Section title="EXTERNAL PLATFORMS">
          Links to external platforms, including Etsy, are provided for
          convenience. We are not responsible for their policies, systems,
          or operations.
        </Section>

        <Section title="EVOLUTION">
          Arvella is a living system. These terms may evolve over time to
          reflect growth, refinement, and structural changes. Continued use
          of the website implies acceptance of any updates.
        </Section>

        {/* FOOTER SIGNATURE */}
        <div className="mt-24 pt-10 border-t border-neutral-200">
          <p className="text-[11px] tracking-[0.4em] text-neutral-400">
            ARVELLA
          </p>
        </div>

      </div>
    </main>
  )
}

// ================= COMPONENT =================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <h3 className="text-[11px] tracking-[0.45em] text-neutral-900 mb-4">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.9] text-neutral-600">
        {children}
      </p>
    </div>
  )
}
