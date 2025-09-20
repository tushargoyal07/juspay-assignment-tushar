"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { useAppSelector } from "@/lib/store"

const locationData = [
  { name: "New York", revenue: 72, color: "bg-[var(--brand-blue)]", coordinates: [-74.0, 40.7] as [number, number] },
  { name: "San Francisco", revenue: 39, color: "bg-[var(--brand-mint)]", coordinates: [-122.4, 37.8] as [number, number] },
  { name: "Sydney", revenue: 25, color: "bg-[var(--brand-purple)]", coordinates: [151.2, -33.9] as [number, number] },
  { name: "Singapore", revenue: 61, color: "bg-[var(--brand-indigo)]", coordinates: [103.8, 1.3] as [number, number] },
]

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export function RevenueByLocation() {
  const maxRevenue = Math.max(...locationData.map(loc => loc.revenue))

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">Revenue by Location</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* World Map */}
          <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-300 overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 100,
                center: [0, 20]
              }}
              width={400}
              height={160}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#e2e8f0"
                      stroke="#cbd5e1"
                      strokeWidth={0.5}
                    />
                  ))
                }
              </Geographies>
              {locationData.map((location, index) => (
                <Marker key={location.name} coordinates={location.coordinates}>
                  <circle
                    r={4}
                    fill="#000000"
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* Location breakdown with progress bars */}
          <div className="space-y-3">
            {locationData.map((location, index) => (
              <div key={location.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{location.name}</span>
                  <span className="text-sm font-bold text-foreground">{location.revenue}K</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${location.color}`}
                    style={{ width: `${(location.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
