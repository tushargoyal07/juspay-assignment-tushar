/**
 * Theme configuration for the dashboard
 * Centralized theme management based on Figma design system
 */

import { figmaColors, brandColors, chartColors, darkChartColors } from './colors'

export const themeConfig = {
    light: {
        colors: {
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
        },
        chart: chartColors,
        sidebar: {
            background: figmaColors.white,
            foreground: figmaColors.primary,
            border: figmaColors.border,
            accent: figmaColors.primary5,
            accentForeground: figmaColors.primary,
        },
    },
    dark: {
        colors: {
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
        },
        chart: darkChartColors,
        sidebar: {
            background: '#0A0A0A',
            foreground: figmaColors.white,
            border: 'rgba(255, 255, 255, 0.1)',
            accent: 'rgba(255, 255, 255, 0.05)',
            accentForeground: figmaColors.white,
        },
    },
} as const

export type Theme = keyof typeof themeConfig

export function getThemeConfig(theme: Theme) {
    return themeConfig[theme]
}

export function getCSSVariables(theme: Theme) {
    const config = getThemeConfig(theme)

    return {
        '--background': config.colors.background,
        '--foreground': config.colors.foreground,
        '--card': config.colors.card,
        '--card-foreground': config.colors.cardForeground,
        '--popover': config.colors.popover,
        '--popover-foreground': config.colors.popoverForeground,
        '--primary': config.colors.primary,
        '--primary-foreground': config.colors.primaryForeground,
        '--secondary': config.colors.secondary,
        '--secondary-foreground': config.colors.secondaryForeground,
        '--muted': config.colors.muted,
        '--muted-foreground': config.colors.mutedForeground,
        '--accent': config.colors.accent,
        '--accent-foreground': config.colors.accentForeground,
        '--destructive': config.colors.destructive,
        '--destructive-foreground': config.colors.destructiveForeground,
        '--border': config.colors.border,
        '--input': config.colors.input,
        '--ring': config.colors.ring,
        '--chart-1': config.chart.chart1,
        '--chart-2': config.chart.chart2,
        '--chart-3': config.chart.chart3,
        '--chart-4': config.chart.chart4,
        '--chart-5': config.chart.chart5,
        '--chart-6': config.chart.chart6,
        '--chart-7': config.chart.chart7,
        '--chart-8': config.chart.chart8,
        '--sidebar': config.sidebar.background,
        '--sidebar-foreground': config.sidebar.foreground,
        '--sidebar-border': config.sidebar.border,
        '--sidebar-accent': config.sidebar.accent,
        '--sidebar-accent-foreground': config.sidebar.accentForeground,
    }
}
