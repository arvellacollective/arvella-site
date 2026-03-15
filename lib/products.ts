import products from "@/data/products.json"
import type { Product, ProductRecord } from "@/types/product"

export async function getAllProducts(): Promise<Product[]> {

  const records = products as ProductRecord[]

  return records
    .map((record) => record.product)
    .filter((product) => product.status === "active")
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {

  const records = products as ProductRecord[]

  const productsList = records
    .map((record) => record.product)
    .filter((product) => product.status === "active")

  return productsList.find((product) => product.slug === slug)
}

export async function getFeaturedProducts(
  limit: number = 3
): Promise<Product[]> {

  const productsList = await getAllProducts()

  if (!productsList || productsList.length === 0) {
    return []
  }

  return productsList.slice(0, limit)
}