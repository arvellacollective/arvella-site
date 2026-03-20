import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"
import Reveal from "@/components/Reveal"

export default async function ShopPage() {
  const products = await getAllProducts()

  return (
    <main className="bg-white">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-12 md:pb-20">

        <h1 className="text-[28px] md:text-[40px] font-light tracking-[0.18em] text-neutral-900">
          SHOP
        </h1>

        <p className="mt-3 md:mt-4 text-[12px] md:text-[13px] tracking-[0.04em] text-neutral-500 leading-relaxed max-w-[420px] md:max-w-[480px]">
          Elevated essentials designed for quiet confidence.
        </p>

      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pb-24 md:pb-28">

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
          {products.map((product, index) => (
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