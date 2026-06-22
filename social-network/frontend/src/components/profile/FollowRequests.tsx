import { useEffect, useState } from 'react'
import { followService } from '../../services/followService'
import type { FollowRequest } from '../../helpers/types'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Loader } from '../ui/Loader'

export const FollowRequests = () => {
  const [requests, setRequests] = useState<FollowRequest[]>([])
  const [loading, setLoading]   = useState(true)
  const [acting, setActing]     = useState<string | null>(null)

  useEffect(() => {
    followService.getRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false))
  }, [])

  const handle = async (id: string, action: 'accept' | 'decline') => {
    setActing(id)
    try {
      await (action === 'accept'
        ? followService.accept(id)
        : followService.decline(id))
      setRequests((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error(`Failed to ${action} request:`, err)
    } finally {
      setActing(null)
    }
  }

  if (loading) return <Loader size="sm" className="py-4" />
  if (requests.length === 0) return null

  return (
    <div className="rounded-3xl border border-[#d8ecf5] bg-[#f8fcff] p-5">
      <h3 className="text-sm font-semibold text-[#3a5a6e] mb-4">
        Follow Requests ({requests.length})
      </h3>
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="flex items-center gap-3">
            <Avatar
              src={r.sender.avatar}
              name={`${r.sender.firstName} ${r.sender.lastName}`}
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#3a5a6e] truncate">
                {r.sender.firstName} {r.sender.lastName}
              </p>
              <p className="text-xs text-[#8aabbf]">@{r.sender.username}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                loading={acting === r.id}
                onClick={() => handle(r.id, 'accept')}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="danger"
                loading={acting === r.id}
                onClick={() => handle(r.id, 'decline')}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}