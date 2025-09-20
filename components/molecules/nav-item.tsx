"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
  isCollapsed?: boolean
}

export function NavItem({ icon: Icon, label, isActive, onClick, className, isCollapsed }: NavItemProps) {
  const buttonContent = (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
        isCollapsed && "justify-center px-2",
        className,
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </button>
  )

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return buttonContent
}
