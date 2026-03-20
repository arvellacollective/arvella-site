import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"
import Reveal from "@/components/Reveal"

export default async function ShopPage() {
  const products = await getAllProducts()

  const chunkProducts = (arr: any[], size: number) => {
    const result = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }

  const blocks = chunkProducts(products.filter(Boolean), 5)

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

      {/* BLOCK SYSTEM */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-28 md:pb-32 space-y-24 md:space-y-32">

        {blocks.map((block, blockIndex) => {
          const isReverse = blockIndex % 2 === 1

          const hero = block[0]
          const smalls = block.slice(1)

          return (
            <div
              key={blockIndex}
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6 md:gap-10
                items-stretch
              "
            >

              {/* HERO LEFT */}
              {!isReverse && hero && (
                <div className="h-full">
                  <Reveal>
                    <ProductCard product={hero} variant="hero" />
                  </Reveal>
                </div>
              )}

              {/* SMALL GRID */}
              <div className="
                grid
                grid-cols-2
                gap-6 md:gap-10
                h-full
              ">
                {smalls.map((product: any) => (
                  <div key={product.id}>
                    <Reveal>
                      <ProductCard product={product} />
                    </Reveal>
                  </div>
                ))}
              </div>

              {/* HERO RIGHT */}
              {isReverse && hero && (
                <div className="h-full">
                  <Reveal>
                    <ProductCard product={hero} variant="hero" />
                  </Reveal>
                </div>
              )}

            </div>
          )
        })}

      </div>

    </main>
  )
}