import { api } from '@/lib/axios'

interface SignUpBody {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export const signUp = async (body: SignUpBody) => {
  const { restaurantName, managerName, email, phone } = body

  await api.post('/restaurants', {
    restaurantName,
    managerName,
    email,
    phone,
  })
}
