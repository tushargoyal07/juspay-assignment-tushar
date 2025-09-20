"use client"

import { NotificationIcon } from "@/components/atoms/notification-icon"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  type: "bug" | "user" | "subscription" | "data" | "page"
  message: string
  time: string
  isRead: boolean
  onClick?: () => void
  className?: string
}

export function NotificationItem({ type, message, time, isRead, onClick, className }: NotificationItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
        !isRead && "bg-blue-50/50",
        className,
      )}
      onClick={onClick}
    >
      <NotificationIcon type={type} />
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm truncate", !isRead ? "font-medium text-foreground" : "text-muted-foreground")}>
          {message}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
      {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
    </div>
  )
}
