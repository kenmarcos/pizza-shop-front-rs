import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from './components/day-orders-amount-card '
import { MonthCanceledOrdersAmountCard } from './components/month-canceled-orders-amount-card'
import { MonthOrdersAmountCard } from './components/month-orders-amount-card'
import { MonthRevenueCard } from './components/month-revenue-card'

export const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
      </div>
    </>
  )
}
