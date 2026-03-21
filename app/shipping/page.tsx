// app/shipping/page.tsx

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#f4f2ef] text-neutral-800 px-6 py-40 pb-6">
      <div className="mx-auto max-w-2xl">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-[12px] tracking-[0.6em] text-neutral-500 mb-4">
            ARVELLA COLLECTIVE
          </h1>
          <h2 className="text-[26px] tracking-[0.35em] text-neutral-900">
            SHIPPING
          </h2>
        </div>

        {/* INTRO */}
        <p className="text-[15px] leading-[1.9] text-neutral-600 mb-16">
          Every Arvella piece is created with intention — and that intention
          extends beyond design into the delivery experience. This Shipping
          Policy outlines how your order moves from creation to arrival, ensuring
          clarity, transparency, and trust at every step of the journey.
        </p>

        {/* SECTIONS */}
        <Section title="ORDER PROCESSING">
          Each product is made to order, meaning your item is produced
          specifically for you once your purchase is completed. This allows us
          to reduce waste and maintain a more intentional production model.
          Processing typically takes between 2–5 business days before shipment.
          During peak periods, this timeframe may extend slightly due to demand.
        </Section>

        <Section title="SHIPPING TIME">
          After processing, shipping times vary depending on your location.
          Orders within the United States typically arrive within 3–7 business
          days. International deliveries may take between 7–21 business days
          depending on the destination and local postal systems.
        </Section>

        <Section title="TRACKING INFORMATION">
          Once your order has been shipped, you will receive a confirmation email
          with tracking details. Tracking updates may take up to 48 hours to
          appear as carriers process the shipment within their systems.
        </Section>

        <Section title="SHIPPING COSTS">
          Shipping costs are calculated at checkout based on your location and
          order details. From time to time, we may offer free shipping promotions
          as part of limited campaigns.
        </Section>

        <Section title="DELAYS">
          While we strive for timely delivery, delays may occur due to factors
          outside our control, including carrier issues, customs processing, or
          unforeseen global conditions. Arvella Collective is not responsible
          for delays once the order has been handed to the shipping carrier.
        </Section>

        <Section title="INCORRECT ADDRESS">
          It is the customer’s responsibility to ensure that the shipping
          address provided is accurate. Orders shipped to incorrect or incomplete
          addresses may be returned or lost. In such cases, reshipping costs may
          apply.
        </Section>

        <Section title="LOST OR STOLEN PACKAGES">
          Once a package is marked as delivered by the carrier, Arvella
          Collective is not responsible for lost or stolen items. If you believe
          your package has been lost in transit, please contact the carrier
          directly using your tracking information.
        </Section>

        <Section title="INTERNATIONAL ORDERS">
          International shipments may be subject to customs fees, duties, or
          taxes depending on your country’s regulations. These charges are not
          included in the purchase price and are the responsibility of the
          customer.
        </Section>

        <Section title="SHIPPING PARTNERS">
          Orders are fulfilled and shipped through trusted production and
          logistics partners. While we carefully select these partners, their
          operations remain outside our direct control once the shipment begins.
        </Section>

        <Section title="CONTACT">
          If you have any questions regarding your order or shipping status,
          you can contact us at any time. We are here to support you and ensure
          your experience with Arvella remains smooth and aligned with our
          standards.
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