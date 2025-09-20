"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings, Maximize2, Star, Clock, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationsDropdown } from "./notifications-dropdown"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { setGlobalSearchTerm, addToSearchHistory, clearSearch } from "@/lib/features/search/searchSlice"

interface TopBarProps {
  className?: string
  onMenuClick?: () => void
}

export function TopBar({ className, onMenuClick }: TopBarProps) {
  const dispatch = useAppDispatch()
  const { globalSearchTerm } = useAppSelector((state) => state.search)
  const [localSearchTerm, setLocalSearchTerm] = useState("")

  useEffect(() => {
    setLocalSearchTerm(globalSearchTerm)
  }, [globalSearchTerm])

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value)
    dispatch(setGlobalSearchTerm(value))
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearchTerm.trim()) {
      dispatch(addToSearchHistory(localSearchTerm.trim()))
    }
  }

  const handleClearSearch = () => {
    setLocalSearchTerm("")
    dispatch(clearSearch())
  }

  return (
    <div
      className={cn(
        "h-16 bg-background border-b border-border flex items-center justify-between px-6",
        "backdrop-blur-sm bg-background/95 shadow-sm",
        className,
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden p-2"
        >
          <Menu className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Dashboards</span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm font-medium">Default</span>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, customers, products..."
            className="pl-10 pr-10 bg-muted/50 border-0 focus:bg-background transition-colors"
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {localSearchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Dashboards</span>
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <Maximize2 className="w-4 h-4" />
        </Button>

        <ThemeToggle />

        <NotificationsDropdown />
      </div>
    </div>
  )
}
