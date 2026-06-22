import { useState } from 'react'
import { followService } from '../../services/followService'
import { Button } from '../ui/Button'
import type { FollowStatus } from '../../helpers/types'

interface Props {
  userId: string
  initialStatus?: FollowStatus
}

const statusLabel: Record<FollowStatus, string> = {
  Followed:   'Following',
  Unfollowed: 'Follow',
  Requested:  'Requested',
  Cancelled:  'Follow',
}

const statusVariant: Record<FollowStatus, 'primary' | 'ghost' | 'danger'> = {
  Followed:   'ghost',
  Unfollowed: 'primary',
  Requested:  'ghost',
  Cancelled:  'primary',
}

export const FollowButton = ({ userId, initialStatus = 'Unfollowed' }: Props) => {
  const [status, setStatus]   = useState<FollowStatus>(initialStatus)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await followService.toggle(userId)
      setStatus(res.status)
    } catch (err) {
      console.error('Follow toggle failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size="sm"
      variant={statusVariant[status]}
      loading={loading}
      onClick={handleClick}
    >
      {statusLabel[status]}
    </Button>
  )
}