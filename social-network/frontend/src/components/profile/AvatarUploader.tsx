import { useRef, useState } from 'react'
import type { User } from '../../helpers/types'
import { Http } from '../../config/api'
import { Avatar } from '../ui/Avatar'

interface Props {
  user: User
  onUpdate: (u: User) => void
}

export const AvatarUploader = ({ user, onUpdate }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)
  const inputRef              = useRef<HTMLInputElement>(null)
  const blobRef               = useRef<string | null>(null)
  // Always-current user ref — prevents stale closure overwriting other fields
  const userRef               = useRef<User>(user)
  userRef.current             = user

  const fullName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Revoke previous blob
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current)
      blobRef.current = null
    }

    // Snapshot current user before any async gap
    const currentUser = userRef.current

    // Optimistic preview
    const previewUrl = URL.createObjectURL(file)
    blobRef.current  = previewUrl
    onUpdate({ ...currentUser, avatar: previewUrl })

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('profile-pic', file)

      const { data } = await Http.patch('/account/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Backend returns { picture: "filename.jpg" }
      const picture = (data as { picture?: string })?.picture
      const newAvatar = picture?.replace(/%22/g, '').replace(/['"]+/g, '').trim()

      if (newAvatar) {
        // Commit permanent filename; revoke blob only after state is updated
        onUpdate({ ...currentUser, avatar: newAvatar })
        URL.revokeObjectURL(previewUrl)
        blobRef.current = null
      }
      // If no filename returned, keep the blob preview visible
    } catch (err) {
      console.error('Avatar upload failed:', err)
      setError('Upload failed. Please try again.')
      onUpdate({ ...currentUser })
      URL.revokeObjectURL(previewUrl)
      blobRef.current = null
    } finally {
      setLoading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    // shrink-0 + explicit w-24 h-24 — container never collapses in flex rows
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div
        className="relative cursor-pointer group"
        style={{ width: 96, height: 96 }}   // inline size lock
        onClick={() => !loading && inputRef.current?.click()}
        title="Click to change photo"
      >
        <Avatar src={user?.avatar} name={fullName} size="xl" />

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <span className="text-white text-xs font-semibold text-center leading-tight px-1">
            {loading ? 'Uploading...' : '📷 Change'}
          </span>
        </div>

        {/* Upload spinner */}
        {loading && (
          <div className="absolute inset-0 rounded-3xl bg-black/50 flex items-center justify-center z-20">
            <svg
              className="animate-spin w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25" cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 text-center max-w-[6rem]">{error}</p>
      )}
    </div>
  )
}

export default AvatarUploader