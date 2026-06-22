import { useAuth } from '../../../helpers/AuthContext'
import { ProfileHeader } from '../../../components/profile/ProfileHeader'
import { UserSearch } from '../../../components/profile/UserSearch'
import { BioEditor } from '../../../components/profile/BioEditor'
import { ProfileToggles } from '../../../components/profile/ProfileToggles'

export const Profile = () => {
  const { user, setUser } = useAuth()
  if (!user) return null

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} onUpdate={setUser} />
      <UserSearch />
      <BioEditor user={user} onUpdate={setUser} />
      <ProfileToggles user={user} onUpdate={setUser} />
    </div>
  )
}

export default Profile