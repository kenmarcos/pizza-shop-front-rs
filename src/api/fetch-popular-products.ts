import { api } from '@/lib/axios'

export type FetchPopularProductsResponse = {
  product: string
  amount: number
}[]

export const fetchPopularProducts = async () => {
  const response = await api.get<FetchPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
