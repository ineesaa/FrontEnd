import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../helpers/AuthContext'
import { UserCard } from '../../../components/ui/UserCard'
import { FollowButton } from '../../../components/profile/FollowButton'
import { Card } from '../../../components/ui/Card'
import type { Follower } from '../../../helpers/types'

export const Followings = () => {
  const { user } = useAuth()
  const navigate  = useNavigate()

  // Backend nests followings as [{ receiver: Follower }] inside the user object
  const raw = (user as any)?.followings ?? []
  const followings: Follower[] = raw.map((f: any) => f.receiver ?? f).filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[#3a5a6e]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Following
        </h1>
        <p className="text-sm text-[#8aabbf]">
          You follow {followings.length} {followings.length === 1 ? 'person' : 'people'}
        </p>
      </div>
      <Card>
        {followings.length === 0 ? (
          <p className="text-sm text-[#8aabbf] text-center py-4">
            Not following anyone yet.
          </p>
        ) : (
          followings.map((f) => (
            <UserCard
              key={f.id}
              user={f}
              onClick={() => navigate(`/profile/user/${f.username}`)}
              action={<FollowButton userId={String(f.id)} initialStatus="Followed" />}
            />
          ))
        )}
      </Card>
    </div>
  )
}