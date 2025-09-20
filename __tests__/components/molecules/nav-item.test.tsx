import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import { NavItem } from '@/components/molecules/nav-item'
import { LayoutDashboard } from 'lucide-react'

describe('NavItem', () => {
    const mockOnClick = jest.fn()

    beforeEach(() => {
        mockOnClick.mockClear()
    })

    it('renders with label and icon', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                onClick={mockOnClick}
            />
        )

        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                onClick={mockOnClick}
            />
        )

        fireEvent.click(screen.getByRole('button'))
        expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('applies active styling when isActive is true', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                isActive={true}
                onClick={mockOnClick}
            />
        )

        const button = screen.getByRole('button')
        expect(button).toHaveClass('bg-sidebar-primary', 'text-sidebar-primary-foreground')
    })

    it('applies inactive styling when isActive is false', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                isActive={false}
                onClick={mockOnClick}
            />
        )

        const button = screen.getByRole('button')
        expect(button).toHaveClass('text-sidebar-foreground')
        expect(button).not.toHaveClass('bg-sidebar-primary')
    })

    it('hides label when collapsed', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                isCollapsed={true}
                onClick={mockOnClick}
            />
        )

        expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
    })

    it('shows tooltip when collapsed', () => {
        render(
            <NavItem
                icon={LayoutDashboard}
                label="Dashboard"
                isCollapsed={true}
                onClick={mockOnClick}
            />
        )

        // Tooltip should be present when collapsed
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
})
