// app/faq/page.tsx

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ef] text-neutral-800 px-6 py-40 pb-6">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-[12px] tracking-[0.6em] text-neutral-500 mb-4">
            ARVELLA COLLECTIVE
          </h1>
          <h2 className="text-[26px] tracking-[0.35em] text-neutral-900">
            FAQ
          </h2>
        </div>

        {/* INTRO */}
        <p className="text-[15px] leading-[1.9] text-neutral-600 mb-16">
          Everything you need to know before and after your order. If you still
          have questions, you can always reach out — we’re here to help.
        </p>

        {/* QUESTIONS */}
        <Section
          title="HOW LONG DOES SHIPPING TAKE?"
          text="Orders are processed within 2–5 business days as each item is made to order. After processing, U.S. delivery typically takes 3–7 business days. International shipping may take 7–21 business days depending on location."
        />

        <Section
          title="CAN I RETURN OR EXCHANGE MY ORDER?"
          text="Because each product is made specifically for you, we do not accept returns or exchanges based on size or preference. However, if your item arrives damaged or incorrect, we will resolve it immediately."
        />

        <Section
          title="HOW DO I CHOOSE THE RIGHT SIZE?"
          text="We recommend checking the size chart available on each product page. Our sizing is consistent, and the chart is designed to help you make the best choice before ordering."
        />

        <Section
          title="WHERE ARE ORDERS SHIPPED FROM?"
          text="Orders are produced and shipped through our trusted production partners. This allows us to maintain quality while delivering efficiently."
        />

        <Section
          title="WILL I RECEIVE TRACKING INFORMATION?"
          text="Yes. Once your order is shipped, you will receive an email with tracking details. Please allow up to 48 hours for tracking updates to appear."
        />

        <Section
          title="ARE PAYMENTS SECURE?"
          text="All payments are processed securely through Etsy. Your payment information is handled within Etsy’s protected infrastructure."
        />

        <Section
          title="CAN I CANCEL MY ORDER?"
          text="Orders can only be canceled shortly after being placed. Once production begins, cancellations are no longer possible due to the made-to-order process."
        />

        <Section
          title="WHAT IF MY PACKAGE IS LOST?"
          text="If your package is lost in transit, we recommend contacting the shipping carrier using your tracking number. If you need assistance, you can reach out and we will guide you."
        />

        <Section
          title="DO YOU OFFER FREE SHIPPING?"
          text="Shipping costs are calculated at checkout. Occasionally, we may offer limited-time free shipping promotions."
        />

        <Section
          title="HOW CAN I CONTACT YOU?"
          text="You can reach us through the contact page or via email. We typically respond within 24–48 hours."
        />

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

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-14">
      <h3 className="text-[11px] tracking-[0.45em] text-neutral-900 mb-4">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.9] text-neutral-600">
        {text}
      </p>
    </div>
  )
}