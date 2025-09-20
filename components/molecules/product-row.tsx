import { cn } from "@/lib/utils"

interface ProductRowProps {
  name: string
  quantity: number
  revenue: number
  price: number
  className?: string
}

export function ProductRow({ name, quantity, revenue, price, className }: ProductRowProps) {
  return (
    <tr className={cn("border-b border-border last:border-b-0", className)}>
      <td className="px-4 py-3 text-sm font-medium">{name}</td>
      <td className="px-4 py-3 text-sm text-center">${price}</td>
      <td className="px-4 py-3 text-sm text-center">{quantity}</td>
      <td className="px-4 py-3 text-sm font-medium text-right">${revenue.toFixed(2)}</td>
    </tr>
  )
}
