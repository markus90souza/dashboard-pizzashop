import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { Button } from '@/components/ui/button'
import {
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
  description: z.string(),
})
type StoreProfileData = z.infer<typeof storeProfileSchema>

export const StoreProfileModal: FC = () => {
  const { data: managedRestaurnat } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const { register } = useForm<StoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurnat?.name ?? '',
      description: managedRestaurnat?.description ?? '',
    },
  })
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do estabelecimento visiveis ao seus clientes
        </DialogDescription>
      </DialogHeader>

      <form action="">
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
          <Button variant={'outline'} type="button">
            Cancelar
          </Button>
          <Button type="submit" variant={'success'}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
