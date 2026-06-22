import { Http } from '../config/api'
import type { FollowRequest, FollowStatus } from '../helpers/types'

export const followService = {
  toggle: (id: string) =>
    Http.post<{ status: FollowStatus }>(`/follow/${id}`)
      .then((r) => r.data),

  getRequests: () =>
    Http.get<{ requests: FollowRequest[] }>('/follow/requests')
      .then((r) => r.data.requests ?? []),

  accept: (id: string) =>
    Http.patch(`/follow/requests/accept/${id}`).then((r) => r.data),

  decline: (id: string) =>
    Http.patch(`/follow/requests/decline/${id}`).then((r) => r.data),
}