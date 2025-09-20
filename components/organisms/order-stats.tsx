"use client"

import { useEffect } from "react"
import { MetricCard } from "@/components/molecules/metric-card"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { fetchOrderStats } from "@/lib/features/orders/ordersSlice"

export function OrderStats() {
  const dispatch = useAppDispatch()
  const { stats, isLoading } = useAppSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrderStats())
  }, [dispatch])

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard label="Total Orders" value={stats.totalOrders} trend={12.5} />
      <MetricCard label="Completed Orders" value={stats.completedOrders} trend={8.3} />
      <MetricCard label="Pending Orders" value={stats.pendingOrders} trend={-5.2} />
      <MetricCard label="Total Revenue" value={stats.totalRevenue.toFixed(2)} prefix="$" trend={15.7} />
    </div>
  )
}
