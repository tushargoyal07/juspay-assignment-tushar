import { apiClient, type ApiResponse } from "./client"

export interface Order {
  id: string
  customer: string
  location: string
  member: string
  status: "pending" | "completed" | "cancelled"
  date: string
  amount: number
}

export interface OrdersResponse {
  orders: Order[]
  totalCount: number
  currentPage: number
  totalPages: number
}

export interface CreateOrderRequest {
  customer: string
  location: string
  member: string
  amount: number
}

export interface UpdateOrderRequest {
  customer?: string
  location?: string
  member?: string
  status?: Order["status"]
  amount?: number
}

export const ordersApi = {
  async getOrders(page = 1, limit = 10): Promise<ApiResponse<OrdersResponse>> {
    return apiClient.get<OrdersResponse>(`/orders?page=${page}&limit=${limit}`)
  },

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    return apiClient.get<Order>(`/orders/${id}`)
  },

  async createOrder(order: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return apiClient.post<Order>("/orders", order)
  },

  async updateOrder(id: string, updates: UpdateOrderRequest): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}`, updates)
  },

  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/orders/${id}`)
  },

  async updateOrderStatus(id: string, status: Order["status"]): Promise<ApiResponse<Order>> {
    return apiClient.put<Order>(`/orders/${id}/status`, { status })
  },

  async getOrderStats(): Promise<
    ApiResponse<{
      totalOrders: number
      pendingOrders: number
      completedOrders: number
      cancelledOrders: number
      totalRevenue: number
    }>
  > {
    return apiClient.get("/orders/stats")
  },
}
