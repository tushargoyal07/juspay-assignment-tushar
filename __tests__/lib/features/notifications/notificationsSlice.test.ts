import notificationsReducer, {
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    addNotification,
    markAsRead,
    markAllAsRead,
} from '@/lib/features/notifications/notificationsSlice'
import { notificationsApi } from '@/lib/api/notifications'

// Mock the API
jest.mock('@/lib/api/notifications', () => ({
    notificationsApi: {
        getNotifications: jest.fn(),
        markAsRead: jest.fn(),
        markAllAsRead: jest.fn(),
        deleteNotification: jest.fn(),
    },
}))

describe('notificationsSlice', () => {
    const initialState = {
        notifications: [],
        unreadCount: 0,
        totalCount: 0,
        isLoading: false,
        error: null,
        isRealTimeConnected: false,
    }

    it('should return the initial state', () => {
        expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    describe('markAsRead', () => {
        it('should mark a notification as read', () => {
            const state = {
                ...initialState,
                notifications: [
                    { id: '1', isRead: false, message: 'Test', time: '9:00 AM', type: 'bug', createdAt: '', updatedAt: '' },
                    { id: '2', isRead: false, message: 'Test 2', time: '10:00 AM', type: 'user', createdAt: '', updatedAt: '' },
                ],
                unreadCount: 2,
            }

            const action = markAsRead('1')
            const newState = notificationsReducer(state, action)

            expect(newState.notifications[0].isRead).toBe(true)
            expect(newState.unreadCount).toBe(1)
        })

        it('should not change unreadCount if notification is already read', () => {
            const state = {
                ...initialState,
                notifications: [
                    { id: '1', isRead: true, message: 'Test', time: '9:00 AM', type: 'bug', createdAt: '', updatedAt: '' },
                ],
                unreadCount: 0,
            }

            const action = markAsRead('1')
            const newState = notificationsReducer(state, action)

            expect(newState.unreadCount).toBe(0)
        })
    })

    describe('markAllAsRead', () => {
        it('should mark all notifications as read', () => {
            const state = {
                ...initialState,
                notifications: [
                    { id: '1', isRead: false, message: 'Test', time: '9:00 AM', type: 'bug', createdAt: '', updatedAt: '' },
                    { id: '2', isRead: false, message: 'Test 2', time: '10:00 AM', type: 'user', createdAt: '', updatedAt: '' },
                ],
                unreadCount: 2,
            }

            const action = markAllAsRead()
            const newState = notificationsReducer(state, action)

            expect(newState.notifications.every(n => n.isRead)).toBe(true)
            expect(newState.unreadCount).toBe(0)
        })
    })

    describe('addNotification', () => {
        it('should add a new notification', () => {
            const newNotification = {
                id: '3',
                type: 'bug' as const,
                message: 'New bug report',
                time: '11:00 AM',
                isRead: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            const action = addNotification(newNotification)
            const newState = notificationsReducer(initialState, action)

            expect(newState.notifications).toHaveLength(1)
            expect(newState.notifications[0]).toEqual(newNotification)
            expect(newState.unreadCount).toBe(1)
            expect(newState.totalCount).toBe(1)
        })

        it('should not increment unreadCount for read notifications', () => {
            const readNotification = {
                id: '3',
                type: 'bug' as const,
                message: 'Read notification',
                time: '11:00 AM',
                isRead: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }

            const action = addNotification(readNotification)
            const newState = notificationsReducer(initialState, action)

            expect(newState.unreadCount).toBe(0)
            expect(newState.totalCount).toBe(1)
        })
    })

    describe('fetchNotifications', () => {
        it('should handle fetchNotifications.fulfilled', () => {
            const mockData = {
                notifications: [
                    { id: '1', type: 'bug', message: 'Test', time: '9:00 AM', isRead: false, createdAt: '', updatedAt: '' },
                ],
                unreadCount: 1,
                totalCount: 1,
            }

            const action = {
                type: fetchNotifications.fulfilled.type,
                payload: mockData,
            }
            const state = notificationsReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.notifications).toEqual(mockData.notifications)
            expect(state.unreadCount).toBe(1)
            expect(state.totalCount).toBe(1)
        })

        it('should handle fetchNotifications.rejected', () => {
            const action = {
                type: fetchNotifications.rejected.type,
                payload: 'Network error',
            }
            const state = notificationsReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.error).toBe('Network error')
        })
    })

    describe('deleteNotification', () => {
        it('should handle deleteNotification.fulfilled', () => {
            const state = {
                ...initialState,
                notifications: [
                    { id: '1', isRead: false, message: 'Test', time: '9:00 AM', type: 'bug', createdAt: '', updatedAt: '' },
                    { id: '2', isRead: true, message: 'Test 2', time: '10:00 AM', type: 'user', createdAt: '', updatedAt: '' },
                ],
                unreadCount: 1,
                totalCount: 2,
            }

            const action = {
                type: deleteNotification.fulfilled.type,
                payload: '1',
            }
            const newState = notificationsReducer(state, action)

            expect(newState.notifications).toHaveLength(1)
            expect(newState.notifications[0].id).toBe('2')
            expect(newState.unreadCount).toBe(0)
            expect(newState.totalCount).toBe(1)
        })
    })
})
