import { Avatar } from './Avatar'
import type { Follower } from '../../helpers/types'

interface Props {
  user: Follower
  onClick?: () => void
  action?: React.ReactNode
}

export const UserCard = ({ user, onClick, action }: Props) => (
  <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f0f8fd] transition-colors">
    <button onClick={onClick} className="flex items-center gap-3 flex-1 min-w-0">
      <Avatar src={user.avatar} name={`${user.firstName} ${user.lastName}`} size="sm" />
      <div className="text-left min-w-0">
        <p className="text-sm font-semibold text-[#3a5a6e] truncate">{user.firstName} {user.lastName}</p>
        <p className="text-xs text-[#8aabbf] truncate">@{user.username}</p>
      </div>
    </button>
    {action}
  </div>
)