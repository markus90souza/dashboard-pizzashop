import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table'

import { OrderTableFilters } from './components/order-table-filters'
import { OrderTableRow } from './components/order-table-row'

export const Orders: FC = () => {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>
      </div>

      <div className="space-y-2.5">
        <OrderTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableHead className="w-16"></TableHead>
              <TableHead className="w-[140px]">Identificador</TableHead>
              <TableHead className="w-[180px]">Realizado há</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[140px]">Total do pedido</TableHead>
              <TableHead className="w-[164px]"></TableHead>
              <TableHead className="w-[132px]"></TableHead>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <OrderTableRow key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
