type OrderStatus =
  | 'pending'
  | 'canceled'
  | 'delivering'
  | 'delivered'
  | 'processing'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap = {
  pending: {
    label: 'Pending',
    color: 'bg-slate-400',
  },
  canceled: {
    label: 'Canceled',
    color: 'bg-rose-500',
  },
  delivering: {
    label: 'Delivering',
    color: 'bg-amber-500',
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-emerald-500',
  },
  processing: {
    label: 'Processing',
    color: 'bg-amber-500',
  },
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      ></span>
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].label}
      </span>
    </div>
  )
}
