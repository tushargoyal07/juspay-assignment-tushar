import dashboardReducer, {
    fetchDashboardData,
    fetchMetrics,
    refreshMetrics,
    setLoading,
    updateMetrics,
    clearError,
} from '@/lib/features/dashboard/dashboardSlice'
import { dashboardApi } from '@/lib/api/dashboard'

// Mock the API
jest.mock('@/lib/api/dashboard', () => ({
    dashboardApi: {
        getDashboardData: jest.fn(),
        getMetrics: jest.fn(),
        refreshMetrics: jest.fn(),
    },
}))

describe('dashboardSlice', () => {
    const initialState = {
        metrics: {
            customers: 3781,
            orders: 1219,
            revenue: 695,
            growth: 30.1,
        },
        chartData: [],
        topProducts: [],
        revenueByLocation: [],
        isLoading: false,
        error: null,
        lastUpdated: null,
    }

    it('should return the initial state', () => {
        expect(dashboardReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle setLoading', () => {
        const actual = dashboardReducer(initialState, setLoading(true))
        expect(actual.isLoading).toBe(true)
    })

    it('should handle updateMetrics', () => {
        const newMetrics = { customers: 4000, revenue: 800 }
        const actual = dashboardReducer(initialState, updateMetrics(newMetrics))
        expect(actual.metrics.customers).toBe(4000)
        expect(actual.metrics.revenue).toBe(800)
        expect(actual.metrics.orders).toBe(1219) // Should remain unchanged
    })

    it('should handle clearError', () => {
        const stateWithError = { ...initialState, error: 'Some error' }
        const actual = dashboardReducer(stateWithError, clearError())
        expect(actual.error).toBe(null)
    })

    describe('fetchDashboardData', () => {
        it('should handle fetchDashboardData.pending', () => {
            const action = { type: fetchDashboardData.pending.type }
            const state = dashboardReducer(initialState, action)
            expect(state.isLoading).toBe(true)
            expect(state.error).toBe(null)
        })

        it('should handle fetchDashboardData.fulfilled', async () => {
            const mockData = {
                metrics: { customers: 5000, orders: 1500, revenue: 1000, growth: 25.5 },
                chartData: [{ month: 'Jan', projected: 400, actual: 380 }],
                topProducts: [{ id: '1', name: 'Product 1', quantity: 10, revenue: 100, price: 10 }],
                revenueByLocation: [{ location: 'NYC', percentage: 50 }],
            }

                ; (dashboardApi.getDashboardData as jest.Mock).mockResolvedValue({
                    data: mockData,
                })

            const action = {
                type: fetchDashboardData.fulfilled.type,
                payload: mockData,
            }
            const state = dashboardReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.metrics).toEqual(mockData.metrics)
            expect(state.chartData).toEqual(mockData.chartData)
            expect(state.topProducts).toEqual(mockData.topProducts)
            expect(state.revenueByLocation).toEqual(mockData.revenueByLocation)
            expect(state.lastUpdated).toBeDefined()
        })

        it('should handle fetchDashboardData.rejected', () => {
            const action = {
                type: fetchDashboardData.rejected.type,
                payload: 'Network error',
            }
            const state = dashboardReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.error).toBe('Network error')
        })
    })

    describe('fetchMetrics', () => {
        it('should handle fetchMetrics.fulfilled', () => {
            const mockMetrics = { customers: 6000, orders: 2000, revenue: 1200, growth: 35.0 }
            const action = {
                type: fetchMetrics.fulfilled.type,
                payload: mockMetrics,
            }
            const state = dashboardReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.metrics).toEqual(mockMetrics)
            expect(state.lastUpdated).toBeDefined()
        })
    })

    describe('refreshMetrics', () => {
        it('should handle refreshMetrics.fulfilled', () => {
            const mockMetrics = { customers: 7000, orders: 2500, revenue: 1500, growth: 40.0 }
            const action = {
                type: refreshMetrics.fulfilled.type,
                payload: mockMetrics,
            }
            const state = dashboardReducer(initialState, action)

            expect(state.isLoading).toBe(false)
            expect(state.metrics).toEqual(mockMetrics)
            expect(state.lastUpdated).toBeDefined()
        })
    })
})
