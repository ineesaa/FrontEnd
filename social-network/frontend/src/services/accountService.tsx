import type { SearchResponse, PublicProfileResponse } from '../helpers/types'
import { Http } from '../config/api'

export async function updateAvatar(file: File): Promise<unknown> {
  const formData = new FormData()
  formData.append('profile-pic', file)
  const { data } = await Http.patch('/account/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}


export async function updateBio(bio: string): Promise<{ bio: string }> {
  const { data } = await Http.patch<{ bio: string }>('/account/bio', { bio })
  return data
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  await Http.patch('/account/settings/password', { currentPassword, newPassword })
}

// No body — backend toggles the value itself
export async function updatePrivacy(): Promise<{ isAccountPrivate: boolean }> {
  const { data } = await Http.patch<{ isAccountPrivate: boolean }>('/account/privacy')
  return data
}

export async function updateTheme(theme: string): Promise<{ theme: string }> {
  const { data } = await Http.patch<{ theme: string }>('/account/theme', { theme })
  return data
}

export async function search(query: string): Promise<SearchResponse> {
  const { data } = await Http.get<SearchResponse>(
    `/account/search/${encodeURIComponent(query)}`
  )
  return data
}

export async function getProfile(username: string): Promise<PublicProfileResponse> {
  const { data } = await Http.get<PublicProfileResponse>(`/account/${username}`)
  return data
}

export const accountService = {
  updateAvatar,
  updateBio,
  changePassword,
  updatePrivacy,
  updateTheme,
  search,
  getProfile,
} as const

export default accountService