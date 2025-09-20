"use client"

import { useEffect } from "react"
import { MetricsOverview } from "@/components/organisms/metrics-overview"
import { ProjectionsChart } from "@/components/organisms/projections-chart"
import { RevenueChart } from "@/components/organisms/revenue-chart"
import { RevenueByLocation } from "@/components/organisms/revenue-by-location"
import { TopSellingProducts } from "@/components/organisms/top-selling-products"
import { TotalSalesChart } from "@/components/organisms/total-sales-chart"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { fetchDashboardData, refreshMetrics } from "@/lib/features/dashboard/dashboardSlice"
import { subscribeToRealTimeNotifications } from "@/lib/features/notifications/notificationsSlice"

export function AnalyticsDashboard() {
  const dispatch = useAppDispatch()
  const { isLoading, error, lastUpdated } = useAppSelector((state) => state.dashboard)
  const { isRealTimeConnected } = useAppSelector((state) => state.notifications)

  useEffect(() => {
    console.log("[v0] Analytics dashboard mounted, fetching data...")
    dispatch(fetchDashboardData())

    if (!isRealTimeConnected) {
      dispatch(subscribeToRealTimeNotifications())
    }
  }, [dispatch, isRealTimeConnected])

  const handleRefresh = () => {
    console.log("[v0] Refreshing dashboard metrics...")
    dispatch(refreshMetrics())
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">eCommerce</h1>
        <Button onClick={handleRefresh} disabled={isLoading} variant="outline" size="sm">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          <p className="text-sm font-medium">Error loading dashboard data</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Top Section - Metrics and Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsOverview />

        <ProjectionsChart />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        <div className="space-y-6">
          <RevenueByLocation />
        </div>
      </div>
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <TopSellingProducts />
        </div>
        <div className="space-y-6">
          <TotalSalesChart />
        </div>
      </div>
    </div >
  )
}
