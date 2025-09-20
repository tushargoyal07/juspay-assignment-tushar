/**
 * Comprehensive color system based on Figma design tokens
 * Extracted from ex.css and organized for better maintainability
 */

export const figmaColors = {
    // Core Figma Design System Colors
    primary: '#1C1C1C',
    white: '#FFFFFF',
    gray: '#404040',

    // Border variants
    border: 'rgba(28, 28, 28, 0.1)',
    borderLight: 'rgba(28, 28, 28, 0.05)',
    borderMedium: 'rgba(28, 28, 28, 0.2)',

    // Opacity variants of primary color
    primary5: 'rgba(28, 28, 28, 0.05)',
    primary10: 'rgba(28, 28, 28, 0.1)',
    primary20: 'rgba(28, 28, 28, 0.2)',
    primary40: 'rgba(28, 28, 28, 0.4)',
    primary60: 'rgba(28, 28, 28, 0.6)',
    primary80: 'rgba(28, 28, 28, 0.8)',
} as const

export const brandColors = {
    primary: figmaColors.primary,
    primaryLight: figmaColors.white,
    blue: '#A8C5DA',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    mint: '#10B981',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#DC2626',
} as const

export const chartColors = {
    chart1: '#A8C5DA',
    chart2: '#8B5CF6',
    chart3: '#6366F1',
    chart4: '#10B981',
    chart5: figmaColors.primary,
    chart6: '#F59E0B',
    chart7: '#EF4444',
    chart8: '#06B6D4',
} as const

export const darkChartColors = {
    chart1: '#7DD3FC',
    chart2: '#A78BFA',
    chart3: '#818CF8',
    chart4: '#34D399',
    chart5: figmaColors.white,
    chart6: '#FBBF24',
    chart7: '#F87171',
    chart8: '#22D3EE',
} as const

export const grayscaleColors = {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
} as const

export const shadowColors = {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0px 8px 16px rgba(0, 0, 0, 0.1)',
} as const

export const spacing = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
} as const

export const radius = {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
} as const

// Theme configuration for light and dark modes
export const lightTheme = {
    background: figmaColors.white,
    foreground: figmaColors.primary,
    card: figmaColors.white,
    cardForeground: figmaColors.primary,
    popover: figmaColors.white,
    popoverForeground: figmaColors.primary,
    primary: figmaColors.primary,
    primaryForeground: figmaColors.white,
    secondary: figmaColors.primary5,
    secondaryForeground: figmaColors.primary,
    muted: figmaColors.primary5,
    mutedForeground: figmaColors.primary40,
    accent: figmaColors.primary,
    accentForeground: figmaColors.white,
    destructive: '#DC2626',
    destructiveForeground: figmaColors.white,
    border: figmaColors.border,
    input: figmaColors.primary5,
    ring: figmaColors.primary,
    chart: chartColors,
} as const

export const darkTheme = {
    background: '#0A0A0A',
    foreground: figmaColors.white,
    card: '#171717',
    cardForeground: figmaColors.white,
    popover: '#171717',
    popoverForeground: figmaColors.white,
    primary: figmaColors.white,
    primaryForeground: figmaColors.primary,
    secondary: 'rgba(255, 255, 255, 0.05)',
    secondaryForeground: figmaColors.white,
    muted: 'rgba(255, 255, 255, 0.05)',
    mutedForeground: 'rgba(255, 255, 255, 0.6)',
    accent: figmaColors.white,
    accentForeground: figmaColors.primary,
    destructive: '#EF4444',
    destructiveForeground: figmaColors.white,
    border: 'rgba(255, 255, 255, 0.1)',
    input: 'rgba(255, 255, 255, 0.05)',
    ring: figmaColors.white,
    chart: darkChartColors,
} as const

// Utility function to get theme colors
export function getThemeColors(theme: 'light' | 'dark') {
    return theme === 'light' ? lightTheme : darkTheme
}

// CSS custom properties generator
export function generateCSSVariables(theme: 'light' | 'dark') {
    const colors = getThemeColors(theme)

    return {
        '--background': colors.background,
        '--foreground': colors.foreground,
        '--card': colors.card,
        '--card-foreground': colors.cardForeground,
        '--popover': colors.popover,
        '--popover-foreground': colors.popoverForeground,
        '--primary': colors.primary,
        '--primary-foreground': colors.primaryForeground,
        '--secondary': colors.secondary,
        '--secondary-foreground': colors.secondaryForeground,
        '--muted': colors.muted,
        '--muted-foreground': colors.mutedForeground,
        '--accent': colors.accent,
        '--accent-foreground': colors.accentForeground,
        '--destructive': colors.destructive,
        '--destructive-foreground': colors.destructiveForeground,
        '--border': colors.border,
        '--input': colors.input,
        '--ring': colors.ring,
        '--chart-1': colors.chart.chart1,
        '--chart-2': colors.chart.chart2,
        '--chart-3': colors.chart.chart3,
        '--chart-4': colors.chart.chart4,
        '--chart-5': colors.chart.chart5,
        '--chart-6': colors.chart.chart6,
        '--chart-7': colors.chart.chart7,
        '--chart-8': colors.chart.chart8,
    }
}
