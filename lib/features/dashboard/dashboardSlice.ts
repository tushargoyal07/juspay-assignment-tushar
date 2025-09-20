import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import {
  dashboardApi,
  type DashboardMetrics,
  type ChartData,
  type ProductSales,
  type RevenueByLocation,
} from "../../api/dashboard"

interface DashboardState {
  metrics: DashboardMetrics
  chartData: ChartData[]
  topProducts: ProductSales[]
  revenueByLocation: RevenueByLocation[]
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
}

export const fetchDashboardData = createAsyncThunk("dashboard/fetchDashboardData", async (_, { rejectWithValue }) => {
  try {
    console.log("[v0] Fetching dashboard data...")
    const response = await dashboardApi.getDashboardData()
    return response.data
  } catch (error: any) {
    console.error("[v0] Dashboard fetch error:", error)
    return rejectWithValue(error.message || "Failed to fetch dashboard data")
  }
})

export const fetchMetrics = createAsyncThunk("dashboard/fetchMetrics", async (_, { rejectWithValue }) => {
  try {
    const response = await dashboardApi.getMetrics()
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch metrics")
  }
})

export const refreshMetrics = createAsyncThunk("dashboard/refreshMetrics", async (_, { rejectWithValue }) => {
  try {
    console.log("[v0] Refreshing metrics...")
    const response = await dashboardApi.refreshMetrics()
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to refresh metrics")
  }
})

const initialState: DashboardState = {
  metrics: {
    customers: 3781,
    orders: 1219,
    revenue: 695,
    growth: 30.1,
  },
  chartData: [
    { month: "Jan", projected: 400, actual: 380 },
    { month: "Feb", projected: 450, actual: 420 },
    { month: "Mar", projected: 500, actual: 480 },
    { month: "Apr", projected: 550, actual: 520 },
    { month: "May", projected: 600, actual: 580 },
    { month: "Jun", projected: 650, actual: 620 },
  ],
  topProducts: [
    { id: "1", name: "ASUS Rolex-high Wrist", quantity: 82, revenue: 3158.18 },
    { id: "2", name: "Marco Lightweight Shirt", quantity: 37, revenue: 2745.95 },
    { id: "3", name: "Half Sleeve Shirt", quantity: 64, revenue: 2155.48 },
    { id: "4", name: "Lightweight Jacket", quantity: 184, revenue: 1480.0 },
    { id: "5", name: "Marco Shoes", quantity: 64, revenue: 1768.57 },
  ],
  revenueByLocation: [
    { location: "New York", percentage: 40 },
    { location: "San Francisco", percentage: 30 },
    { location: "Sydney", percentage: 20 },
    { location: "Singapore", percentage: 10 },
  ],
  isLoading: false,
  error: null,
  lastUpdated: null,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateMetrics: (state, action: PayloadAction<Partial<DashboardMetrics>>) => {
      state.metrics = { ...state.metrics, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard data
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false
        state.metrics = action.payload.metrics
        state.chartData = action.payload.chartData
        state.topProducts = action.payload.topProducts
        state.revenueByLocation = action.payload.revenueByLocation
        state.lastUpdated = new Date().toISOString()
        console.log("[v0] Dashboard data updated successfully")
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        console.error("[v0] Dashboard data fetch failed:", action.payload)
      })
      // Fetch metrics
      .addCase(fetchMetrics.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.isLoading = false
        state.metrics = action.payload
        state.lastUpdated = new Date().toISOString()
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Refresh metrics
      .addCase(refreshMetrics.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refreshMetrics.fulfilled, (state, action) => {
        state.isLoading = false
        state.metrics = action.payload
        state.lastUpdated = new Date().toISOString()
        console.log("[v0] Metrics refreshed successfully")
      })
      .addCase(refreshMetrics.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setLoading, updateMetrics, clearError } = dashboardSlice.actions
export default dashboardSlice.reducer
