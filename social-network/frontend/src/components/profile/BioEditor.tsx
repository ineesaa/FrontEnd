import { useState } from 'react'
import type { User } from '../../helpers/types'
import { accountService } from '../../services/accountService'

interface Props {
  user: User
  onUpdate: (u: User) => void
}

export const BioEditor = ({ user, onUpdate }: Props) => {
  const [bio, setBio] = useState(user?.bio ?? '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (bio === (user?.bio ?? '')) return

    setLoading(true)
    setSuccess(false)
    setError(null)

    try {
      const response = await accountService.updateBio(bio)

      // CRITICAL: never replace the whole user object with the API response.
      // The API may return only a partial shape. Merge safely — only overwrite bio.
      const updatedBio: string =
        typeof response === 'object' && response !== null && 'bio' in response
          ? (response as any).bio ?? bio
          : bio

      // Spread ...user first so firstName, lastName, avatar, username are NEVER lost
      onUpdate({ ...user, bio: updatedBio })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } catch (err) {
      console.error('Bio update failed:', err)
      setError('Failed to save. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isDirty = bio !== (user?.bio ?? '')

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-3">
      <h3 className="text-sm font-semibold text-[#3a5a6e]">About me</h3>

      <textarea
        value={bio}
        onChange={(e) => {
          setBio(e.target.value)
          setSuccess(false)
          setError(null)
        }}
        placeholder="Write something about yourself..."
        rows={3}
        maxLength={300}
        className="w-full resize-none rounded-2xl border border-[#cce4f0] bg-[#f7fcff] px-4 py-3 text-sm text-[#3a5a6e] placeholder:text-[#b0cdd9] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] transition"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#b0cdd9]">{bio.length}/300</span>

        <div className="flex items-center gap-2">
          {success && (
            <span className="text-xs text-emerald-500 font-medium">✓ Saved</span>
          )}
          {error && (
            <span className="text-xs text-red-400">{error}</span>
          )}
          <button
            onClick={handleSave}
            disabled={loading || !isDirty}
            className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-[#7ec8e3] to-[#5ab6d8] text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BioEditor