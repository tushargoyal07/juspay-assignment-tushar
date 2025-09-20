"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/atoms/status-badge"
import { useAppDispatch } from "@/lib/store"
import { updateOrderStatus } from "@/lib/features/orders/ordersSlice"

interface Order {
  id: string
  customer: string
  location: string
  member: string
  status: "pending" | "completed" | "cancelled"
  date: string
  amount: number
}

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const dispatch = useAppDispatch()
  const [isUpdating, setIsUpdating] = useState(false)

  if (!order) return null

  const handleStatusUpdate = async (newStatus: Order["status"]) => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    dispatch(updateOrderStatus({ id: order.id, status: newStatus }))
    setIsUpdating(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>View and manage order information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Order ID</span>
            <Badge variant="outline">{order.id}</Badge>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Customer</span>
              <span className="text-sm font-medium">{order.customer}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Location</span>
              <span className="text-sm">{order.location}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Member</span>
              <span className="text-sm">{order.member}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={order.status} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm">{order.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium">${order.amount.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Update Status</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={order.status === "pending" ? "default" : "outline"}
                onClick={() => handleStatusUpdate("pending")}
                disabled={isUpdating || order.status === "pending"}
              >
                Pending
              </Button>
              <Button
                size="sm"
                variant={order.status === "completed" ? "default" : "outline"}
                onClick={() => handleStatusUpdate("completed")}
                disabled={isUpdating || order.status === "completed"}
              >
                Completed
              </Button>
              <Button
                size="sm"
                variant={order.status === "cancelled" ? "destructive" : "outline"}
                onClick={() => handleStatusUpdate("cancelled")}
                disabled={isUpdating || order.status === "cancelled"}
              >
                Cancelled
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
