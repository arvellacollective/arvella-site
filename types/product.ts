export type Product = {
  id: string
  slug: string
  title: string
  price: string
  image: string
  gallery?: string[]
  url: string
  description: string
  shipping: string
  status: "active" | "draft" | "inactive"
}

export type ProductRecord = {
  source: "manual" | "etsy"
  product: Product
}