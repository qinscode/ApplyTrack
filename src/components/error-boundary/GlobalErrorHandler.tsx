import React, { useEffect, useState } from 'react'
import { toast } from '@/components/ui/sonner'

// 定义错误类型
type ErrorType = 'auth' | 'network' | 'server' | 'validation' | 'unknown'

// 错误处理配置
interface ErrorConfig {
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// 错误配置映射
const errorConfigs: Record<ErrorType, (error: any) => ErrorConfig> = {
  auth: () => ({
    title: '认证错误',
    message: '您的登录会话可能已过期，请重新登录',
    duration: 5000,
    action: {
      label: '去登录',
      onClick: () => {
        window.location.href = '/auth/login'
      }
    }
  }),
  network: () => ({
    title: '网络错误',
    message: '无法连接到服务器，请检查您的网络连接',
    duration: 4000
  }),
  server: (error) => ({
    title: '服务器错误',
    message: error?.response?.data?.message || '服务器处理请求时出错，请稍后再试',
    duration: 4000
  }),
  validation: (error) => ({
    title: '输入验证错误',
    message: error?.response?.data?.message || '请检查您输入的信息是否正确',
    duration: 4000
  }),
  unknown: () => ({
    title: '发生错误',
    message: '处理您的请求时发生未知错误',
    duration: 3000
  })
}

// 根据错误响应确定错误类型
const getErrorType = (error: any): ErrorType => {
  if (!error) return 'unknown'

  // 检查是否是网络错误
  if (error.message === 'Network Error' || !error.response) {
    return 'network'
  }

  // 根据状态码确定错误类型
  const status = error.response?.status
  if (status === 401 || status === 403) {
    return 'auth'
  } else if (status >= 500) {
    return 'server'
  } else if (status === 400 || status === 422) {
    return 'validation'
  }

  return 'unknown'
}

// 全局错误处理器组件
const GlobalErrorHandler: React.FC = () => {
  // 使用一个状态来跟踪上次显示的错误，避免重复显示
  const [lastError, setLastError] = useState<string | null>(null)

  useEffect(() => {
    // 创建一个全局错误处理函数
    const handleGlobalError = (event: ErrorEvent) => {
      // 只处理未捕获的错误
      if (event.error && event.error.message !== lastError) {
        setLastError(event.error.message)
        toast.error('应用错误', {
          description: '应用发生了一个错误，请刷新页面或联系支持团队',
          duration: 5000
        })
        console.error('Uncaught error:', event.error)
      }
    }

    // 创建一个未处理的Promise拒绝处理函数
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.message !== lastError) {
        setLastError(event.reason.message)

        // 确定错误类型并获取配置
        const errorType = getErrorType(event.reason)
        const config = errorConfigs[errorType](event.reason)

        // 显示错误提示
        toast.error(config.title, {
          description: config.message,
          duration: config.duration,
          action: config.action
        })

        console.error('Unhandled promise rejection:', event.reason)
      }
    }

    // 添加事件监听器
    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // 清理函数
    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [lastError])

  // 这个组件不渲染任何UI
  return null
}

export { GlobalErrorHandler }
