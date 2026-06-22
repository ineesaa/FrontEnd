import { Http } from '../config/api'

export interface PostInfo {
  id: string
  authorId: string
  title: string
  description: string
  postImage?: string
  tags?: string[]
  location?: string
  author?: {
    id: string
    username: string
    firstName?: string
    lastName?: string
    avatar?: string
  }
  postComments?: any[]
  postReactions?: any[]
  likesCount?: number
  commentsCount?: number
  likedByMe?: boolean
}

export interface CreatePostPayload {
  title: string
  description: string
  location?: string
  tags?: string[]
  image?: File
}

export const postService = {
  getById: (postId: string) =>
    Http.get<{ postInfo: PostInfo }>(`/posts/${postId}`)
      .then((r) => {
        const post = r.data.postInfo
        const token = localStorage.getItem('auth_token')
        let currentUserId: number | null = null
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            currentUserId = payload.id
          } catch {}
        }
        const reactions = (post as any).postReactions ?? []
        const likedByMe = currentUserId
          ? reactions.some((r: any) => r.userId === currentUserId)
          : false
        return { ...post, likedByMe, likesCount: reactions.length }
      }),

  // ✅ create — was missing
  create: (payload: CreatePostPayload) => {
    const formData = new FormData()
    formData.append('title', payload.title)
    formData.append('description', payload.description)
    if (payload.location) formData.append('location', payload.location)
    if (payload.tags && payload.tags.length > 0) {
      formData.append('tags', JSON.stringify(payload.tags))
    }
    if (payload.image) formData.append('image', payload.image)
    return Http.post<{ postInfo: PostInfo }>('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data.postInfo)
  },

  delete: (postId: string) =>
    Http.delete(`/posts/${postId}`).then((r) => r.data),

  toggleLike: (postId: string) =>
    Http.post<{ reactionStatus: boolean; reaction?: { id: string; postId: string; userId: string } }>(
      `/posts/${postId}/likes`
    ).then((r) => r.data),

  getLikes: (postId: string) =>
    Http.get<{ reactions: Array<{ id: string; postId: string; userId: string }> }>(
      `/posts/${postId}/likes`
    ).then((r) => r.data.reactions ?? []),
}