"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

interface OverflowMenuProps {
  items: {
    label: string
    icon?: React.ReactNode
    onClick: () => void
    variant?: "default" | "destructive"
  }[]
  align?: "left" | "right"
  className?: string
}

export function OverflowMenu({ items, align = "right", className }: OverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={cn("relative", className)} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="More options"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 w-56 rounded-xl overflow-hidden bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 py-1 animate-in fade-in-50 zoom-in-95",
            align === "left" ? "left-0" : "right-0",
          )}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className={cn(
                "w-full text-left px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100 transition-colors",
                item.variant === "destructive" && "text-red-600 hover:bg-red-50",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
