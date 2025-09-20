import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from 'next-themes'
import dashboardReducer from '@/lib/features/dashboard/dashboardSlice'
import ordersReducer from '@/lib/features/orders/ordersSlice'
import notificationsReducer from '@/lib/features/notifications/notificationsSlice'

// Create a test store
export function createTestStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            dashboard: dashboardReducer,
            orders: ordersReducer,
            notifications: notificationsReducer,
        },
        preloadedState,
    })
}

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    preloadedState?: any
    store?: ReturnType<typeof createTestStore>
}

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState = {},
        store = createTestStore(preloadedState),
        ...renderOptions
    }: CustomRenderOptions = {}
) {
    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <Provider store={store}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}

// Re-export everything
export * from '@testing-library/react'
export { renderWithProviders as render }

// Simple test to make this file valid
describe('Test Utils', () => {
    it('should export render function', () => {
        expect(typeof render).toBe('function')
    })
})
