"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, CartesianAxis } from "recharts"
import { useAppSelector } from "@/lib/store"

export function ProjectionsChart() {
  const chartData = useAppSelector((state) => state.dashboard.chartData)

  return (
    <Card className="h-full pb-0">
      <CardHeader className="pb-0 m-0">
        <CardTitle className="text-lg font-semibold text-foreground">Projections vs Actuals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%" className="p-0 m-0">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 5,
                bottom: 5
              }}
            >
              <CartesianGrid className="stroke-1" horizontal={true} vertical={false} />
              <XAxis
                dataKey="month"
                className="text-xs sm:text-sm"
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <YAxis
                domain={[0, 300]}
                tickCount={4}
                className="text-xs sm:text-sm"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9 }}
              />
              <Bar
                className="opacity-100"
                barSize={20}
                dataKey="actual"
                radius={[0, 0, 0, 0]}
                fill="var(--brand-blue)"
                name="Actual"
                stackId="stack"
              />

              <Bar
                className="opacity-50"
                dataKey="projected"
                fill="var(--brand-blue)"
                name="Projected"
                radius={[4, 4, 0, 0]}
                stackId="stack"
                barSize={20}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
