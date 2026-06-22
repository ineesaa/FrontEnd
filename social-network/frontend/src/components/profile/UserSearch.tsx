import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { accountService } from '../../services/accountService'
import type { Follower, SearchResponse } from '../../helpers/types'
import { UserCard } from '../ui/UserCard'

export const UserSearch = () => {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState<Follower[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 400)
  const navigate       = useNavigate()

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    accountService
      .search(debouncedQuery.trim())
      .then((data: SearchResponse) => {
        if (cancelled) return
        setResults(data.users ?? [])
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Search failed:', err)
        setError('Search failed. Please try again.')
        setResults([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [debouncedQuery])

  return (
    <div className="bg-white rounded-3xl ring-2 ring-[#cce4f0] p-5 space-y-3">
      <h3 className="text-sm font-semibold text-[#3a5a6e]">Find People</h3>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username or name..."
        className="w-full px-4 py-3 rounded-2xl border border-[#cce4f0] bg-[#f7fcff] focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] text-sm text-[#3a5a6e] placeholder:text-[#b0cdd9] transition"
      />

      {loading && (
        <p className="text-xs text-[#8aabbf] px-1 animate-pulse">
          Searching...
        </p>
      )}

      {!loading && error && (
        <p className="text-xs text-red-400 px-1">{error}</p>
      )}

      {!loading && !error && debouncedQuery.trim() && results.length === 0 && (
        <p className="text-xs text-[#8aabbf] px-1">
          No users found for &ldquo;{debouncedQuery}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="divide-y divide-[#f0f8fd]">
          {results.map((u: Follower) => (
            <UserCard
              key={u.id}
              user={u}
              onClick={() => navigate(`/profile/user/${u.username}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserSearch