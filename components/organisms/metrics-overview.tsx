"use client"

import { MetricCard } from "@/components/molecules/metric-card"
import { useAppSelector } from "@/lib/store"
import { Skeleton } from "@/components/ui/skeleton"

export function MetricsOverview() {
  const { metrics, isLoading } = useAppSelector((state) => state.dashboard)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 bg-card rounded-lg border">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricCard label="Customers" value={metrics.customers.toLocaleString()} trend={15.3} />
      <MetricCard label="Orders" value={metrics.orders.toLocaleString()} trend={-2.5} />
      <MetricCard label="Revenue" value={metrics.revenue} prefix="$" trend={8.2} />
      <MetricCard label="Growth" value={metrics.growth} suffix="%" trend={metrics.growth} />
    </div>
  )
}
