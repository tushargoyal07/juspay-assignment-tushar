import { render, screen } from '@/__tests__/utils/test-utils'
import { MetricsOverview } from '@/components/organisms/metrics-overview'

// Mock the Redux store with initial state
const mockStore = {
    dashboard: {
        metrics: {
            customers: 5000,
            orders: 1500,
            revenue: 1200,
            growth: 25.5,
        },
        isLoading: false,
        error: null,
    },
}

describe('MetricsOverview', () => {
    it('renders all metric cards with correct data', () => {
        render(<MetricsOverview />, { preloadedState: mockStore })

        expect(screen.getByText('Customers')).toBeInTheDocument()
        expect(screen.getByText('5,000')).toBeInTheDocument()

        expect(screen.getByText('Orders')).toBeInTheDocument()
        expect(screen.getByText('1,500')).toBeInTheDocument()

        expect(screen.getByText('Revenue')).toBeInTheDocument()
        expect(screen.getByText('$1200')).toBeInTheDocument()

        expect(screen.getByText('Growth')).toBeInTheDocument()
        expect(screen.getAllByText('25.5%')).toHaveLength(2) // Multiple 25.5% elements
    })

    it('shows loading skeleton when isLoading is true', () => {
        const loadingStore = {
            dashboard: {
                ...mockStore.dashboard,
                isLoading: true,
            },
        }

        render(<MetricsOverview />, { preloadedState: loadingStore })

        // Should show skeleton components
        const skeletons = screen.getAllByRole('generic', { name: '' }) // Skeleton components
        expect(skeletons).toHaveLength(18) // 4 cards * 3 skeletons each + other elements
    })

    it('displays correct trend indicators', () => {
        render(<MetricsOverview />, { preloadedState: mockStore })

        // Check for trend indicators (these would be in the MetricCard components)
        const trendElements = screen.getAllByText(/\d+\.\d+%/)
        expect(trendElements.length).toBeGreaterThan(0)
    })

    it('handles empty metrics gracefully', () => {
        const emptyStore = {
            dashboard: {
                metrics: {
                    customers: 0,
                    orders: 0,
                    revenue: 0,
                    growth: 0,
                },
                isLoading: false,
                error: null,
            },
        }

        render(<MetricsOverview />, { preloadedState: emptyStore })

        expect(screen.getAllByText('0')).toHaveLength(3) // Multiple 0 values
        expect(screen.getByText('$0')).toBeInTheDocument()
        expect(screen.getByText('0%')).toBeInTheDocument()
    })

    it('renders in a grid layout', () => {
        render(<MetricsOverview />, { preloadedState: mockStore })

        const container = screen.getByText('Customers').closest('div')?.parentElement?.parentElement
        expect(container).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2')
    })
})
