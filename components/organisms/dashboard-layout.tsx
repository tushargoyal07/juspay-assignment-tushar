"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Fixed Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out",
        isMobile ? (sidebarCollapsed ? "w-0 -translate-x-full" : "w-64") : sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
        isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        {/* Fixed Top Bar */}
        <div className={cn(
          "fixed top-0 right-0 z-20 transition-all duration-300 ease-in-out",
          isMobile ? "left-0 w-full" : "w-full"
        )}
          style={!isMobile ? {
            left: sidebarCollapsed ? '4rem' : '16rem',
            width: sidebarCollapsed ? 'calc(100% - 4rem)' : 'calc(100% - 16rem)'
          } : {}}>
          <TopBar onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>

        {/* Scrollable Main Content */}
        <main className={cn(
          "flex-1 overflow-auto bg-gradient-to-br from-background via-background to-muted/20",
          "pt-16" // Add top padding to account for fixed top bar
        )}>
          <div className="container mx-auto p-4 sm:p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
