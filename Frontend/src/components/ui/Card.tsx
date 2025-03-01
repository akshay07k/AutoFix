import type React from "react"

interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>{children}</div>
}

export function CardContent({ className, children }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
