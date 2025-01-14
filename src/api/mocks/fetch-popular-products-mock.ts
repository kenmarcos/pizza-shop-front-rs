import { http, HttpResponse } from 'msw'

import { FetchPopularProductsResponse } from '../fetch-popular-products'

export const fetchPopularProductsMock = http.get<
  never,
  never,
  FetchPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    { product: 'Pizza 01', amount: 5 },
    { product: 'Pizza 02', amount: 3 },
    { product: 'Pizza 03', amount: 2 },
    { product: 'Pizza 04', amount: 7 },
    { product: 'Pizza 05', amount: 4 },
  ])
})
