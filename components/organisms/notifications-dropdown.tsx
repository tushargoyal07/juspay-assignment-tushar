"use client"

import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { NotificationItem } from "@/components/molecules/notification-item"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/features/notifications/notificationsSlice"
import { Bell, Check, Settings, ExternalLink, RefreshCw } from "lucide-react"

export function NotificationsDropdown() {
  const dispatch = useAppDispatch()
  const { notifications, unreadCount, isLoading, error, isRealTimeConnected } = useAppSelector(
    (state) => state.notifications,
  )
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log("[v0] Notifications dropdown mounted, fetching notifications...")
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleMarkAsRead = (id: string) => {
    console.log("[v0] Marking notification as read:", id)
    dispatch(markNotificationAsRead(id))
  }

  const handleMarkAllAsRead = () => {
    console.log("[v0] Marking all notifications as read")
    dispatch(markAllNotificationsAsRead())
  }

  const handleRefresh = () => {
    console.log("[v0] Refreshing notifications...")
    dispatch(fetchNotifications())
  }

  const recentNotifications = notifications.slice(0, 5)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          {isRealTimeConnected && <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
            {isRealTimeConnected && (
              <Badge variant="outline" className="text-xs text-green-600">
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0 || isLoading}>
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </DropdownMenuHeader>

        <DropdownMenuSeparator />

        {error && (
          <div className="p-2">
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-3 py-2 rounded-md">
              <p className="text-xs font-medium">Error loading notifications</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
          </div>
        )}

        <ScrollArea className="max-h-80">
          <div className="p-2">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg mb-1">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))
            ) : recentNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  message={notification.message}
                  time={notification.time}
                  isRead={notification.isRead}
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="mb-1"
                />
              ))
            )}
          </div>
        </ScrollArea>

        {notifications.length > 5 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
