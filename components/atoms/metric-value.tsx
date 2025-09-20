import { cn } from "@/lib/utils"

interface MetricValueProps {
  value: string | number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function MetricValue({ value, className, size = "md" }: MetricValueProps) {
  const sizeClasses = {
    sm: "text-lg font-semibold",
    md: "text-2xl font-bold",
    lg: "text-3xl font-bold",
  }

  return <span className={cn(sizeClasses[size], "text-foreground", className)}>{value}</span>
}
