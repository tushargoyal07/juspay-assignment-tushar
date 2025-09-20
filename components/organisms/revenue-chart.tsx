"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const revenueData = [
  { period: "Current Week", value: 58.16 },
  { period: "Previous Week", value: 68.32 },
]

const trendData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 800 },
  { month: "May", value: 500 },
  { month: "Jun", value: 700 },
]

export function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Revenue</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div key={item.period} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-[var(--brand-primary)]" : "bg-[var(--brand-blue)]"}`} />
                <span className="text-sm text-muted-foreground">{item.period}</span>
              </div>
              <span className="text-sm font-medium text-foreground">${item.value}</span>
            </div>
          ))}
        </div>

        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                className="text-xs text-muted-foreground"
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--brand-primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "var(--brand-purple)", stroke: "var(--brand-purple)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
