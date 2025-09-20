"use client"

import { useState } from "react"
import { StatusBadge } from "@/components/atoms/status-badge"
import { OrderDetailsModal } from "@/components/organisms/order-details-modal"
import { cn } from "@/lib/utils"

interface TableRowProps {
  id: string
  customer: string
  location: string
  member: string
  status: "pending" | "completed" | "cancelled"
  date: string
  amount: number
  className?: string
}

export function TableRow({ id, customer, location, member, status, date, amount, className }: TableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const orderData = {
    id,
    customer,
    location,
    member,
    status,
    date,
    amount,
  }

  return (
    <>
      <tr
        className={cn("border-b border-border hover:bg-muted/50 cursor-pointer", className)}
        onClick={() => setIsModalOpen(true)}
      >
        <td className="px-4 py-3 text-sm font-medium">{id}</td>
        <td className="px-4 py-3 text-sm">{customer}</td>
        <td className="px-4 py-3 text-sm text-muted-foreground">{location}</td>
        <td className="px-4 py-3 text-sm text-muted-foreground">{member}</td>
        <td className="px-4 py-3">
          <StatusBadge status={status} />
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground">{date}</td>
        <td className="px-4 py-3 text-sm font-medium">${amount.toFixed(2)}</td>
      </tr>

      <OrderDetailsModal order={orderData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
