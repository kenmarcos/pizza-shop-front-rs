import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersFormSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
})

type OrderFiltersFormData = z.infer<typeof orderFiltersFormSchema>

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, control, handleSubmit, reset } =
    useForm<OrderFiltersFormData>({
      resolver: zodResolver(orderFiltersFormSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
    })

  const handleFilter = (data: OrderFiltersFormData) => {
    setSearchParams((prev) => {
      if (data.orderId) {
        prev.set('orderId', data.orderId)
      } else {
        prev.delete('orderId')
      }

      if (data.customerName) {
        prev.set('customerName', data.customerName)
      } else {
        prev.delete('customerName')
      }

      if (data.status) {
        prev.set('status', data.status)
      } else {
        prev.delete('status')
      }

      prev.set('page', '1')

      return prev
    })
  }

  const handleClearFilters = () => {
    setSearchParams((prev) => {
      prev.delete('orderId')
      prev.delete('customerName')
      prev.delete('status')
      prev.set('page', '1')

      return prev
    })

    reset({ orderId: '', customerName: '', status: 'all' })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        {...register('orderId')}
        placeholder="Id do pedido"
        className="h-8 w-auto"
      />

      <Input
        {...register('customerName')}
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { name, value, onChange, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            value={value}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>

              <SelectItem value="pending">Pendente</SelectItem>

              <SelectItem value="canceled">Cancelado</SelectItem>

              <SelectItem value="processing">Em preparo</SelectItem>

              <SelectItem value="delivering">Em entrega</SelectItem>

              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
