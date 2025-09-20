"use client"

import { NotificationsPanel } from "@/components/organisms/notifications-panel"
import { ActivityFeed } from "@/components/organisms/activity-feed"

export function NotificationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your latest activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationsPanel />
        <ActivityFeed />
      </div>
    </div>
  )
}
