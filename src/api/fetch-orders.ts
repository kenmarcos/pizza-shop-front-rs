import { api } from '@/lib/axios'

interface FetchOrdersParams {
  orderId?: string | null
  customerName?: string | null
  status?: string | null
  pageIndex?: number | null
}

export interface FetchOrdersResponse {
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

export const fetchOrders = async ({
  orderId,
  customerName,
  status,
  pageIndex,
}: FetchOrdersParams) => {
  const response = await api.get<FetchOrdersResponse>('/orders', {
    params: {
      orderId,
      customerName,
      status,
      pageIndex,
    },
  })

  return response.data
}
