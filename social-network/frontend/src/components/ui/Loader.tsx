interface Props {
    size?: 'sm' | 'md' | 'lg'
    className?: string
  }
  
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  
  export const Loader = ({ size = 'md', className = '' }: Props) => (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-[3px] border-[#cce4f0] border-t-[#5ab6d8] rounded-full animate-spin`} />
    </div>
  )