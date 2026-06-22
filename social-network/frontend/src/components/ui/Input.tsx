import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = ({ label, error, className = '', ...rest }: Props) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-xs font-semibold text-[#5a7a8e]">{label}</label>}
    <input
      className={`px-4 py-3 rounded-2xl border border-[#cce4f0] bg-white focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] text-sm text-[#3a5a6e] placeholder:text-[#b0cdd9] ${error ? 'border-rose-400' : ''} ${className}`}
      {...rest}
    />
    {error && <span className="text-xs text-rose-500">{error}</span>}
  </div>
)