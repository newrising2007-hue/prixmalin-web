export type DealAvailability = "InStock" | "OutOfStock"

export interface Deal {
  id: string
  title: string
  price: number
  currency: "CAD" | "USD"
  platform: string
  image: string
  affiliateUrl: string
  availability: DealAvailability
}
