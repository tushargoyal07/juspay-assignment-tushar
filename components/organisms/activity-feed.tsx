"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/molecules/notification-item"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { markAsRead } from "@/lib/features/notifications/notificationsSlice"
import { Activity } from "lucide-react"

interface ActivityFeedProps {
  className?: string
  maxItems?: number
}

export function ActivityFeed({ className, maxItems = 10 }: ActivityFeedProps) {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.notifications)

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }

  const recentActivity = notifications.slice(0, maxItems)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-1 p-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </div>
            ) : (
              recentActivity.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  message={notification.message}
                  time={notification.time}
                  isRead={notification.isRead}
                  onClick={() => handleMarkAsRead(notification.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
