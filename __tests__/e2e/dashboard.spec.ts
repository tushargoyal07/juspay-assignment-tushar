import { test, expect } from '@playwright/test'

test.describe('Dashboard E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should display dashboard with all components', async ({ page }) => {
        // Check if the main dashboard elements are present
        await expect(page.getByText('eCommerce')).toBeVisible()
        await expect(page.getByText('Customers')).toBeVisible()
        await expect(page.getByText('Orders')).toBeVisible()
        await expect(page.getByText('Revenue')).toBeVisible()
        await expect(page.getByText('Growth')).toBeVisible()
    })

    test('should toggle sidebar on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 })

        // Check if sidebar is initially hidden on mobile
        await expect(page.getByRole('complementary')).not.toBeVisible()

        // Click menu button to open sidebar
        await page.getByRole('button', { name: /menu/i }).click()

        // Check if sidebar is now visible
        await expect(page.getByRole('complementary')).toBeVisible()

        // Click overlay to close sidebar
        await page.click('[data-testid="sidebar-overlay"]')

        // Check if sidebar is hidden again
        await expect(page.getByRole('complementary')).not.toBeVisible()
    })

    test('should navigate to different pages', async ({ page }) => {
        // Navigate to orders page
        await page.getByText('Orders').click()
        await expect(page).toHaveURL('/orders')

        // Navigate to notifications page
        await page.getByText('Notifications').click()
        await expect(page).toHaveURL('/notifications')

        // Navigate back to dashboard
        await page.getByText('eCommerce').click()
        await expect(page).toHaveURL('/')
    })

    test('should display notifications dropdown', async ({ page }) => {
        // Click on notifications bell
        await page.getByRole('button', { name: /notifications/i }).click()

        // Check if dropdown is visible
        await expect(page.getByText('Notifications')).toBeVisible()

        // Check if notification items are present
        await expect(page.getByText('You have a bug that needs')).toBeVisible()
    })

    test('should toggle theme', async ({ page }) => {
        // Click theme toggle button
        await page.getByRole('button', { name: /toggle theme/i }).click()

        // Check if dark theme is applied
        await expect(page.locator('html')).toHaveClass(/dark/)

        // Click again to toggle back to light
        await page.getByRole('button', { name: /toggle theme/i }).click()

        // Check if light theme is applied
        await expect(page.locator('html')).not.toHaveClass(/dark/)
    })

    test('should display charts and metrics', async ({ page }) => {
        // Check if charts are rendered
        await expect(page.locator('[data-testid="projections-chart"]')).toBeVisible()
        await expect(page.locator('[data-testid="revenue-chart"]')).toBeVisible()
        await expect(page.locator('[data-testid="total-sales-chart"]')).toBeVisible()

        // Check if metrics are displayed with proper formatting
        await expect(page.getByText(/\d+,\d+/)).toBeVisible() // Numbers with commas
        await expect(page.getByText(/\$\d+/)).toBeVisible() // Currency format
        await expect(page.getByText(/\d+\.\d+%/)).toBeVisible() // Percentage format
    })

    test('should handle responsive design', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1200, height: 800 })
        await expect(page.getByRole('complementary')).toBeVisible()

        // Test tablet view
        await page.setViewportSize({ width: 768, height: 1024 })
        await expect(page.getByRole('complementary')).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await expect(page.getByRole('complementary')).not.toBeVisible()
    })

    test('should search functionality work', async ({ page }) => {
        // Type in search box
        await page.getByPlaceholder('Search...').fill('test search')

        // Check if search input has the value
        await expect(page.getByPlaceholder('Search...')).toHaveValue('test search')
    })

    test('should display order management page', async ({ page }) => {
        await page.goto('/orders')

        // Check if order table is present
        await expect(page.getByText('Order Management')).toBeVisible()
        await expect(page.getByRole('table')).toBeVisible()

        // Check if order data is displayed
        await expect(page.getByText('David Craig')).toBeVisible()
        await expect(page.getByText('ORD001')).toBeVisible()
    })

    test('should display notifications page', async ({ page }) => {
        await page.goto('/notifications')

        // Check if notifications page is present
        await expect(page.getByText('Notifications')).toBeVisible()

        // Check if notification items are displayed
        await expect(page.getByText('You have a bug that needs')).toBeVisible()
    })
})
