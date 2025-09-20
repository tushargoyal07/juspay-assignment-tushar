"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { Bug, UserPlus, Radio } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationsPanelProps {
  className?: string
}

const notificationSections = [
  {
    title: "Notifications",
    items: [
      {
        id: "1",
        icon: Bug,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50 dark:bg-blue-950",
        message: "You have a bug that needs...",
        time: "Just now",
        isRead: false,
      },
      {
        id: "2",
        icon: UserPlus,
        iconColor: "text-gray-500",
        iconBg: "bg-gray-50 dark:bg-gray-800",
        message: "New user registered",
        time: "59 minutes ago",
        isRead: false,
      },
      {
        id: "3",
        icon: Bug,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-50 dark:bg-blue-950",
        message: "You have a bug that needs...",
        time: "12 hours ago",
        isRead: true,
      },
      {
        id: "4",
        icon: Radio,
        iconColor: "text-gray-500",
        iconBg: "bg-gray-50 dark:bg-gray-800",
        message: "Andi Lane subscribed to you",
        time: "Today, 11:59 AM",
        isRead: true,
      },
    ],
  },
  {
    title: "Activities",
    items: [
      {
        id: "5",
        avatar: "/diverse-user-avatars.png",
        message: "You have a bug that needs...",
        time: "Just now",
        isRead: false,
      },
      {
        id: "6",
        avatar: "/diverse-user-avatars.png",
        message: "Released a new version",
        time: "59 minutes ago",
        isRead: false,
      },
      {
        id: "7",
        avatar: "/diverse-user-avatars.png",
        message: "Submitted a bug",
        time: "12 hours ago",
        isRead: true,
      },
      {
        id: "8",
        avatar: "/diverse-user-avatars.png",
        message: "Modified A data in Page X",
        time: "Today, 11:59 AM",
        isRead: true,
      },
      {
        id: "9",
        avatar: "/diverse-user-avatars.png",
        message: "Deleted a page in Project X",
        time: "Feb 2, 2023",
        isRead: true,
      },
    ],
  },
  {
    title: "Contacts",
    items: [
      { id: "10", name: "Natali Craig", avatar: "/diverse-user-avatars.png" },
      { id: "11", name: "Drew Cano", avatar: "/diverse-user-avatars.png" },
      { id: "12", name: "Orlando Diggs", avatar: "/diverse-user-avatars.png" },
      { id: "13", name: "Andi Lane", avatar: "/diverse-user-avatars.png" },
      { id: "14", name: "Kate Morrison", avatar: "/diverse-user-avatars.png" },
      { id: "15", name: "Koray Okumus", avatar: "/diverse-user-avatars.png" },
    ],
  },
]

export function NotificationsPanel({ className }: NotificationsPanelProps) {
  const dispatch = useAppDispatch()
  const { unreadCount } = useAppSelector((state) => state.notifications)

  return (
    <Card className={cn("w-80 h-fit max-h-[600px]", className)}>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-6 space-y-6">
            {notificationSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>

                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {section.title === "Contacts" ? (
                        // Contact item layout
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={item.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{item.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                        </div>
                      ) : (
                        // Notification/Activity item layout
                        <div
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors",
                            !item.isRead && "bg-blue-50/50 dark:bg-blue-950/20",
                          )}
                        >
                          {/* Icon or Avatar */}
                          {item.icon ? (
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", item.iconBg)}>
                              <item.icon className={cn("w-4 h-4", item.iconColor)} />
                            </div>
                          ) : (
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={item.avatar || "/placeholder.svg"} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm text-foreground truncate", !item.isRead && "font-medium")}>
                              {item.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                          </div>

                          {/* Unread indicator */}
                          {!item.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {sectionIndex < notificationSections.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
