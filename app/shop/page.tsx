import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/products"

export default async function ShopPage() {

  const products = await getAllProducts()

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">

      <h1 className="text-3xl font-semibold mb-16">
        Shop
      </h1>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-x-6
        gap-y-14
      "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  )
}