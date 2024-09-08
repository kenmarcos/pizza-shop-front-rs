import { api } from '@/lib/axios'

interface UpdateRestaurantProfileBody {
  name: string
  description: string | null
}

export const updateRestaurantProfile = async ({
  name,
  description,
}: UpdateRestaurantProfileBody) => {
  // Simulação de erro de requisição
  // await new Promise((_, reject) => {
  //   setTimeout(reject, 3000)
  // })

  await api.put('/profile', { name, description })
}
