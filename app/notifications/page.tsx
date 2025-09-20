"use client"

import { DashboardLayout } from "@/components/organisms/dashboard-layout"
import { NotificationsPage } from "@/components/templates/notifications-page"

export default function NotificationsPageRoute() {
  return (
    <DashboardLayout>
      <NotificationsPage />
    </DashboardLayout>
  )
}
