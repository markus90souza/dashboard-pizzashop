import type { FC } from 'react'

type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

type OrderStatusProps = {
  status: OrderStatus
}

const orderStatus: Record<OrderStatus, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  processing: 'Em preparo',
  delivering: 'Em entrega',
  delivered: 'Entregue',
}

const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}

      {status === 'canceled' && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}

      {/* {status === 'processing' && (
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
      )} */}

      {/* {status === 'delivering' && (
        <span className="h-2 w-2 rounded-full bg-blue-400" />
      )} */}

      {['delivering', 'processing'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      )}

      {status === 'delivered' && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatus[status]}
      </span>
    </div>
  )
}

export { OrderStatus }
