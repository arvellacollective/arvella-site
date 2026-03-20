import Link from "next/link"
import Image from "next/image"

type Product = {
  id: string
  slug: string
  title: string
  price: string
  image: string
  image2?: string
  images?: string[]
  gallery?: string[]
  comparePrice?: string
  shipping?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.images && product.images.length > 0
      ? product.images
      : product.image2
      ? [product.image, product.image2]
      : [product.image]

  const mainImage = galleryImages[0] || product.image
  const hoverImage = galleryImages[1] || null

  const shipping = product.shipping || "COMPLIMENTARY U.S. SHIPPING"

  return (
    <Link href={`/shop/${product.slug}`} className="group block w-full">
      <div className="w-full">

        {/* IMAGE */}
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100">

          {/* MAIN IMAGE */}
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hoverImage
                ? "scale-100 opacity-100 group-hover:scale-[1.08] group-hover:opacity-0"
                : "group-hover:scale-[1.1]"
            }`}
          />

          {/* HOVER IMAGE */}
          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.title} alternate`}
              fill
              className="object-cover opacity-0 scale-[1.05] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-[1.12]"
            />
          )}

          {/* DARK OVERLAY */}
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/25" />

          {/* CTA BUTTON (KEY PART) */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">

            <div
              className="
                opacity-0 translate-y-4
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:opacity-100 group-hover:translate-y-0
              "
            >
              <div className="border border-white/80 px-6 py-3 text-[11px] tracking-[0.3em] text-white backdrop-blur-sm bg-white/10">
                VIEW PRODUCT
              </div>
            </div>

          </div>

        </div>

        {/* TEXT */}
        <div className="mt-4">

          <div className="flex items-start justify-between gap-4">

            <h3 className="max-w-[65%] text-[15px] md:text-[16px] font-medium tracking-[0.04em] leading-snug text-neutral-900 transition-all duration-300 group-hover:opacity-70">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 whitespace-nowrap">

              {product.comparePrice && (
                <span className="text-[13px] text-neutral-400 line-through">
                  ${product.comparePrice}
                </span>
              )}

              <span className="text-[15px] md:text-[16px] font-medium tracking-[0.02em] text-neutral-900">
                {product.price}
              </span>

            </div>
          </div>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-all duration-300 group-hover:text-neutral-800">
            {shipping}
          </p>

        </div>

      </div>
    </Link>
  )
}