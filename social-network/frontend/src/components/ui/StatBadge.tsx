interface Props {
    label: string
    value: number
    onClick?: () => void
  }
  
  export const StatBadge = ({ label, value, onClick }: Props) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center px-5 py-3 rounded-2xl bg-[#f0f8fd] hover:bg-[#e0f1fa] transition-colors cursor-pointer"
    >
      <span className="text-xl font-bold text-[#3a5a6e]">{value}</span>
      <span className="text-xs text-[#8aabbf] font-medium">{label}</span>
    </button>
  )