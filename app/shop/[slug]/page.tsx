import ProductGallery from "@/components/ProductGallery"
import { getProductBySlug } from "@/lib/products"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT SIDE — GALLERY */}

        <ProductGallery
          title={product.title}
          image={product.image}
          gallery={product.gallery}
        />

        {/* RIGHT SIDE — PRODUCT INFO */}

        <div className="flex flex-col gap-6 max-w-md lg:sticky lg:top-24 self-start">
          
          <h1 className="text-3xl font-semibold">
            {product.title}
          </h1>

          <p className="text-xl font-medium">
            {product.price}
          </p>

          <p className="text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm text-neutral-500">
            {product.shipping}
          </p>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all duration-300 hover:border-[#F1641E] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F1641E] text-white shadow-sm">
                <span
                  className="text-[24px] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  E
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-400">
                  Marketplace
                </span>
                <span className="text-[15px] font-medium tracking-[0.08em] text-neutral-900">
                  Buy on Etsy
                </span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-900 transition-all duration-300 group-hover:border-[#F1641E] group-hover:bg-[#F1641E] group-hover:text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

        </div>

      </div>
    </main>
  )
}