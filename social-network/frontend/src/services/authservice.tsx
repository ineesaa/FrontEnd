import { Http } from '../config/api'
import type { Follower, User } from '../helpers/types'

const BASE = 'http://localhost:4002'

export const authService = {
  
    getUser: (): Promise<User> => 
      Http.get<{ user: User }>('/auth/user').then((r) => r.data.user),
  
    signin: (data: any) => 
      Http.post('/auth/signin', data).then((r) => r.data),
  
    signup: (data: any) => 
      Http.post('/auth/signup', data).then((r) => r.data),
  }
const refetchUser = (): Promise<User> =>
  Http.get<{ user: User }>('/auth/user').then((r) => r.data.user)

export const buildAvatarUrl = (avatar?: string): string | undefined => {
  if (!avatar) return undefined
  if (avatar.startsWith('http')) return avatar
  return `${BASE}/uploads/${avatar}`
}

export const accountService = {
  getProfile: (username: string) =>
    Http.get<{ user: User }>(`/account/${username}`).then((r) => r.data.user),

  search: (text: string) =>
    Http.get<Follower[] | { users: Follower[] }>(`/account/search/${encodeURIComponent(text)}`)
      .then((r) => (Array.isArray(r.data) ? r.data : (r.data as { users: Follower[] }).users ?? [])),

  updateAvatar: async (file: File): Promise<User> => {
    const form = new FormData()
    form.append('profile-pic', file) 

    const token = localStorage.getItem('auth_token')

    await Http.patch<{ picture: string }>('/account/avatar', form, {
      headers: {
        'Content-Type': undefined, 
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    })

    return refetchUser()
  },
  updateBio: async (bio: string): Promise<User> => {
    await Http.patch('/account/bio', { bio })
    return refetchUser()
  },

  updatePrivacy: async (isPrivate: boolean): Promise<User> => {
    await Http.patch('/account/privacy', { isAccountPrivate: isPrivate })
    return refetchUser()
  },

  updateTheme: async (theme: string): Promise<User> => {
    await Http.patch('/account/theme', { theme })
    return refetchUser()
  },

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    Http.patch('/account/settings/password', data).then((r) => r.data),
}