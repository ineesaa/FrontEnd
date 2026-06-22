import { useState } from 'react'
import { useAuth } from '../../../helpers/AuthContext'
import { PostCard } from '../../../components/post/PostCard'
import { CreatePost } from '../../../components/post/CreatePost'
import type { PostInfo } from '../../../services/postService'

export const Posts = () => {
  const { user, setUser } = useAuth()

  // Posts գալիս են user object-ից — արդեն fetch արած են auth-ի ժամանակ
  const [posts, setPosts] = useState<PostInfo[]>(
    () => ((user as any)?.posts ?? []) as PostInfo[]
  )

  const handlePostCreated = (newPost: PostInfo) => {
    setPosts((prev) => [newPost, ...prev])
  }

  const handlePostDeleted = (postId: string) => {
    setPosts((prev) => prev.filter((p) => String(p.id) !== String(postId)))
  }

  const handleLikeToggled = (postId: string, liked: boolean) => {
    setPosts((prev) =>
      prev.map((p) =>
        String(p.id) === String(postId)
          ? {
              ...p,
              likedByMe:  liked,
              likesCount: liked
                ? (p.likesCount ?? 0) + 1
                : Math.max((p.likesCount ?? 0) - 1, 0),
            }
          : p
      )
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="text-2xl font-bold text-[#3a5a6e]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Posts
        </h1>
        <p className="text-sm text-[#8aabbf]">{posts.length} posts</p>
      </div>

      {/* Create post */}
      <CreatePost onCreated={handlePostCreated} />

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="rounded-3xl border border-[#d8ecf5] bg-[#f8fcff] p-8 text-center">
          <p className="text-[#8aabbf] text-sm">No posts yet. Be the first to post!</p>
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user?.id}
          currentUser={user ?? undefined}
          onDeleted={handlePostDeleted}
          onLikeToggled={handleLikeToggled}
  />
))}
      </div>
    </div>
  )
}