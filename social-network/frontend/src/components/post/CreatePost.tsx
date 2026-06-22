import { useState } from 'react'
import { postService, type PostInfo } from '../../services/postService'
import { useAuth } from '../../helpers/AuthContext'
import { Avatar } from '../ui/Avatar'
import { PostForm } from './PostForm'

interface Props { onCreated: (post: PostInfo) => void }

export const CreatePost = ({ onCreated }: Props) => {
  const { user }            = useAuth()
  const [expanded, setExp]  = useState(false)
  const [loading, setLoad]  = useState(false)
  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()

  const handleSubmit = async (data: {
    title: string; description: string
    location: string; tags: string; image: File | null
  }) => {
    setLoad(true)
    try {
      const parsedTags = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      const post = await postService.create({
        title: data.title.trim(), description: data.description.trim(),
        location: data.location.trim() || undefined,
        tags: parsedTags.length > 0 ? parsedTags : undefined,
        image: data.image ?? undefined,
      })
      onCreated(post)
      setExp(false)
    } catch (err) {
      console.error('Failed to create post:', err)
    } finally { setLoad(false) }
  }

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Avatar src={user?.avatar} name={fullName} size="md" />
        <button onClick={() => setExp((v) => !v)}
          className="flex-1 text-left px-4 py-2.5 rounded-2xl bg-[#f7fcff] border border-[#cce4f0] text-sm text-[#b0cdd9] hover:border-[#7ec8e3] transition">
          What's on your mind?
        </button>
      </div>
      {expanded && (
        <PostForm onSubmit={handleSubmit} loading={loading}
          onCancel={() => setExp(false)} />
      )}
    </div>
  )
}