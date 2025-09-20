import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { ordersApi, type Order, type CreateOrderRequest, type UpdateOrderRequest } from "../../api/orders"

interface OrdersState {
  orders: Order[]
  currentPage: number
  totalPages: number
  totalCount: number
  isLoading: boolean
  error: string | null
  selectedOrder: Order | null
  stats: {
    totalOrders: number
    pendingOrders: number
    completedOrders: number
    cancelledOrders: number
    totalRevenue: number
  } | null
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      console.log("[v0] Fetching orders...", { page, limit })
      const response = await ordersApi.getOrders(page, limit)
      return response.data
    } catch (error: any) {
      console.error("[v0] Orders fetch error:", error)
      return rejectWithValue(error.message || "Failed to fetch orders")
    }
  },
)

export const fetchOrder = createAsyncThunk("orders/fetchOrder", async (id: string, { rejectWithValue }) => {
  try {
    console.log("[v0] Fetching order:", id)
    const response = await ordersApi.getOrder(id)
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch order")
  }
})

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: CreateOrderRequest, { rejectWithValue }) => {
    try {
      console.log("[v0] Creating order:", orderData)
      const response = await ordersApi.createOrder(orderData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create order")
    }
  },
)

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, updates }: { id: string; updates: UpdateOrderRequest }, { rejectWithValue }) => {
    try {
      console.log("[v0] Updating order:", { id, updates })
      const response = await ordersApi.updateOrder(id, updates)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update order")
    }
  },
)

export const deleteOrder = createAsyncThunk("orders/deleteOrder", async (id: string, { rejectWithValue }) => {
  try {
    console.log("[v0] Deleting order:", id)
    await ordersApi.deleteOrder(id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to delete order")
  }
})

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }: { id: string; status: Order["status"] }, { rejectWithValue }) => {
    try {
      console.log("[v0] Updating order status:", { id, status })
      const response = await ordersApi.updateOrderStatus(id, status)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update order status")
    }
  },
)

export const fetchOrderStats = createAsyncThunk("orders/fetchOrderStats", async (_, { rejectWithValue }) => {
  try {
    console.log("[v0] Fetching order stats...")
    const response = await ordersApi.getOrderStats()
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch order stats")
  }
})

const initialState: OrdersState = {
  orders: [
    {
      id: "ORD001",
      customer: "David Craig",
      location: "Landing Page",
      member: "Machine Line Oakland",
      status: "completed",
      date: "Just now",
      amount: 1250.0,
    },
    {
      id: "ORD002",
      customer: "Andi Morrisom",
      location: "CRM Admin pages",
      member: "Larry San Francisco",
      status: "pending",
      date: "4 minutes ago",
      amount: 890.5,
    },
    {
      id: "ORD003",
      customer: "Dave Gavin",
      location: "Client Project",
      member: "Boggart Avenue Grads",
      status: "completed",
      date: "1 hour ago",
      amount: 2100.75,
    },
    {
      id: "ORD004",
      customer: "Georgina Night",
      location: "Admin Dashboard",
      member: "Restaurant Baton Rouge",
      status: "pending",
      date: "Yesterday",
      amount: 675.25,
    },
    {
      id: "ORD005",
      customer: "Andi Lane",
      location: "App Landing Page",
      member: "Next Lane Growths",
      status: "completed",
      date: "Feb 2, 2023",
      amount: 1450.0,
    },
  ],
  currentPage: 1,
  totalPages: 5,
  totalCount: 0,
  isLoading: false,
  error: null,
  selectedOrder: null,
  stats: null,
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders
        state.currentPage = action.payload.currentPage
        state.totalPages = action.payload.totalPages
        state.totalCount = action.payload.totalCount
        console.log("[v0] Orders fetched successfully:", action.payload.orders.length)
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch single order
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders.unshift(action.payload)
        state.totalCount += 1
        console.log("[v0] Order created successfully:", action.payload.id)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update order
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = action.payload
        }
        console.log("[v0] Order updated successfully:", action.payload.id)
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = state.orders.filter((order) => order.id !== action.payload)
        state.totalCount = Math.max(0, state.totalCount - 1)
        if (state.selectedOrder?.id === action.payload) {
          state.selectedOrder = null
        }
        console.log("[v0] Order deleted successfully:", action.payload)
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        if (state.selectedOrder?.id === action.payload.id) {
          state.selectedOrder = action.payload
        }
        console.log("[v0] Order status updated:", { id: action.payload.id, status: action.payload.status })
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch order stats
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.stats = action.payload
        console.log("[v0] Order stats fetched:", action.payload)
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { setLoading, setCurrentPage, clearError, setSelectedOrder } = ordersSlice.actions
export default ordersSlice.reducer
