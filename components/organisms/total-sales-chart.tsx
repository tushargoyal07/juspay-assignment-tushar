"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const salesData = [
  { name: "Direct", value: 300.56, color: "hsl(var(--chart-1))" },
  { name: "Affiliate", value: 135.18, color: "hsl(var(--chart-2))" },
  { name: "Sponsored", value: 154.02, color: "hsl(var(--chart-3))" },
  { name: "E-mail", value: 48.96, color: "hsl(var(--chart-4))" },
]

export function TotalSalesChart() {
  const total = salesData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-30 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* <Tooltip
                formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  strokeLinejoin: 'round'
                }}
              /> */}
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                // cornerRadius={15}
                maxRadius={80}
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
                cornerRadius={6}
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {salesData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">${item.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent >
    </Card >
  )
}
