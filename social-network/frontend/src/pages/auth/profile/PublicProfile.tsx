import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { accountService } from '../../../services/accountService'
import { Avatar } from '../../../components/ui/Avatar'
import { StatBadge } from '../../../components/ui/StatBadge'
import { FollowButton } from '../../../components/profile/FollowButton'
import { Loader } from '../../../components/ui/Loader'
import { Card } from '../../../components/ui/Card'
import { PublicPostCard } from '../../../components/post/PublicPostCard'
import type { PublicProfileResponse } from '../../../helpers/types'

export const PublicProfile = () => {
  const { username }          = useParams<{ username: string }>()
  const [data, setData]       = useState<PublicProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    if (!username) return
    setLoading(true)
    accountService.getProfile(username)
      .then(setData).catch(() => setError('User not found')).finally(() => setLoading(false))
  }, [username])

  if (loading) return <Loader size="lg" className="mt-16" />
  if (error || !data) return <p className="text-center text-[#8aabbf] mt-16">{error || 'User not found'}</p>

  const { user: profile, followStatus, requestSent } = data
  const initialStatus  = followStatus ? 'Followed' : requestSent ? 'Requested' : 'Unfollowed'
  const isPrivate      = profile.isAccountPrivate ?? false
  const canSeeContent  = !isPrivate || followStatus
  const followersCount = profile.followers?.length  ?? profile.followersCount  ?? 0
  const followingsCount= profile.followings?.length ?? profile.followingsCount ?? 0
  const postsCount     = profile.posts?.length      ?? profile.postsCount      ?? 0

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start gap-5">
          <Avatar src={profile.avatar} name={`${profile.firstName} ${profile.lastName}`} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-[#3a5a6e]" style={{ fontFamily: "'Georgia', serif" }}>
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-sm text-[#8aabbf]">@{profile.username}</p>
              </div>
              <FollowButton userId={String(profile.id)} initialStatus={initialStatus} />
            </div>
            {profile.bio && canSeeContent && <p className="mt-3 text-sm text-[#5a7a8e]">{profile.bio}</p>}
            <div className="flex gap-3 mt-4 flex-wrap">
              <StatBadge label="Posts"     value={canSeeContent ? postsCount : 0} />
              <StatBadge label="Followers" value={canSeeContent ? followersCount : 0} />
              <StatBadge label="Following" value={canSeeContent ? followingsCount : 0} />
            </div>
          </div>
        </div>
      </Card>

      {!canSeeContent && (
        <Card>
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#bde0f5] to-[#5ab6d8] flex items-center justify-center text-3xl">🔒</div>
            <p className="text-base font-semibold text-[#3a5a6e]">This account is private</p>
            <p className="text-sm text-[#8aabbf] max-w-xs">Follow to see their photos, posts, and more.</p>
            {requestSent && (
              <span className="px-4 py-1.5 rounded-full bg-[#e8f4fb] text-[#5ab6d8] text-xs font-semibold">
                Follow request sent — awaiting approval
              </span>
            )}
          </div>
        </Card>
      )}

      {canSeeContent && profile.posts && profile.posts.length > 0 && (
        <div className="space-y-4">
          {(profile.posts as any[]).map((post) => (
            <PublicPostCard key={post.id} post={post}
              profileAvatar={profile.avatar} profileName={`${profile.firstName} ${profile.lastName}`}
              profileUsername={profile.username} />
          ))}
        </div>
      )}

      {canSeeContent && (!profile.posts || profile.posts.length === 0) && (
        <Card><p className="text-sm text-[#8aabbf] text-center py-4">No posts yet.</p></Card>
      )}
    </div>
  )
}