import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { ScreenLoader } from '@/components/loaders'

import { useAuthContext } from './useAuthContext'

/**
 * RequireAuth 组件用于保护需要认证的页面
 * 如果用户未登录，则重定向到登录页面
 * 如果用户已登录，则允许访问受保护的页面
 */
const RequireAuth = () => {
  const { auth, loading } = useAuthContext()
  const location = useLocation()

  console.log('RequireAuth: 检查认证状态', {
    auth: !!auth,
    loading,
    path: location.pathname
  })

  // 如果正在加载认证状态，显示加载中
  if (loading) {
    console.log('RequireAuth: 正在加载认证状态，显示加载中')
    return <ScreenLoader />
  }

  // 如果用户已登录，允许访问受保护的页面
  if (auth) {
    console.log('RequireAuth: 用户已登录，允许访问受保护的页面')
    return <Outlet />
  }

  // 用户未登录，重定向到登录页面
  console.log('RequireAuth: 用户未登录，重定向到登录页面')
  return <Navigate to="/auth/login" state={{ from: location }} replace />
}

export { RequireAuth }
