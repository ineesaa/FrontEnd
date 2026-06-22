import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger'
  loading?: boolean
  size?: 'sm' | 'md'
}

export const Button = ({ children, variant = 'primary', loading, size = 'md', className = '', ...rest }: Props) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all disabled:opacity-50 cursor-pointer'
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm' }
  const variants = {
    primary: 'bg-[#5ab6d8] text-white hover:bg-[#3a9fc4] shadow-sm',
    ghost: 'border border-[#cce4f0] text-[#3a5a6e] hover:bg-[#eaf5fb]',
    danger: 'bg-rose-100 text-rose-600 hover:bg-rose-200',
  }

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} disabled={loading || rest.disabled} {...rest}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" /> : null}
      {children}
    </button>
  )
}