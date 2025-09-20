"use client"

import { DashboardLayout } from "@/components/organisms/dashboard-layout"
import { OrderManagement } from "@/components/templates/order-management"

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrderManagement />
    </DashboardLayout>
  )
}
