import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  title?: string
}

export const Card = ({ children, className = '', title }: Props) => (
  <div className={`rounded-3xl border border-[#d8ecf5] bg-[#f8fcff] p-5 ${className}`}>
    {title && <h3 className="text-sm font-semibold text-[#3a5a6e] mb-4">{title}</h3>}
    {children}
  </div>
)