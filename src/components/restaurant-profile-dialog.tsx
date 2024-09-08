import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateRestaurantProfile } from '@/api/update-restaurant-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const updateRestaurantProfileFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type UpdateRestaurantProfileFormData = z.infer<
  typeof updateRestaurantProfileFormSchema
>
export const RestaurantProfileDialog = () => {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity, // Definido, pois, o restaurante não é alterado com muita frequência, normalmente
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateRestaurantProfileFormData>({
    resolver: zodResolver(updateRestaurantProfileFormSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const updateManagedRestaurantCache = ({
    name,
    description,
  }: UpdateRestaurantProfileFormData) => {
    // Cached: dados de uma requisição que já foram retornados anteriormente
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateRestaurantProfileFn } = useMutation({
    mutationFn: updateRestaurantProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousRestaurantProfile: cached }
    },
    onError(_, __, context) {
      if (context?.previousRestaurantProfile) {
        updateManagedRestaurantCache(context.previousRestaurantProfile)
      }
    },
  })

  const handleUpdateRestaurantProfile = async (
    data: UpdateRestaurantProfileFormData,
  ) => {
    try {
      await updateRestaurantProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Informações atualizadas com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar informações do estabelecimento.')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateRestaurantProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="success" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
