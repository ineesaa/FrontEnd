import { useEffect, useState } from 'react'
import { authService } from '../services/authservice'
import type { User } from '../helpers/types'

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refetch = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token) { setLoading(false); return }
    try {
      setLoading(true)
      setError(null)
      const data = await authService.getUser()
      setUser(data)
    } catch (err: unknown) {
      console.error('Failed to load user:', err)
      setError('Session expired. Please sign in again.')
      localStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refetch() }, [])

  return { user, loading, error, refetch, setUser }
}