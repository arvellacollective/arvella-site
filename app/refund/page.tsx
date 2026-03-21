// app/refund/page.tsx

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ef] text-neutral-800 px-6 py-40 pb-6">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-[12px] tracking-[0.6em] text-neutral-500 mb-4">
            ARVELLA COLLECTIVE
          </h1>
          <h2 className="text-[26px] tracking-[0.35em] text-neutral-900">
            RETURNS
          </h2>
        </div>

        {/* INTRO */}
        <p className="text-[15px] leading-[1.9] text-neutral-600 mb-16">
          Every Arvella piece is created intentionally and made specifically
          for you. Because of this made-to-order process, our return policy is
          designed to balance fairness, quality assurance, and a conscious
          production approach.
        </p>

        {/* SECTIONS */}
        <Section title="MADE-TO-ORDER POLICY">
          All products are produced individually after an order is placed.
          This means we do not hold traditional inventory. As a result, we do
          not accept returns or exchanges based on size preference, change of
          mind, or general dissatisfaction.
        </Section>

        <Section title="DAMAGED OR DEFECTIVE ITEMS">
          If your item arrives damaged, misprinted, or defective, we will make
          it right. Please contact us within 7 days of delivery and include
          clear photos of the issue. Once verified, we will offer a replacement
          or refund at no additional cost.
        </Section>

        <Section title="WRONG ITEM RECEIVED">
          In the rare case that you receive the wrong item, we will resolve the
          issue quickly. Contact us with order details and visual proof, and we
          will arrange a replacement or refund accordingly.
        </Section>

        <Section title="SIZE CONSIDERATION">
          We strongly recommend reviewing the size chart before purchasing.
          Our products follow a consistent fit, and sizing details are provided
          to help you make an informed decision. Returns based on incorrect size
          selection are not accepted.
        </Section>

        <Section title="REFUND PROCESS">
          Approved refunds are processed after verification and may take several
          business days to reflect in your original payment method, depending
          on your provider.
        </Section>

        <Section title="CANCELLATIONS">
          Orders can only be canceled within a short window after purchase.
          Once production has started, cancellations are no longer possible due
          to the made-to-order nature of our products.
        </Section>

        <Section title="EXTERNAL PLATFORM">
          All purchases are completed via Etsy. While we assist with issues,
          payment processing and certain dispute resolutions may be handled
          within Etsy’s system.
        </Section>

        <Section title="CONTACT">
          If you experience any issue with your order, reach out to us and we
          will do our best to resolve it in alignment with our standards and
          policies.
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