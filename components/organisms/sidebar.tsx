"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { NavItem } from "@/components/molecules/nav-item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  FolderOpen,
  GraduationCap,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ShoppingCart,
  Bell,
  Menu,
  ChevronLeft,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onToggle?: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ className, isCollapsed: externalCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("eCommerce")
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isMobile = useIsMobile()

  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed

  // Sync activeItem with current pathname
  useEffect(() => {
    // Find the item that matches the current pathname
    const allItems = [...mainNavItems, ...favoriteItems, ...dashboardItems, ...accountItems, ...newNavItems]
    const matchingItem = allItems.find(item => item.path === pathname)
    if (matchingItem) {
      setActiveItem(matchingItem.key)
    }
  }, [pathname])

  const handleNavigation = (path: string, key: string) => {
    setActiveItem(key)
    router.push(path)
  }

  // Helper function to determine if an item is active
  const isItemActive = (itemKey: string, itemPath: string) => {
    // Use the activeItem state for single selection
    return activeItem === itemKey
  }

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalCollapsed(!internalCollapsed)
    }
  }

  const mainNavItems = [
    { icon: LayoutDashboard, label: "Overview", key: "overview", path: "/", disabled: false },
    { icon: FolderOpen, label: "Projects", key: "projects", path: "/projects", disabled: true, comingSoon: true },
  ]

  const favoriteItems = [
    { icon: LayoutDashboard, label: "Default", key: "default", path: "/", disabled: false },
    { icon: LayoutDashboard, label: "eCommerce", key: "eCommerce", path: "/", disabled: false },
    { icon: FolderOpen, label: "Projects", key: "projects-fav", path: "/projects", disabled: true, comingSoon: true },
    { icon: GraduationCap, label: "Online Courses", key: "courses", path: "/courses", disabled: true, comingSoon: true },
  ]

  const dashboardItems = [
    { icon: User, label: "User Profile", key: "profile", path: "/profile", disabled: true, comingSoon: true },
    { icon: LayoutDashboard, label: "Overview", key: "overview-dash", path: "/", disabled: false },
    { icon: FolderOpen, label: "Projects", key: "projects-dash", path: "/projects", disabled: true, comingSoon: true },
    { icon: LayoutDashboard, label: "Campaigns", key: "campaigns", path: "/campaigns", disabled: true, comingSoon: true },
    { icon: LayoutDashboard, label: "Documents", key: "documents", path: "/documents", disabled: true, comingSoon: true },
    { icon: User, label: "Followers", key: "followers", path: "/followers", disabled: true, comingSoon: true },
  ]

  const accountItems = [
    { icon: User, label: "Account", key: "account", path: "/account", disabled: true, comingSoon: true },
    { icon: Settings, label: "Corporate", key: "corporate", path: "/corporate", disabled: true, comingSoon: true },
    { icon: LayoutDashboard, label: "Blog", key: "blog", path: "/blog", disabled: true, comingSoon: true },
    { icon: User, label: "Social", key: "social", path: "/social", disabled: true, comingSoon: true },
  ]

  const newNavItems = [
    { icon: ShoppingCart, label: "Orders", key: "orders", path: "/orders", disabled: false, comingSoon: false },
    { icon: Bell, label: "Notifications", key: "notifications", path: "/notifications", disabled: false, comingSoon: false },
  ]

  return (
    <div
      data-testid="sidebar"
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-all duration-300 ease-in-out",
        // Desktop behavior
        !isMobile && (isCollapsed ? "w-16" : "w-64"),
        // Mobile behavior - hidden by default, shown when isMobileOpen is true
        isMobile && (isMobileOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"),
        className,
      )}
    >
      {/* Header - hide completely on mobile when collapsed */}
      {(!isMobile || isMobileOpen) && (
        <div className={cn(
          "transition-all duration-300",
          isCollapsed && !isMobile ? "p-2" : "p-4"
        )}>
          <div className="flex items-center gap-3">
            {/* Desktop toggle button - always show */}
            {!isMobile && (
              <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-1 h-8 w-8 hover:bg-sidebar-accent">
                {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
            )}

            {/* Mobile close button - only show when sidebar is open */}
            {isMobile && onMobileClose && isMobileOpen && (
              <Button variant="ghost" size="sm" onClick={onMobileClose} className="p-1 h-8 w-8 hover:bg-sidebar-accent">
                <X className="w-4 h-4" />
              </Button>
            )}

            {/* Show user info only when not collapsed (desktop) or when mobile sidebar is open */}
            {(!isCollapsed || (isMobile && isMobileOpen)) && (
              <>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>BW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-sidebar-foreground">ByeWind</p>
                </div>
                {!isMobile && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 px-2 space-y-4 overflow-y-auto">
        {/* Show navigation only when not collapsed (desktop) or when mobile sidebar is open */}
        {(!isCollapsed || (isMobile && isMobileOpen)) && (
          <>
            {/* Main Navigation */}
            <div>
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Favorites
              </h3>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <TooltipProvider key={item.key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <NavItem
                            icon={item.icon}
                            label={item.label}
                            isActive={isItemActive(item.key, item.path)}
                            onClick={() => {
                              if (!item.disabled) {
                                handleNavigation(item.path, item.key)
                                // Close mobile sidebar after navigation
                                if (isMobile && onMobileClose) {
                                  onMobileClose()
                                }
                              }
                            }}
                            isCollapsed={isCollapsed}
                            disabled={item.disabled}
                          />
                        </div>
                      </TooltipTrigger>
                      {item.comingSoon && (
                        <TooltipContent>
                          <p>Coming Soon</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            <Separator className="bg-sidebar-border" />
          </>
        )}

        {/* Favorites */}
        <div>
          {(!isCollapsed || (isMobile && isMobileOpen)) && (
            <div className="space-y-1">
              {favoriteItems.map((item) => (
                <TooltipProvider key={item.key}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <NavItem
                          icon={item.icon}
                          label={item.label}
                          isActive={isItemActive(item.key, item.path)}
                          onClick={() => {
                            if (!item.disabled) {
                              handleNavigation(item.path, item.key)
                              // Close mobile sidebar after navigation
                              if (isMobile && onMobileClose) {
                                onMobileClose()
                              }
                            }
                          }}
                          isCollapsed={isCollapsed}
                          disabled={item.disabled}
                          comingSoon={item.comingSoon}
                        />
                      </div>
                    </TooltipTrigger>
                    {item.comingSoon && (
                      <TooltipContent>
                        <p>Coming Soon</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )}
        </div>

        {(!isCollapsed || (isMobile && isMobileOpen)) && <Separator className="bg-sidebar-border" />}

        <div>
          {(!isCollapsed || (isMobile && isMobileOpen)) && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Management
            </h3>
          )}
          <div className="space-y-1">
            {newNavItems.map((item) => (
              <TooltipProvider key={item.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <NavItem
                        icon={item.icon}
                        label={item.label}
                        isActive={isItemActive(item.key, item.path)}
                        onClick={() => {
                          if (!item.disabled) {
                            handleNavigation(item.path, item.key)
                            // Close mobile sidebar after navigation
                            if (isMobile && onMobileClose) {
                              onMobileClose()
                            }
                          }
                        }}
                        isCollapsed={isCollapsed}
                        disabled={item.disabled}
                        comingSoon={item.comingSoon}
                      />
                    </div>
                  </TooltipTrigger>
                  {item.comingSoon && (
                    <TooltipContent>
                      <p>Coming Soon</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {(!isCollapsed || (isMobile && isMobileOpen)) && (
          <>
            <Separator className="bg-sidebar-border" />

            {/* Dashboards */}
            <div>
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboards
              </h3>
              <div className="space-y-1">
                {dashboardItems.map((item) => (
                  <TooltipProvider key={item.key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <NavItem
                            icon={item.icon}
                            label={item.label}
                            isActive={isItemActive(item.key, item.path)}
                            onClick={() => {
                              if (!item.disabled) {
                                handleNavigation(item.path, item.key)
                                // Close mobile sidebar after navigation
                                if (isMobile && onMobileClose) {
                                  onMobileClose()
                                }
                              }
                            }}
                            isCollapsed={isCollapsed}
                            disabled={item.disabled}
                            comingSoon={item.comingSoon}
                          />
                        </div>
                      </TooltipTrigger>
                      {item.comingSoon && (
                        <TooltipContent>
                          <p>Coming Soon</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            <Separator className="bg-sidebar-border" />

            {/* Account */}
            <div>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <TooltipProvider key={item.key}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <NavItem
                            icon={item.icon}
                            label={item.label}
                            isActive={isItemActive(item.key, item.path)}
                            onClick={() => {
                              if (!item.disabled) {
                                handleNavigation(item.path, item.key)
                                // Close mobile sidebar after navigation
                                if (isMobile && onMobileClose) {
                                  onMobileClose()
                                }
                              }
                            }}
                            isCollapsed={isCollapsed}
                            disabled={item.disabled}
                            comingSoon={item.comingSoon}
                          />
                        </div>
                      </TooltipTrigger>
                      {item.comingSoon && (
                        <TooltipContent>
                          <p>Coming Soon</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer - only show when not collapsed (desktop) or when mobile sidebar is open */}
      {(!isCollapsed || (isMobile && isMobileOpen)) && (
        <div className="p-2 border-t border-sidebar-border">
          <div className="space-y-1">
            <NavItem
              icon={HelpCircle}
              label="Help & Information"
              onClick={() => {
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
              isCollapsed={isCollapsed}
            />
            <NavItem
              icon={LogOut}
              label="Log Out"
              onClick={() => {
                if (isMobile && onMobileClose) {
                  onMobileClose()
                }
              }}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      )}
    </div>
  )
}
