"use client"

import { NotificationsPanel } from "@/components/organisms/notifications-panel"
import { ActivityFeed } from "@/components/organisms/activity-feed"

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your latest activities</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Notifications Panel */}
        <div className="space-y-4">
          <NotificationsPanel />
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
