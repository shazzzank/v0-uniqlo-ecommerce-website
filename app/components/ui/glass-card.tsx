import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high"
  children: React.ReactNode
}

export function GlassCard({ className, intensity = "medium", children, ...props }: GlassCardProps) {
  const intensityStyles = {
    low: "bg-white/40 backdrop-blur-sm border-white/20",
    medium: "bg-white/60 backdrop-blur-md border-white/30",
    high: "bg-white/80 backdrop-blur-lg border-white/40",
  }

  return (
    <div className={cn("rounded-2xl border shadow-sm", intensityStyles[intensity], className)} {...props}>
      {children}
    </div>
  )
}

export function GlassCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function GlassCardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
}

export function GlassCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />
}

export function GlassCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function GlassCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
