import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table'

import { OrderTableFilters } from './components/order-table-filters'
import { OrderTableRow } from './components/order-table-row'

export const Orders: FC = () => {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Pedidos</h2>

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
                {data?.orders &&
                  data.orders.map((order) => (
                    <OrderTableRow key={order.orderId} orders={order} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination total={100} pageIndex={0} perPage={5} key={''} />
        </div>
      </div>
    </>
  )
}
