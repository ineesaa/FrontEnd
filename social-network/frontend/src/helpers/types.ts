export interface User {
    id: string
    firstName: string
    lastName: string
    username: string
    bio?: string
    avatar?: string
    theme?: string
    isPrivate?: boolean
    isAccountPrivate?: boolean  // actual backend field name
    followersCount: number
    followingsCount: number
    postsCount: number
  }
  
  export interface Post {
    id: string
    content: string
    imageUrl?: string
    createdAt: string
    likesCount?: number
    commentsCount?: number
    likedByMe?: boolean
    author: Pick<User, 'id' | 'username' | 'avatar'>
  }
  
  export interface Follower {
    id: string
    firstName: string
    lastName: string
    username: string
    avatar?: string
  }
  
  export interface Following extends Follower {}
  
  export interface FollowRequest {
    id: string
    sender: Follower
    createdAt: string
  }
  
  export interface AuthResponse {
    token: string
    user: User
  }
  
  export interface SearchResponse {
    users: Follower[]
  }
  
  export interface PublicProfileResponse {
    user: PublicUser
    requestSent: boolean
    followStatus: boolean
    followsMe: boolean
  }
  
  export interface PublicUser extends User {
    followers: Array<{ sender: Follower }>
    followings: Array<{ receiver: Follower }>
    posts: Post[]
  }
  
  export type FollowStatus = 'Followed' | 'Unfollowed' | 'Requested' | 'Cancelled'