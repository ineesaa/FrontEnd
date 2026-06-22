import { useState } from 'react'
import type { User } from '../../helpers/types'
import { accountService } from '../../services/accountService'

interface Props {
  user: User
  onUpdate: (u: User) => void
}

export const ProfileToggles = ({ user, onUpdate }: Props) => {
  const [privacyLoading, setPrivacyLoading] = useState(false)

  const handlePrivacyToggle = async () => {
    if (privacyLoading) return
    setPrivacyLoading(true)
    try {
      const response = await accountService.updatePrivacy()
      onUpdate({ ...user, isAccountPrivate: response.isAccountPrivate })
    } catch (err) {
      console.error('Privacy update failed:', err)
    } finally {
      setPrivacyLoading(false)
    }
  }

  const isPrivate = user.isAccountPrivate ?? user.isPrivate ?? false

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5">
      <h3 className="text-sm font-semibold text-[#3a5a6e] mb-4">Preferences</h3>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#3a5a6e]">Private account</p>
          <p className="text-xs text-[#8aabbf] mt-0.5">
            {isPrivate
              ? 'Only followers can see your posts'
              : 'Anyone can see your posts'}
          </p>
        </div>
        <button
          onClick={handlePrivacyToggle}
          disabled={privacyLoading}
          aria-pressed={isPrivate}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] disabled:opacity-50 ${
            isPrivate ? 'bg-[#5ab6d8]' : 'bg-[#cce4f0]'
          }`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
            isPrivate ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </div>
  )
}

export default ProfileToggles