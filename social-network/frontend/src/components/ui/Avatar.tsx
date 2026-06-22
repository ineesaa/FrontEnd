const DEFAULT_AVATAR =
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E` +
  `%3Crect width='80' height='80' fill='%23bde0f5'/%3E` +
  `%3Ccircle cx='40' cy='30' r='16' fill='%235ab6d8'/%3E` +
  `%3Cellipse cx='40' cy='70' rx='24' ry='18' fill='%235ab6d8'/%3E` +
  `%3C/svg%3E`

interface Props {
  src?: string | { picture?: string; avatar?: string } | null
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Explicit pixel sizes as inline styles — guarantees dimensions
// even when Tailwind purges the class or a parent flex crushes it
const SIZES: Record<string, { width: number; height: number; fontSize: number }> = {
  sm: { width: 32,  height: 32,  fontSize: 12 },
  md: { width: 40,  height: 40,  fontSize: 14 },
  lg: { width: 64,  height: 64,  fontSize: 22 },
  xl: { width: 96,  height: 96,  fontSize: 32 },
}

// Tailwind classes kept for ring + rounded — inline style handles sizing
const SIZE_CLASSES: Record<string, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-16 h-16 text-2xl',
  xl: 'w-24 h-24 text-4xl',
}

function buildSrc(src: Props['src']): string | null {
  if (!src) return null

  let raw: string | undefined
  if (typeof src === 'string') {
    raw = src
  } else if (typeof src === 'object' && src !== null) {
    raw = src.picture ?? src.avatar
  }

  if (!raw?.trim()) return null

  // Strip encoded %22 and literal quote characters
  const clean = raw.replace(/%22/g, '').replace(/['"]+/g, '').trim()
  if (!clean) return null

  if (clean.startsWith('blob:'))  return clean
  if (clean.startsWith('http'))   return `${clean}${clean.includes('?') ? '&' : '?'}t=${Date.now()}`

  // Plain filename from DB
  return `http://localhost:4002/uploads/${clean}?t=${Date.now()}`
}

export const Avatar = ({ src, name, size = 'md' }: Props) => {
  const initials = name
    ? name.trim().split(/\s+/).map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : ''

  const resolvedSrc = buildSrc(src)
  const dims        = SIZES[size]

  // Inline style enforces dimensions absolutely — prevents flex collapse
  const containerStyle: React.CSSProperties = {
    width:      dims.width,
    height:     dims.height,
    minWidth:   dims.width,
    minHeight:  dims.height,
    flexShrink: 0,
  }

  return (
    <div
      style={containerStyle}
      className={`${SIZE_CLASSES[size]} rounded-3xl overflow-hidden ring-2 ring-[#cce4f0] relative bg-gradient-to-br from-[#bde0f5] to-[#5ab6d8] flex items-center justify-center`}
    >
      {resolvedSrc ? (
        <img
          src={resolvedSrc}
          alt={name ?? 'Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fall back to initials on broken image
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : initials ? (
        <span
          style={{ fontSize: dims.fontSize }}
          className="text-white font-bold select-none"
        >
          {initials}
        </span>
      ) : (
        <img
          src={DEFAULT_AVATAR}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}

export default Avatar