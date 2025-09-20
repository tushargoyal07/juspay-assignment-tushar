import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { notificationsApi, type Notification } from "../../api/notifications"

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  totalCount: number
  isLoading: boolean
  error: string | null
  isRealTimeConnected: boolean
}

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      console.log("[v0] Fetching notifications...")
      const response = await notificationsApi.getNotifications()
      return response.data
    } catch (error: any) {
      console.error("[v0] Notifications fetch error:", error)
      return rejectWithValue(error.message || "Failed to fetch notifications")
    }
  },
)

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("[v0] Marking notification as read:", id)
      const response = await notificationsApi.markAsRead(id)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to mark notification as read")
    }
  },
)

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      console.log("[v0] Marking all notifications as read...")
      const response = await notificationsApi.markAllAsRead()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to mark all notifications as read")
    }
  },
)

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      console.log("[v0] Deleting notification:", id)
      await notificationsApi.deleteNotification(id)
      return id
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete notification")
    }
  },
)

export const fetchUnreadCount = createAsyncThunk("notifications/fetchUnreadCount", async (_, { rejectWithValue }) => {
  try {
    const response = await notificationsApi.getUnreadCount()
    return response.data.count
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch unread count")
  }
})

export const subscribeToRealTimeNotifications = createAsyncThunk(
  "notifications/subscribeToRealTime",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log("[v0] Subscribing to real-time notifications...")
      const unsubscribe = await notificationsApi.subscribeToNotifications((notification) => {
        dispatch(addNotification(notification))
      })
      return unsubscribe
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to subscribe to real-time notifications")
    }
  },
)

const initialState: NotificationsState = {
  notifications: [
    {
      id: "1",
      type: "bug",
      message: "You have a bug that needs...",
      time: "9:00 AM",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      type: "user",
      message: "New user registered",
      time: "8:45 AM",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      type: "bug",
      message: "You have a bug that needs...",
      time: "8:30 AM",
      isRead: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      type: "subscription",
      message: "Andi Lane subscribed to you",
      time: "8:15 AM",
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "5",
      type: "data",
      message: "Released a new version",
      time: "8:00 AM",
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "6",
      type: "bug",
      message: "Submitted a bug",
      time: "7:45 AM",
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "7",
      type: "data",
      message: "Modified a data in Figma",
      time: "7:30 AM",
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "8",
      type: "page",
      message: "Deleted a page in Project X",
      time: "7:15 AM",
      isRead: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  unreadCount: 3,
  totalCount: 8,
  isLoading: false,
  error: null,
  isRealTimeConnected: false,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload)
      if (notification && !notification.isRead) {
        notification.isRead = true
        state.unreadCount = Math.max(0, state.unreadCount - 1)
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isRead = true))
      state.unreadCount = 0
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.isRead) {
        state.unreadCount += 1
      }
      state.totalCount += 1
      console.log("[v0] New notification added:", action.payload.message)
    },
    clearError: (state) => {
      state.error = null
    },
    setRealTimeConnection: (state, action: PayloadAction<boolean>) => {
      state.isRealTimeConnected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.notifications = action.payload.notifications
        state.unreadCount = action.payload.unreadCount
        state.totalCount = action.payload.totalCount
        console.log("[v0] Notifications fetched successfully:", action.payload.notifications.length)
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Mark as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find((n) => n.id === action.payload.id)
        if (notification && !notification.isRead) {
          notification.isRead = true
          notification.updatedAt = action.payload.updatedAt
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
        console.log("[v0] Notification marked as read:", action.payload.id)
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Mark all as read
      .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.isLoading = false
        state.notifications.forEach((n) => {
          n.isRead = true
          n.updatedAt = new Date().toISOString()
        })
        state.unreadCount = 0
        console.log("[v0] All notifications marked as read:", action.payload.updatedCount)
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notification = state.notifications.find((n) => n.id === action.payload)
        if (notification && !notification.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
        state.notifications = state.notifications.filter((n) => n.id !== action.payload)
        state.totalCount = Math.max(0, state.totalCount - 1)
        console.log("[v0] Notification deleted:", action.payload)
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch unread count
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload
      })
      // Real-time subscription
      .addCase(subscribeToRealTimeNotifications.fulfilled, (state) => {
        state.isRealTimeConnected = true
        console.log("[v0] Real-time notifications connected")
      })
      .addCase(subscribeToRealTimeNotifications.rejected, (state, action) => {
        state.isRealTimeConnected = false
        state.error = action.payload as string
        console.error("[v0] Real-time notifications connection failed:", action.payload)
      })
  },
})

export const { markAsRead, markAllAsRead, addNotification, clearError, setRealTimeConnection } =
  notificationsSlice.actions
export default notificationsSlice.reducer
