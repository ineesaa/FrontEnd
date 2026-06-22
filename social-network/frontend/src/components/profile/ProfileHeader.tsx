import { useNavigate } from 'react-router-dom'
import type { User } from '../../helpers/types'
import { AvatarUploader } from './AvatarUploader'
import { StatBadge } from '../ui/StatBadge'

interface Props {
  user: User
  onUpdate: (u: User) => void
}

export const ProfileHeader = ({ user, onUpdate }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="rounded-3xl border border-[#d8ecf5] bg-[#f8fcff] p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

        <AvatarUploader user={user} onUpdate={onUpdate} />

        <div className="flex-1 min-w-0">
          <h1
            className="text-2xl font-bold text-[#3a5a6e]"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-[#5ab6d8] text-sm font-medium mb-1">@{user.username}</p>
          {user.bio && (
            <p className="text-[#8aabbf] text-sm mb-4 line-clamp-2">{user.bio}</p>
          )}
          <div className="flex gap-3 flex-wrap mt-3">
            {/* Use the direct count fields from the User interface */}
            <StatBadge
              label="Posts"
              value={user.postsCount}
              onClick={() => navigate('/profile/posts')}
            />
            <StatBadge
              label="Followers"
              value={user.followersCount}
              onClick={() => navigate('/profile/followers')}
            />
            <StatBadge
              label="Following"
              value={user.followingsCount}
              onClick={() => navigate('/profile/followings')}
            />
          </div>
        </div>

      </div>
    </div>
  )
}