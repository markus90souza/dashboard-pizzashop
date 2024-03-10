import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile } from '@/api/update-profile'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileData = z.infer<typeof storeProfileSchema>

export const StoreProfileModal: FC = () => {
  const queryClient = useQueryClient()

  const { data: managedRestaurnat } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurnat?.name ?? '',
      description: managedRestaurnat?.description ?? '',
    },
  })

  const updateProfileCached = ({ name, description }: StoreProfileData) => {
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

  const { mutateAsync: onUpdateProfile } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateProfileCached({ name, description })

      return {
        previousProfile: cached,
      }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateProfileCached(context.previousProfile)
      }
    },
  })

  const handleUpdateProfile = async ({
    name,
    description,
  }: StoreProfileData) => {
    try {
      await onUpdateProfile({ name, description })
      toast.success('Perfil atualizado com sucesso')
    } catch {
      toast.error('Error ao atualizar perfil')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do estabelecimento visiveis ao seus clientes
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3 resize-none"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'} type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              'Salvar'
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
