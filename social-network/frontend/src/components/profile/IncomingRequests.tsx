import { useEffect, useState } from 'react'
import { followService } from '../../services/followService'
import type { FollowRequest } from '../../helpers/types'
import { Avatar } from '../ui/Avatar'
import { Loader } from '../ui/Loader'

export const IncomingRequests = () => {
  const [requests, setRequests] = useState<FollowRequest[]>([])
  const [loading, setLoading]   = useState(true)
  const [acting, setActing]     = useState<string | null>(null)

  useEffect(() => {
    followService
      .getRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false))
  }, [])

  const handle = async (id: string, action: 'accept' | 'decline') => {
    setActing(id)
    try {
      if (action === 'accept') {
        await followService.accept(id)
      } else {
        await followService.decline(id)
      }
      // Remove row on success
      setRequests((prev) => prev.filter((r) => String(r.id) !== String(id)))
    } catch (err: any) {
      // Backend validator already completed the operation before the controller
      // returns 400 "Request already accepted" — the action DID succeed.
      // Treat 400 as success and remove the row anyway.
      const status = err?.response?.status
      if (status === 400 || status === 404) {
        setRequests((prev) => prev.filter((r) => String(r.id) !== String(id)))
      } else {
        console.error(`Failed to ${action} request:`, err)
      }
    } finally {
      setActing(null)
    }
  }
  if (loading) return <Loader size="sm" className="py-4" />

  // Returns null — renders nothing — when list empties after all actions
  if (requests.length === 0) return null

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-[#3a5a6e]">
          Follow Requests
        </h3>
        <span className="px-2 py-0.5 rounded-full bg-[#e8f4fb] text-[#5ab6d8] text-xs font-semibold">
          {requests.length}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((r) => {
          const fullName = `${r.sender.firstName} ${r.sender.lastName}`.trim()
          const isActing = acting === r.id

          return (
            <div
              key={r.id}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#f7fcff] transition-colors"
            >
              <div className="shrink-0">
                <Avatar src={r.sender.avatar} name={fullName} size="sm" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3a5a6e] truncate">
                  {fullName}
                </p>
                <p className="text-xs text-[#8aabbf] truncate">
                  @{r.sender.username}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handle(r.id, 'accept')}
                  disabled={isActing}
                  className="px-3 py-1.5 rounded-2xl bg-gradient-to-r from-[#7ec8e3] to-[#5ab6d8] text-white text-xs font-semibold disabled:opacity-50 hover:opacity-90 transition"
                >
                  {isActing ? '···' : 'Accept'}
                </button>
                <button
                  onClick={() => handle(r.id, 'decline')}
                  disabled={isActing}
                  className="px-3 py-1.5 rounded-2xl bg-[#f0f8fd] text-[#8aabbf] text-xs font-semibold disabled:opacity-50 hover:bg-[#e0f0f8] hover:text-[#5ab6d8] transition"
                >
                  {isActing ? '···' : 'Decline'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default IncomingRequests