import { render, screen } from '@/__tests__/utils/test-utils'
import { MetricCard } from '@/components/molecules/metric-card'

describe('MetricCard', () => {
    it('renders with correct label and value', () => {
        render(
            <MetricCard
                label="Test Metric"
                value="1,234"
                trend={5.2}
            />
        )

        expect(screen.getByText('Test Metric')).toBeInTheDocument()
        expect(screen.getByText('1,234')).toBeInTheDocument()
        expect(screen.getByText('5.2%')).toBeInTheDocument()
    })

    it('renders with prefix and suffix', () => {
        render(
            <MetricCard
                label="Revenue"
                value="1,234"
                prefix="$"
                suffix="K"
                trend={-2.1}
            />
        )

        expect(screen.getByText('Revenue')).toBeInTheDocument()
        expect(screen.getByText('$1,234K')).toBeInTheDocument()
        expect(screen.getByText('2.1%')).toBeInTheDocument() // Component shows abs(trend)
    })

    it('applies correct trend styling for positive trend', () => {
        render(
            <MetricCard
                label="Growth"
                value="15.3"
                trend={5.2}
            />
        )

        const trendElement = screen.getByText('5.2%')
        expect(trendElement).toHaveClass('text-[var(--brand-blue)]')
    })

    it('applies correct trend styling for negative trend', () => {
        render(
            <MetricCard
                label="Decline"
                value="8.1"
                trend={-3.4}
            />
        )

        const trendElement = screen.getByText('3.4%')
        expect(trendElement).toHaveClass('text-[var(--destructive)]')
    })

    it('handles zero trend', () => {
        render(
            <MetricCard
                label="Stable"
                value="100"
                trend={0}
            />
        )

        // Zero trend doesn't render trend indicator
        expect(screen.getByText('Stable')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
    })
})
