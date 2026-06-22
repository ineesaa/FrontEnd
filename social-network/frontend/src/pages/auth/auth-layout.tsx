import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { AuthContext } from '../../helpers/AuthContext'
import { Sidebar } from '../../components/layout/Sidebar'
import { Loader } from '../../components/ui/Loader'

export const AuthLayout = () => {
  const { user, loading, error, refetch, setUser } = useCurrentUser()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <Loader size="lg" />
      </div>
    )
  }

  if (error || !localStorage.getItem('auth_token') || !user) {
    return <Navigate to="/" replace />
  }

  return (
    <AuthContext.Provider value={{ user, loading, refetch, setUser }}>
      <div className="min-h-screen bg-[#f5f0e8] flex relative overflow-hidden">
        <div className="absolute top-[-80px] left-[-80px] w-[340px] h-[340px] rounded-full bg-[#bde0f5] opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#a8d5ee] opacity-20 blur-3xl pointer-events-none" />
        <Sidebar user={user} />
        <main className="flex-1 ml-64 p-8 relative z-10 min-h-screen overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthContext.Provider>
  )
}