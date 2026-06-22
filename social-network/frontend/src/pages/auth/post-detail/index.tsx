import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postService, type PostInfo } from '../../../services/postService'
import { useAuth } from '../../../helpers/AuthContext'
import { Avatar } from '../../../components/ui/Avatar'
import { Loader } from '../../../components/ui/Loader'
import { CommentList } from '../../../components/post/CommentList'
import { Http } from '../../../config/api'

export const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>()
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const [post, setPost]       = useState<PostInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [liking, setLiking]   = useState(false)
  const [error, setError]     = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return
    postService.getById(postId).then(setPost)
      .catch(() => setError('Post not found')).finally(() => setLoading(false))
  }, [postId])

  const handleLike = async () => {
    if (!post || liking) return
    setLiking(true)
    try {
      await postService.toggleLike(post.id)
      setPost((p) => p ? { ...p, likedByMe: !p.likedByMe,
        likesCount: p.likedByMe ? Math.max((p.likesCount ?? 0) - 1, 0) : (p.likesCount ?? 0) + 1 } : p)
    } finally { setLiking(false) }
  }

  const handleComment = async () => {
    if (!comment.trim() || !postId || sending) return
    setSending(true)
    try {
      const { data } = await Http.post(`/posts/${postId}/comments`, { text: comment.trim() })
      const newComment = { id: String(data.comment?.id ?? Date.now()),
        text: comment.trim(), createdAt: data.comment?.createdAt,
        user: { id: String(user?.id), username: user?.username ?? '',
          firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', avatar: user?.avatar ?? '' } }
      setPost((p) => p ? { ...p, postComments: [...(p.postComments ?? []), newComment],
        commentsCount: (p.commentsCount ?? 0) + 1 } : p)
      setComment('')
    } catch (err) { console.error('Comment failed:', err) }
    finally { setSending(false) }
  }

  if (loading) return <Loader size="lg" className="mt-16" />
  if (error || !post) return <p className="text-center text-[#8aabbf] mt-16">{error || 'Post not found'}</p>

  const postAuthor = (post as any).author
  const authorName = postAuthor
    ? `${postAuthor.firstName ?? ''} ${postAuthor.lastName ?? ''}`.trim() : 'Unknown'
  const imageUrl = post.postImage ? `http://localhost:4002/uploads/${post.postImage}?t=${Date.now()}` : null
  const liked    = post.likedByMe ?? false
  const comments = (post.postComments ?? []) as any[]

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="text-sm text-[#5ab6d8] hover:text-[#3a9abf] transition">← Back</button>
      <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar src={postAuthor?.avatar} name={authorName} size="sm" />
          <div>
            <p className="text-sm font-semibold text-[#3a5a6e]">{authorName}</p>
            {postAuthor?.username && <p className="text-xs text-[#8aabbf]">@{postAuthor.username}</p>}
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-[#3a5a6e]">{post.title}</h2>
          <p className="text-sm text-[#5a7a8e]">{post.description}</p>
        </div>
        {imageUrl && <img src={imageUrl} alt={post.title} className="w-full max-h-96 object-cover rounded-2xl" />}
        <div className="flex items-center gap-4 pt-1 border-t border-[#f0f8fd]">
          <button onClick={handleLike} disabled={liking}
            className={`flex items-center gap-1.5 text-xs font-medium transition disabled:opacity-50 ${liked ? 'text-[#5ab6d8]' : 'text-[#b0cdd9] hover:text-[#5ab6d8]'}`}>
            {liked ? '❤️' : '🤍'} {post.likesCount ?? 0}
          </button>
          <span className="text-xs text-[#b0cdd9]">💬 {comments.length}</span>
        </div>
      </div>
      <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-4">
        <h3 className="text-sm font-semibold text-[#3a5a6e]">Comments ({comments.length})</h3>
        <CommentList comments={comments} />
        <div className="flex items-center gap-3 pt-2 border-t border-[#f0f8fd]">
          <Avatar src={user?.avatar} name={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()} size="sm" />
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()} placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-2xl border border-[#cce4f0] bg-[#f7fcff] text-sm text-[#3a5a6e] placeholder:text-[#b0cdd9] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] transition" />
          <button onClick={handleComment} disabled={sending || !comment.trim()}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#7ec8e3] to-[#5ab6d8] text-white text-xs font-semibold disabled:opacity-40 transition">
            {sending ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}