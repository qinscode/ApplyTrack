import { Navigate, Outlet } from 'react-router-dom'
import { ScreenLoader } from '@/components/loaders'
import { useAuthContext } from './useAuthContext'

/**
 * RequireNoAuth 组件用于保护登录和注册页面
 * 如果用户已经登录，则重定向到主页
 * 如果用户未登录，则允许访问登录和注册页面
 */
const RequireNoAuth = () => {
  const { auth, loading } = useAuthContext()

  console.log('RequireNoAuth: 检查认证状态', { auth: !!auth, loading })

  // 如果正在加载认证状态，显示加载中
  if (loading) {
    console.log('RequireNoAuth: 正在加载认证状态，显示加载中')
    return <ScreenLoader />
  }

  // 如果用户已登录，重定向到主页
  if (auth) {
    console.log('RequireNoAuth: 用户已登录，重定向到主页')
    return <Navigate to="/" replace />
  }

  // 用户未登录，允许访问登录和注册页面
  console.log('RequireNoAuth: 用户未登录，允许访问登录和注册页面')
  return <Outlet />
}

export { RequireNoAuth }
