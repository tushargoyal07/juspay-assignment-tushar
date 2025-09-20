import { apiClient, type ApiResponse } from "./client"

export interface DashboardMetrics {
  customers: number
  orders: number
  revenue: number
  growth: number
}

export interface ChartData {
  month: string
  projected: number
  actual: number
}

export interface ProductSales {
  id: string
  name: string
  quantity: number
  revenue: number
  price: number
}

export interface RevenueByLocation {
  location: string
  percentage: number
}

export interface DashboardData {
  metrics: DashboardMetrics
  chartData: ChartData[]
  topProducts: ProductSales[]
  revenueByLocation: RevenueByLocation[]
}

export const dashboardApi = {
  async getMetrics(): Promise<ApiResponse<DashboardMetrics>> {
    return apiClient.get<DashboardMetrics>("/dashboard/metrics")
  },

  async getChartData(): Promise<ApiResponse<ChartData[]>> {
    return apiClient.get<ChartData[]>("/dashboard/chart-data")
  },

  async getTopProducts(): Promise<ApiResponse<ProductSales[]>> {
    return apiClient.get<ProductSales[]>("/dashboard/top-products")
  },

  async getRevenueByLocation(): Promise<ApiResponse<RevenueByLocation[]>> {
    return apiClient.get<RevenueByLocation[]>("/dashboard/revenue-by-location")
  },

  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return apiClient.get<DashboardData>("/dashboard/overview")
  },

  async refreshMetrics(): Promise<ApiResponse<DashboardMetrics>> {
    return apiClient.post<DashboardMetrics>("/dashboard/refresh-metrics")
  },
}
