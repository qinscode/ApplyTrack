import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ScreenLoader } from '@/components/loaders'

import { useAuthContext } from './useAuthContext'

/**
 * RequireAuth component protects authenticated pages
 * If user is not authenticated, redirects to login page
 * If user is authenticated, allows access to protected pages
 */
const RequireAuth = () => {
  const { auth, loading } = useAuthContext()
  const location = useLocation()

  // If authentication state is loading, show loading screen
  if (loading) {
    return <ScreenLoader />
  }

  // If user is authenticated, allow access to protected pages
  if (auth) {
    return <Outlet />
  }

  // User is not authenticated, redirect to login page
  return <Navigate to="/auth/login" state={{ from: location }} replace />
}

export { RequireAuth }
