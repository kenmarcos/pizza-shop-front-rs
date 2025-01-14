import { http, HttpResponse } from 'msw'

import { UpdateRestaurantProfileBody } from '../update-restaurant-profile'

export const updateRestaurantProfileMock = http.put<
  never,
  UpdateRestaurantProfileBody
>('/profile', async ({ request }) => {
  const { name } = await request.json()

  if (name === 'Rocket Pizza') {
    return new HttpResponse(null, { status: 204 })
  }

  return new HttpResponse(null, { status: 400 })
})
