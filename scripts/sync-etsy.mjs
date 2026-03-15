import fs from "fs/promises"
import path from "path"

const ETSY_API_KEY = process.env.ETSY_API_KEY
const ETSY_SHOP_NAME = process.env.ETSY_SHOP_NAME

const DATA_PATH = path.join(process.cwd(), "data", "products.json")

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function normalizeProduct(listing) {

  const image =
    listing.Images?.[0]?.url_fullxfull ||
    listing.Images?.[0]?.url_570xN ||
    ""

  const gallery =
    listing.Images?.map((img) => img.url_fullxfull) || []

  return {
    source: "etsy",
    product: {
      id: String(listing.listing_id),
      slug: slugify(listing.title),
      title: listing.title,
      price: `$${listing.price.amount / listing.price.divisor}`,
      image,
      gallery,
      url: listing.url,
      description: listing.description || "",
      shipping: "Calculated at checkout on Etsy",
      status: listing.state === "active" ? "active" : "inactive"
    }
  }
}

async function fetchShop() {

  const url = `https://openapi.etsy.com/v3/application/shops/${ETSY_SHOP_NAME}`

  const res = await fetch(url, {
    headers: {
      "x-api-key": ETSY_API_KEY
    }
  })

  const data = await res.json()

  return data
}

async function fetchListings(shopId) {

  const url = `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active?includes=Images`

  const res = await fetch(url, {
    headers: {
      "x-api-key": ETSY_API_KEY
    }
  })

  const data = await res.json()

  return data.results || []
}

async function runSync() {

  console.log("Starting Etsy sync...")

  const shop = await fetchShop()

  if (!shop || !shop.shop_id) {
    console.error("Shop not found")
    return
  }

  const listings = await fetchListings(shop.shop_id)

  const normalized = listings.map(normalizeProduct)

  await fs.writeFile(
    DATA_PATH,
    JSON.stringify(normalized, null, 2)
  )

  console.log("products.json updated")
}

runSync()