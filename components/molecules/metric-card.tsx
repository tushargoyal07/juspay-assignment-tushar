import { Card, CardContent } from "@/components/ui/card"
import { MetricValue } from "@/components/atoms/metric-value"
import { MetricLabel } from "@/components/atoms/metric-label"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string | number
  trend?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function MetricCard({ label, value, trend, prefix, suffix, className }: MetricCardProps) {
  const displayValue = `${prefix || ""}${value}${suffix || ""}`
  const isPositiveTrend = trend && trend > 0
  const isNegativeTrend = trend && trend < 0

  return (
    <Card className={cn("p-6", className)}>
      <CardContent className="p-0 space-y-2">
        <MetricLabel>{label}</MetricLabel>
        <div className="flex items-center justify-between">
          <MetricValue value={displayValue} />
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositiveTrend && "text-[var(--brand-blue)]",
                isNegativeTrend && "text-[var(--destructive)]",
              )}
            >
              {isPositiveTrend && <TrendingUp className="w-4 h-4" />}
              {isNegativeTrend && <TrendingDown className="w-4 h-4" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
