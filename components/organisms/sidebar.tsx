"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { NavItem } from "@/components/molecules/nav-item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
  isCollapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ className, isCollapsed: externalCollapsed, onToggle }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("eCommerce")
  const [internalCollapsed, setInternalCollapsed] = useState(false)

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
    { icon: LayoutDashboard, label: "Overview", key: "overview", path: "/" },
    { icon: FolderOpen, label: "Projects", key: "projects", path: "/projects" },
  ]

  const favoriteItems = [
    { icon: LayoutDashboard, label: "Default", key: "default", path: "/" },
    { icon: LayoutDashboard, label: "eCommerce", key: "eCommerce", path: "/" },
    { icon: FolderOpen, label: "Projects", key: "projects-fav", path: "/projects" },
    { icon: GraduationCap, label: "Online Courses", key: "courses", path: "/courses" },
  ]

  const dashboardItems = [
    { icon: User, label: "User Profile", key: "profile", path: "/profile" },
    { icon: LayoutDashboard, label: "Overview", key: "overview-dash", path: "/" },
    { icon: FolderOpen, label: "Projects", key: "projects-dash", path: "/projects" },
    { icon: LayoutDashboard, label: "Campaigns", key: "campaigns", path: "/campaigns" },
    { icon: LayoutDashboard, label: "Documents", key: "documents", path: "/documents" },
    { icon: User, label: "Followers", key: "followers", path: "/followers" },
  ]

  const accountItems = [
    { icon: User, label: "Account", key: "account", path: "/account" },
    { icon: Settings, label: "Corporate", key: "corporate", path: "/corporate" },
    { icon: LayoutDashboard, label: "Blog", key: "blog", path: "/blog" },
    { icon: User, label: "Social", key: "social", path: "/social" },
  ]

  const newNavItems = [
    { icon: ShoppingCart, label: "Orders", key: "orders", path: "/orders" },
    { icon: Bell, label: "Notifications", key: "notifications", path: "/notifications" },
  ]

  return (
    <div
      data-testid="sidebar"
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="p-1 h-8 w-8 hover:bg-sidebar-accent">
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>

          {!isCollapsed && (
            <>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>BW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">ByeWind</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 space-y-4 overflow-y-auto">
        {!isCollapsed && (
          <>
            {/* Main Navigation */}
            <div>
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Favorites
              </h3>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <NavItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    isActive={isItemActive(item.key, item.path)}
                    onClick={() => handleNavigation(item.path, item.key)}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>

            <Separator className="bg-sidebar-border" />
          </>
        )}

        {/* Favorites */}
        <div>
          {!isCollapsed && (
            <div className="space-y-1">
              {favoriteItems.map((item) => (
                <NavItem
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  isActive={isItemActive(item.key, item.path)}
                  onClick={() => handleNavigation(item.path, item.key)}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          )}

          {isCollapsed && (
            <div className="space-y-1">
              {favoriteItems.slice(0, 4).map((item) => (
                <NavItem
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  isActive={isItemActive(item.key, item.path)}
                  onClick={() => handleNavigation(item.path, item.key)}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          )}
        </div>

        {!isCollapsed && <Separator className="bg-sidebar-border" />}

        <div>
          {!isCollapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Management
            </h3>
          )}
          <div className="space-y-1">
            {newNavItems.map((item) => (
              <NavItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                isActive={isItemActive(item.key, item.path)}
                onClick={() => handleNavigation(item.path, item.key)}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {!isCollapsed && (
          <>
            <Separator className="bg-sidebar-border" />

            {/* Dashboards */}
            <div>
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboards
              </h3>
              <div className="space-y-1">
                {dashboardItems.map((item) => (
                  <NavItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    isActive={isItemActive(item.key, item.path)}
                    onClick={() => handleNavigation(item.path, item.key)}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>

            <Separator className="bg-sidebar-border" />

            {/* Account */}
            <div>
              <div className="space-y-1">
                {accountItems.map((item) => (
                  <NavItem
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    isActive={isItemActive(item.key, item.path)}
                    onClick={() => handleNavigation(item.path, item.key)}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="space-y-1">
          <NavItem icon={HelpCircle} label="Help & Information" onClick={() => { }} isCollapsed={isCollapsed} />
          <NavItem icon={LogOut} label="Log Out" onClick={() => { }} isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  )
}
