export type Drug = {
  id: string
  name: string
  manufacturer: string
  batch: string
  expiry: string // ISO date
  stock: number
  limit: number
}
