import { cn } from "@/lib/utils"
import { Bug, User, CreditCard, Database, FileText } from "lucide-react"

interface NotificationIconProps {
  type: "bug" | "user" | "subscription" | "data" | "page"
  className?: string
}

export function NotificationIcon({ type, className }: NotificationIconProps) {
  const icons = {
    bug: Bug,
    user: User,
    subscription: CreditCard,
    data: Database,
    page: FileText,
  }

  const Icon = icons[type]

  const iconColors = {
    bug: "text-red-500",
    user: "text-blue-500",
    subscription: "text-green-500",
    data: "text-purple-500",
    page: "text-orange-500",
  }

  return (
    <div className={cn("flex items-center justify-center w-8 h-8 rounded-full bg-muted", className)}>
      <Icon className={cn("w-4 h-4", iconColors[type])} />
    </div>
  )
}
