"use client"

import { DashboardLayout } from "@/components/organisms/dashboard-layout"
import { AnalyticsDashboard } from "@/components/templates/analytics-dashboard"

export default function HomePage() {
  return (
    <DashboardLayout>
      <AnalyticsDashboard />
    </DashboardLayout>
  )
}
