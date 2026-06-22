import { useAuth } from '../../../helpers/AuthContext'
import { ChangePasswordForm } from '../../../components/profile/ChangePasswordForm'
import { ProfileToggles } from '../../../components/profile/ProfileToggles'
import { FollowRequests } from '../../../components/profile/FollowRequests'
import type { User } from '../../../helpers/types'

export const Settings = () => {
  const { user, setUser } = useAuth()
  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#3a5a6e]" style={{ fontFamily: "'Georgia', serif" }}>Settings</h1>
        <p className="text-sm text-[#8aabbf]">Manage your account preferences</p>
      </div>
      <FollowRequests />
      <ChangePasswordForm />
      <ProfileToggles user={user} onUpdate={(u: User) => setUser(u)} />
    </div>
  )
}