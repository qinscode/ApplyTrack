import { Navigate, Outlet } from 'react-router-dom'
import { ScreenLoader } from '@/components/loaders'
import { useAuthContext } from './useAuthContext'

/**
 * RequireNoAuth component protects login and registration pages
 * If user is already authenticated, redirects to homepage
 * If user is not authenticated, allows access to login and registration pages
 */
const RequireNoAuth = () => {
  const { auth, loading } = useAuthContext()

  // If authentication state is loading, show loading screen
  if (loading) {
    return <ScreenLoader />
  }

  // If user is authenticated, redirect to homepage
  if (auth) {
    return <Navigate to="/" replace />
  }

  // User is not authenticated, allow access to login and registration pages
  return <Outlet />
}

export { RequireNoAuth }
