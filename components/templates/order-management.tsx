"use client"

import { OrderStats } from "@/components/organisms/order-stats"
import { OrderTable } from "@/components/organisms/order-table"

export function OrderManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all your orders</p>
        </div>
      </div>

      <OrderStats />
      <OrderTable />
    </div>
  )
}
