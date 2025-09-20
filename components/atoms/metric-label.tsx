import type React from "react"
import { cn } from "@/lib/utils"

interface MetricLabelProps {
  children: React.ReactNode
  className?: string
}

export function MetricLabel({ children, className }: MetricLabelProps) {
  return <span className={cn("text-sm text-muted-foreground font-medium", className)}>{children}</span>
}
