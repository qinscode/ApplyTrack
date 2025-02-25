import { useState, useEffect } from 'react'
import { getCurrentUser } from '@/api/users'

interface User {
  username: string
  email: string
}

interface UseCurrentUserReturn {
  user: User | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * A custom hook to fetch and manage the current user's information
 * @returns {Object} An object containing user data, loading state, error state, and a refetch function
 */
export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Fetches the current user's information from the API
   */
  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch user information'))
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser()
  }, [])

  /**
   * Manually refetch the user's information
   */
  const refetch = async () => {
    await fetchUser()
  }

  return { user, loading, error, refetch }
}
