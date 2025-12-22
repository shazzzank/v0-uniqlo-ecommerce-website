import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "horizontal" | "vertical"
  children: React.ReactNode
}

export function ButtonGroup({ className, variant = "horizontal", children, ...props }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-2 rounded-xl overflow-hidden",
        variant === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
