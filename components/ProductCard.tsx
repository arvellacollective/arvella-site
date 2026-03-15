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
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            className={`object-cover transition-all duration-500 ${
              hoverImage
                ? "scale-100 opacity-100 group-hover:scale-[1.015] group-hover:opacity-0"
                : "group-hover:scale-[1.04]"
            }`}
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
          />

          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${product.title} alternate view`}
              fill
              className="object-cover opacity-0 scale-[1.02] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.06]"
              sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
            />
          )}
        </div>

        <div className="mt-5 text-white">
          <div className="flex items-start justify-between gap-6">
            <h3 className="max-w-[68%] text-[20px] font-medium tracking-[0.02em] text-right ml-auto">
              {product.title}
            </h3>

            <div className="flex items-center gap-3 whitespace-nowrap">
              {product.comparePrice && (
                <span className="text-[16px] text-white/40 line-through">
                  ${product.comparePrice}
                </span>
              )}

              <span className="text-[18px] font-semibold">
                {product.price}
              </span>
            </div>
          </div>

          <p className="mt-2 text-[12px] uppercase tracking-[0.12em] text-white/60 text-right">
            {shipping}
          </p>
        </div>
      </div>
    </Link>
  )
}