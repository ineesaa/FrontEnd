import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PostInfo } from '../../services/postService'
import { postService } from '../../services/postService'
import { Avatar } from '../ui/Avatar'

interface Props {
  post: PostInfo
  currentUserId?: string
  currentUser?: { id: string; username: string; firstName?: string; lastName?: string; avatar?: string }
  onDeleted: (id: string) => void
  onLikeToggled: (id: string, liked: boolean) => void
}

export const PostCard = ({ post, currentUserId, currentUser, onDeleted, onLikeToggled }: Props) => {
  const navigate              = useNavigate()
  const [liking, setLiking]   = useState(false)
  const [deleting, setDel]    = useState(false)

  const isOwner = currentUserId && (
    post.author?.id === currentUserId ||
    String((post as any).authorId) === String(currentUserId)
  )
  const liked    = post.likedByMe ?? false
  const likes    = post.likesCount ?? (post as any).postReactions?.length ?? 0
  const comments = post.commentsCount ?? (post as any).postComments?.length ?? 0

  const resolvedAuthor = post.author ?? (
    String((post as any).authorId) === String(currentUserId) ? currentUser : undefined
  )
  const authorName = resolvedAuthor
    ? `${resolvedAuthor.firstName ?? ''} ${resolvedAuthor.lastName ?? ''}`.trim() || resolvedAuthor.username
    : 'Unknown'
  const imageUrl = post.postImage
    ? `http://localhost:4002/uploads/${post.postImage}?t=${Date.now()}` : null

  const handleLike = async () => {
    if (liking) return
    setLiking(true)
    try { await postService.toggleLike(post.id); onLikeToggled(post.id, !liked) }
    catch (err) { console.error('Like failed:', err) }
    finally { setLiking(false) }
  }

  const handleDelete = async () => {
    if (deleting || !window.confirm('Delete this post?')) return
    setDel(true)
    try { await postService.delete(post.id); onDeleted(post.id) }
    catch (err) { console.error('Delete failed:', err) }
    finally { setDel(false) }
  }

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => resolvedAuthor?.username && navigate(`/profile/user/${resolvedAuthor.username}`)}
          className="flex items-center gap-3 hover:opacity-80 transition text-left">
          <Avatar src={resolvedAuthor?.avatar} name={authorName} size="sm" />
          <div>
            <p className="text-sm font-semibold text-[#3a5a6e]">{authorName}</p>
            {resolvedAuthor?.username && <p className="text-xs text-[#8aabbf]">@{resolvedAuthor.username}</p>}
          </div>
        </button>
        {isOwner && (
          <button onClick={handleDelete} disabled={deleting}
            className="text-xs text-[#b0cdd9] hover:text-red-400 transition disabled:opacity-50">
            {deleting ? '...' : '🗑️'}
          </button>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-[#3a5a6e]">{post.title}</h3>
        <p className="text-sm text-[#5a7a8e] leading-relaxed">{post.description}</p>
      </div>

      {imageUrl && <img src={imageUrl} alt={post.title} className="w-full max-h-80 object-cover rounded-2xl" />}

      {(post.location || post.tags?.length) ? (
        <div className="flex flex-wrap gap-2">
          {post.location && <span className="text-xs text-[#8aabbf]">📍 {post.location}</span>}
          {post.tags?.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-[#e8f4fb] text-[#5ab6d8] text-xs">#{tag}</span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-4 pt-1 border-t border-[#f0f8fd]">
        <button onClick={handleLike} disabled={liking}
          className={`flex items-center gap-1.5 text-xs font-medium transition disabled:opacity-50 ${liked ? 'text-[#5ab6d8]' : 'text-[#b0cdd9] hover:text-[#5ab6d8]'}`}>
          {liked ? '❤️' : '🤍'} {likes}
        </button>
        <button onClick={() => navigate(`/profile/posts/${post.id}`)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#b0cdd9] hover:text-[#5ab6d8] transition">
          💬 {comments}
        </button>
      </div>
    </div>
  )
}

