import { Search, X } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const OrderTableFilters: FC = () => {
  return (
    <form className="flex items-center gap-4">
      <span className="text-sm font-semibold">Filtros</span>
      <Input type="search" placeholder="Id do pedido" className="h-8 w-auto" />
      <Input type="search" placeholder="nome do cliente" className="h-8 w-80" />
      <Select defaultValue={'all'}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos status</SelectItem>
          <SelectItem value="pending">Pedentes</SelectItem>
          <SelectItem value="canceled">Cancelados</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button size={'xs'} variant={'secondary'} type="submit">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      <Button size={'xs'} variant={'outline'} type="button">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  )
}
