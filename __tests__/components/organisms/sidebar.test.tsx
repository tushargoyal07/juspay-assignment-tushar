import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import { Sidebar } from '@/components/organisms/sidebar'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    usePathname: () => '/',
}))

describe('Sidebar', () => {
    const mockOnToggle = jest.fn()

    beforeEach(() => {
        mockPush.mockClear()
        mockOnToggle.mockClear()
    })

    it('renders sidebar with navigation items', () => {
        render(<Sidebar />)

        expect(screen.getAllByText('Overview')).toHaveLength(2) // Multiple Overview items
        expect(screen.getAllByText('Projects')).toHaveLength(3) // Multiple Projects items
        expect(screen.getByText('eCommerce')).toBeInTheDocument()
    })

    it('calls onToggle when toggle button is clicked', () => {
        render(<Sidebar onToggle={mockOnToggle} />)

        const toggleButton = screen.getByRole('button', { name: '' }) // First button is the toggle
        fireEvent.click(toggleButton)

        expect(mockOnToggle).toHaveBeenCalledTimes(1)
    })

    it('navigates when navigation item is clicked', () => {
        render(<Sidebar />)

        const overviewItems = screen.getAllByText('Overview')
        fireEvent.click(overviewItems[0]) // Click the first Overview item

        expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('shows collapsed state when isCollapsed is true', () => {
        render(<Sidebar isCollapsed={true} />)

        const sidebar = screen.getByTestId('sidebar')
        expect(sidebar).toHaveClass('w-16')
    })

    it('shows expanded state when isCollapsed is false', () => {
        render(<Sidebar isCollapsed={false} />)

        const sidebar = screen.getByTestId('sidebar')
        expect(sidebar).toHaveClass('w-64')
    })

    it('displays user avatar and name', () => {
        render(<Sidebar />)

        expect(screen.getByText('ByeWind')).toBeInTheDocument()
        expect(screen.getByText('BW')).toBeInTheDocument() // Avatar fallback text
    })

    it('renders all navigation sections', () => {
        render(<Sidebar />)

        // Favorites section
        expect(screen.getByText('Favorites')).toBeInTheDocument()

        // Management section
        expect(screen.getByText('Management')).toBeInTheDocument()

        // Dashboards section
        expect(screen.getByText('Dashboards')).toBeInTheDocument()
    })

    it('handles navigation to different routes', () => {
        render(<Sidebar />)

        const projectsItems = screen.getAllByText('Projects')
        fireEvent.click(projectsItems[0]) // Click the first Projects item

        expect(mockPush).toHaveBeenCalledWith('/projects')
    })
})
