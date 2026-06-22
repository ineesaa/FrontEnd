import { useNavigate } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'

interface Props {
  post: any
  profileAvatar?: string
  profileName?: string
  profileUsername?: string
}

export const PublicPostCard = ({ post, profileAvatar, profileName, profileUsername }: Props) => {
  const navigate     = useNavigate()
  const authorName   = post.author
    ? `${post.author.firstName ?? ''} ${post.author.lastName ?? ''}`.trim()
    : profileName ?? ''
  const authorAvatar   = post.author?.avatar   ?? profileAvatar
  const authorUsername = post.author?.username ?? profileUsername
  const imageUrl = post.postImage
    ? `http://localhost:4002/uploads/${post.postImage}?t=${Date.now()}` : null
  const likesCount    = post.likesCount    ?? post.postReactions?.length  ?? 0
  const commentsCount = post.commentsCount ?? post.postComments?.length   ?? 0

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar src={authorAvatar} name={authorName} size="sm" />
        <div>
          <p className="text-sm font-semibold text-[#3a5a6e]">{authorName}</p>
          <p className="text-xs text-[#8aabbf]">@{authorUsername}</p>
        </div>
      </div>
      <div className="space-y-1">
        {post.title && <h3 className="text-sm font-semibold text-[#3a5a6e]">{post.title}</h3>}
        {post.description && <p className="text-sm text-[#5a7a8e]">{post.description}</p>}
      </div>
      {imageUrl && <img src={imageUrl} alt={post.title ?? 'Post'}
        className="w-full max-h-80 object-cover rounded-2xl" />}
      {(post.location || post.tags?.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {post.location && <span className="text-xs text-[#8aabbf]">📍 {post.location}</span>}
          {post.tags?.map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-[#e8f4fb] text-[#5ab6d8] text-xs">#{tag}</span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 pt-1 border-t border-[#f0f8fd]">
        <button onClick={() => navigate(`/profile/posts/${post.id}`)}
          className="flex items-center gap-1.5 text-xs text-[#b0cdd9] hover:text-[#5ab6d8] transition">
          ❤️ {likesCount}
        </button>
        <button onClick={() => navigate(`/profile/posts/${post.id}`)}
          className="flex items-center gap-1.5 text-xs text-[#b0cdd9] hover:text-[#5ab6d8] transition">
          💬 {commentsCount}
        </button>
      </div>
    </div>
  )
}