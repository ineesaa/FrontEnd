import { Avatar } from '../ui/Avatar'

interface Comment {
  id: string | number
  text?: string
  content?: string
  user?: { username?: string; firstName?: string; lastName?: string; avatar?: string }
  author?: { username?: string; firstName?: string; lastName?: string; avatar?: string }
}

interface Props { comments: Comment[] }

export const CommentList = ({ comments }: Props) => {
  if (comments.length === 0) return (
    <p className="text-xs text-[#8aabbf]">No comments yet. Be the first!</p>
  )
  return (
    <div className="space-y-3">
      {comments.map((c) => {
        const a        = c.user ?? c.author
        const name     = a ? `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim() || a.username : ''
        const username = a?.username ?? ''
        const text     = c.text ?? c.content ?? ''
        if (!text) return null
        return (
          <div key={c.id} className="flex items-start gap-3">
            <Avatar src={a?.avatar} name={name || username} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#3a5a6e]">{name || `@${username}`}</p>
              <p className="text-sm text-[#5a7a8e] mt-0.5">{text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}