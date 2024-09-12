import { api } from '@/lib/axios'

interface FetchOrdersParams {
  pageIndex?: number | null
}

interface FetchOrdersResponse {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const fetchOrders = async ({ pageIndex }: FetchOrdersParams) => {
  const response = await api.get<FetchOrdersResponse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
