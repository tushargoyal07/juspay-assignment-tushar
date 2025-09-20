import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "pending" | "completed" | "cancelled"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
