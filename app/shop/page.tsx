import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"
import Reveal from "@/components/Reveal"

export default async function ShopPage() {
  const products = await getAllProducts()

  return (
    <main className="bg-white">

      {/* HEADER */}
      <div className="
        max-w-[1400px]
        mx-auto
        px-6 md:px-8

        pt-28 md:pt-36
        pb-16 md:pb-20
      ">

        <h1 className="
          text-[40px]
          md:text-[64px]
          font-semibold
          tracking-[0.08em]
          md:tracking-[0.06em]
          text-neutral-900
          leading-[1.05]
        ">
          SHOP
        </h1>

        <div className="mt-5 w-10 h-[1px] bg-neutral-900/10" />

        <p className="
          mt-5
          text-[13px]
          md:text-[14px]
          tracking-[0.04em]
          text-neutral-400
          leading-relaxed
          max-w-[340px]
        ">
          Elevated essentials designed for quiet confidence.
        </p>

      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-28 md:pb-32">

        <div
          className="
            grid
            group/list
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-x-5
            md:gap-x-10
            gap-y-20
            md:gap-y-24
          "
        >
          {products.filter(Boolean).map((product, index) => (
            <div
              key={product.id}
              className={`
                transition-all duration-300

                md:group-hover/list:opacity-80
                md:hover:!opacity-100

                ${index === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}
                ${index === 1 ? "md:translate-y-4" : ""}
                ${index === 2 ? "md:translate-y-8" : ""}
                ${index === 4 ? "md:translate-y-6" : ""}
              `}
            >
              <Reveal>
                <ProductCard product={product} />
              </Reveal>
            </div>
          ))}
        </div>

      </div>

    </main>
  )
}