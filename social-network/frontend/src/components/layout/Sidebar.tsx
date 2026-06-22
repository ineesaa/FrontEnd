import { NavLink, useNavigate } from 'react-router-dom'
import type { User } from '../../helpers/types'
import { Avatar } from '../ui/Avatar'

const links = [
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/profile/posts', label: 'Posts', icon: '📝' },
  { to: '/profile/followers', label: 'Followers', icon: '👥' },
  { to: '/profile/followings', label: 'Following', icon: '➕' },
  { to: '/profile/messages', label: 'Messages', icon: '💬' },
  { to: '/profile/settings', label: 'Settings', icon: '⚙️' },
]

export const Sidebar = ({ user }: { user: User }) => {
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('auth_token'); navigate('/') }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/60 backdrop-blur-md border-r border-[#d8ecf5] flex flex-col z-20">
      <div className="p-6 border-b border-[#e8f4fb]">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={`${user.firstName} ${user.lastName}`} size="md" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#3a5a6e] truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-[#8aabbf] truncate">@{user.username}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end={to === '/profile'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${isActive ? 'bg-[#e0f1fa] text-[#3a5a6e]' : 'text-[#7aa5b8] hover:bg-[#f0f8fd] hover:text-[#3a5a6e]'}`
            }>
            <span>{icon}</span>{label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#e8f4fb]">
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-rose-400 hover:bg-rose-50 transition-all">
          <span>🚪</span> Sign out
        </button>
      </div>
    </aside>
  )
}