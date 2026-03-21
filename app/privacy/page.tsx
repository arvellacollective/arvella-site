// app/privacy/page.tsx

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ef] text-neutral-800 px-6 py-40 pb-6">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-[12px] tracking-[0.6em] text-neutral-500 mb-4">
            ARVELLA COLLECTIVE
          </h1>
          <h2 className="text-[26px] tracking-[0.35em] text-neutral-900">
            PRIVACY
          </h2>
        </div>

        {/* INTRO */}
        <p className="text-[15px] leading-[1.9] text-neutral-600 mb-16">
          At Arvella Collective, privacy is not treated as a formality — it is a
          fundamental part of the trust we build with every individual who
          interacts with our brand. This Privacy Policy explains how we collect,
          use, and protect your information.
        </p>

        {/* SECTIONS */}
        <Section title="INFORMATION WE COLLECT">
          We may collect personal information such as your name and email when
          you contact us or subscribe. We may also collect limited non-personal
          data such as device type, browser, and usage behavior to improve the
          website experience.
        </Section>

        <Section title="HOW WE USE YOUR INFORMATION">
          Your information is used to respond to inquiries, improve the website,
          and communicate with you when necessary. We do not engage in intrusive
          tracking or unnecessary data usage.
        </Section>

        <Section title="THIRD-PARTY SERVICES">
          We may use trusted third-party tools for hosting, analytics, and
          communication. All purchases are processed via Etsy, and transaction
          data is handled under Etsy’s policies.
        </Section>

        <Section title="DATA SECURITY">
          We take reasonable measures to protect your information. However, no
          system is completely secure, and information is shared at your own
          discretion.
        </Section>

        <Section title="DATA RETENTION">
          We retain your information only as long as necessary for communication
          and service improvement. You may request deletion at any time.
        </Section>

        <Section title="YOUR RIGHTS">
          You may request access, correction, or deletion of your data at any
          time by contacting us.
        </Section>

        <Section title="COOKIES">
          We may use basic cookies to improve functionality and performance. We
          do not use aggressive tracking systems.
        </Section>

        <Section title="CHANGES">
          This policy may be updated periodically. Continued use of the site
          implies acceptance of the updated terms.
        </Section>

        {/* FOOTER SIGNATURE (TERMS İLE AYNI) */}
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