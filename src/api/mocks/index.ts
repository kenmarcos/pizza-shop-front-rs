import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { fetchPopularProductsMock } from './fetch-popular-products-mock'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getManagedRestaurantMock } from './get-managed-restaurants-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getMonthRevenueMock } from './get-month-revenue-mock'
import { getProfileMock } from './get-profile-mock'
import { signInMock } from './sign-in-mock'
import { signUpMock } from './sign-up-mock'
import { updateRestaurantProfileMock } from './update-restaurant-profile-mock'

export const worker = setupWorker(
  signInMock,
  signUpMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  fetchPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateRestaurantProfileMock,
)

export const enableMSW = async () => {
  if (env.MODE !== 'test') {
    return // criar a aplicação React normalmente
  }

  // se for "test", antes de criar a aplicação React, ligar o MSW (mocks)
  await worker.start()
}
