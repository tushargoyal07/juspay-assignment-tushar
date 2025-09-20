import { apiClient, type ApiResponse } from "./client"

export interface Notification {
  id: string
  type: "bug" | "user" | "subscription" | "data" | "page"
  message: string
  time: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationsResponse {
  notifications: Notification[]
  unreadCount: number
  totalCount: number
}

export const notificationsApi = {
  async getNotifications(): Promise<ApiResponse<NotificationsResponse>> {
    return apiClient.get<NotificationsResponse>("/notifications")
  },

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return apiClient.put<Notification>(`/notifications/${id}/read`)
  },

  async markAllAsRead(): Promise<ApiResponse<{ updatedCount: number }>> {
    return apiClient.put<{ updatedCount: number }>("/notifications/read-all")
  },

  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/notifications/${id}`)
  },

  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return apiClient.get<{ count: number }>("/notifications/unread-count")
  },

  // Simulate real-time notifications
  async subscribeToNotifications(callback: (notification: Notification) => void): Promise<() => void> {
    console.log("[v0] Subscribing to real-time notifications")

    const interval = setInterval(async () => {
      // Simulate random notifications
      if (Math.random() > 0.7) {
        const mockNotification: Notification = {
          id: `notif_${Date.now()}`,
          type: ["bug", "user", "subscription", "data", "page"][Math.floor(Math.random() * 5)] as Notification["type"],
          message: [
            "New order received",
            "System update completed",
            "User registration pending",
            "Data backup finished",
            "Bug report submitted",
          ][Math.floor(Math.random() * 5)],
          time: new Date().toLocaleTimeString(),
          isRead: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        console.log("[v0] New notification received:", mockNotification)
        callback(mockNotification)
      }
    }, 10000) // Check every 10 seconds

    return () => {
      console.log("[v0] Unsubscribing from notifications")
      clearInterval(interval)
    }
  },
}
