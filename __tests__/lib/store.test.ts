import { store } from '@/lib/store'
import { fetchDashboardData, fetchMetrics, refreshMetrics } from '@/lib/features/dashboard/dashboardSlice'
import { fetchNotifications, markNotificationAsRead } from '@/lib/features/notifications/notificationsSlice'
import { fetchOrders, createOrder } from '@/lib/features/orders/ordersSlice'

// Mock the API calls
jest.mock('@/lib/api/dashboard', () => ({
    dashboardApi: {
        getDashboardData: jest.fn().mockResolvedValue({
            data: {
                metrics: { customers: 5000, orders: 1500, revenue: 1200, growth: 25.5 },
                chartData: [{ month: 'Jan', projected: 400, actual: 380 }],
                topProducts: [{ id: '1', name: 'Product 1', quantity: 10, revenue: 100, price: 10 }],
                revenueByLocation: [{ location: 'NYC', percentage: 50 }],
            },
        }),
        getMetrics: jest.fn().mockResolvedValue({
            data: { customers: 5000, orders: 1500, revenue: 1200, growth: 25.5 },
        }),
        refreshMetrics: jest.fn().mockResolvedValue({
            data: { customers: 5500, orders: 1600, revenue: 1300, growth: 30.0 },
        }),
    },
}))

jest.mock('@/lib/api/notifications', () => ({
    notificationsApi: {
        getNotifications: jest.fn().mockResolvedValue({
            data: {
                notifications: [
                    { id: '1', type: 'bug', message: 'Test notification', time: '9:00 AM', isRead: false, createdAt: '', updatedAt: '' },
                ],
                unreadCount: 1,
                totalCount: 1,
            },
        }),
        markAsRead: jest.fn().mockResolvedValue({
            data: { id: '1', type: 'bug', message: 'Test notification', time: '9:00 AM', isRead: true, createdAt: '', updatedAt: '' },
        }),
    },
}))

jest.mock('@/lib/api/orders', () => ({
    ordersApi: {
        getOrders: jest.fn().mockResolvedValue({
            data: {
                orders: [
                    { id: 'ORD001', customer: 'Test Customer', location: 'Test Location', member: 'Test Member', status: 'pending', date: 'Just now', amount: 100 },
                ],
                totalCount: 1,
                currentPage: 1,
                totalPages: 1,
            },
        }),
        createOrder: jest.fn().mockResolvedValue({
            data: { id: 'ORD002', customer: 'New Customer', location: 'New Location', member: 'New Member', status: 'pending', date: 'Just now', amount: 200 },
        }),
    },
}))

describe('Redux Store Integration', () => {
    beforeEach(() => {
        // Reset store state before each test
        store.dispatch({ type: 'RESET' })
    })

    it('should have correct initial state structure', () => {
        const state = store.getState()

        expect(state).toHaveProperty('dashboard')
        expect(state).toHaveProperty('orders')
        expect(state).toHaveProperty('notifications')

        expect(state.dashboard).toHaveProperty('metrics')
        expect(state.dashboard).toHaveProperty('isLoading')
        expect(state.dashboard).toHaveProperty('error')

        expect(state.orders).toHaveProperty('orders')
        expect(state.orders).toHaveProperty('isLoading')
        expect(state.orders).toHaveProperty('error')

        expect(state.notifications).toHaveProperty('notifications')
        expect(state.notifications).toHaveProperty('unreadCount')
        expect(state.notifications).toHaveProperty('isLoading')
    })

    it('should handle dashboard data fetching', async () => {
        const result = await store.dispatch(fetchDashboardData())

        expect(result.type).toBe('dashboard/fetchDashboardData/fulfilled')

        const state = store.getState()
        expect(state.dashboard.metrics.customers).toBe(5000)
        expect(state.dashboard.chartData).toHaveLength(1)
        expect(state.dashboard.topProducts).toHaveLength(1)
        expect(state.dashboard.revenueByLocation).toHaveLength(1)
    })

    it('should handle metrics fetching', async () => {
        const result = await store.dispatch(fetchMetrics())

        expect(result.type).toBe('dashboard/fetchMetrics/fulfilled')

        const state = store.getState()
        expect(state.dashboard.metrics.customers).toBe(5000)
        expect(state.dashboard.isLoading).toBe(false)
    })

    it('should handle metrics refresh', async () => {
        const result = await store.dispatch(refreshMetrics())

        expect(result.type).toBe('dashboard/refreshMetrics/fulfilled')

        const state = store.getState()
        expect(state.dashboard.metrics.customers).toBe(5500)
        expect(state.dashboard.lastUpdated).toBeDefined()
    })

    it('should handle notifications fetching', async () => {
        const result = await store.dispatch(fetchNotifications())

        expect(result.type).toBe('notifications/fetchNotifications/fulfilled')

        const state = store.getState()
        expect(state.notifications.notifications).toHaveLength(1)
        expect(state.notifications.unreadCount).toBe(1)
        expect(state.notifications.totalCount).toBe(1)
    })

    it('should handle notification mark as read', async () => {
        // First fetch notifications
        await store.dispatch(fetchNotifications())

        // Then mark as read
        const result = await store.dispatch(markNotificationAsRead('1'))

        expect(result.type).toBe('notifications/markAsRead/fulfilled')

        const state = store.getState()
        expect(state.notifications.notifications[0].isRead).toBe(true)
        expect(state.notifications.unreadCount).toBe(0)
    })

    it('should handle orders fetching', async () => {
        const result = await store.dispatch(fetchOrders({ page: 1, limit: 10 }))

        expect(result.type).toBe('orders/fetchOrders/fulfilled')

        const state = store.getState()
        expect(state.orders.orders).toHaveLength(1)
        expect(state.orders.orders[0].id).toBe('ORD001')
        expect(state.orders.totalCount).toBe(1)
    })

    it('should handle order creation', async () => {
        const newOrder = {
            customer: 'New Customer',
            location: 'New Location',
            member: 'New Member',
            amount: 200,
        }

        const result = await store.dispatch(createOrder(newOrder))

        expect(result.type).toBe('orders/createOrder/fulfilled')

        const state = store.getState()
        expect(state.orders.orders).toContainEqual(
            expect.objectContaining({
                id: 'ORD002',
                customer: 'New Customer',
                amount: 200,
            })
        )
    })

    it('should handle loading states correctly', async () => {
        // Dispatch async action
        const promise = store.dispatch(fetchDashboardData())

        // Check loading state
        let state = store.getState()
        expect(state.dashboard.isLoading).toBe(true)

        // Wait for completion
        await promise

        // Check loading state after completion
        state = store.getState()
        expect(state.dashboard.isLoading).toBe(false)
    })

    it('should handle error states correctly', async () => {
        // Mock API to reject
        const { dashboardApi } = require('@/lib/api/dashboard')
        dashboardApi.getDashboardData.mockRejectedValueOnce(new Error('Network error'))

        const result = await store.dispatch(fetchDashboardData())

        expect(result.type).toBe('dashboard/fetchDashboardData/rejected')

        const state = store.getState()
        expect(state.dashboard.error).toBe('Network error')
        expect(state.dashboard.isLoading).toBe(false)
    })
})
