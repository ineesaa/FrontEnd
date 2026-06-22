import { createContext, useContext } from 'react'
import type { User } from './types'

interface AuthContextType {
  user: User | null
  loading: boolean
  refetch: () => Promise<void>
  setUser: (u: User) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refetch: async () => {},
  setUser: () => {},
})

export const useAuth = () => useContext(AuthContext)