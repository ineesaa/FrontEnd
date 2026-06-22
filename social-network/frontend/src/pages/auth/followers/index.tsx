import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../helpers/AuthContext'
import { IncomingRequests } from '../../../components/profile/IncomingRequests'
import { UserCard } from '../../../components/ui/UserCard'
import { Card } from '../../../components/ui/Card'
import type { Follower } from '../../../helpers/types'

export const Followers = () => {
  const { user } = useAuth()
  const navigate  = useNavigate()

  const raw       = (user as any)?.followers ?? []
  const followers: Follower[] = raw
    .map((f: any) => f.sender ?? f)
    .filter(Boolean)

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[#3a5a6e]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Followers
        </h1>
        <p className="text-sm text-[#8aabbf]">
          {followers.length}{' '}
          {followers.length === 1 ? 'person follows' : 'people follow'} you
        </p>
      </div>

      {/* Always render — component returns null when list is empty */}
      <IncomingRequests />

      <Card>
        {followers.length === 0 ? (
          <p className="text-sm text-[#8aabbf] text-center py-4">
            No followers yet.
          </p>
        ) : (
          followers.map((f) => (
            <UserCard
              key={f.id}
              user={f}
              onClick={() => navigate(`/profile/user/${f.username}`)}
            />
          ))
        )}
      </Card>
    </div>
  )
}