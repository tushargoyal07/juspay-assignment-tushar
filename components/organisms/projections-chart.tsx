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
        <div className="h-full min-h-[100px]">
          <ResponsiveContainer width="100%" height="150%" className="p-0 m-0">
            <BarChart data={chartData} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid className="stroke-1" horizontal={true} vertical={false} />
              <XAxis
                dataKey="month"
                className=" text-xs"
                axisLine={true}
                tickLine={false}
              // tick={{ fontSize: 12 }}
              />
              <YAxis
                domain={[0, 300]}
                tickCount={6}
                className="var(--brand-primary) text-xs"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Bar
                className="opacity-100"
                barSize={15}
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
                barSize={15}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
