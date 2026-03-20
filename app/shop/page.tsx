import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"
import Reveal from "@/components/Reveal"

export default async function ShopPage() {
  const products = await getAllProducts()

  return (
    <main className="bg-white">

      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-24 pb-16">

        <h1 className="text-[28px] md:text-[34px] font-medium tracking-[0.08em] text-neutral-900">
          SHOP
        </h1>

        <p className="mt-4 text-sm text-neutral-500 max-w-[420px] leading-relaxed">
          Elevated essentials designed for quiet confidence.
        </p>

      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-28">

        <div
          className="
          grid
		  grid auto-rows-[1fr]
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-x-6
          md:gap-x-8
          lg:gap-x-10
          gap-y-14
          md:gap-y-20
          lg:gap-y-24
        "
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`
                group
                ${index === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""}
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