import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '@/api'
import { toAbsoluteUrl } from '@/utils'
import { useAuthContext } from '@/auth/useAuthContext'
import { AuthModel } from '@/auth'

// 谷歌登录配置
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || window.location.origin

interface GoogleLoginProps {
  buttonText?: string
  className?: string
  onSuccess?: (response: any) => void
  onFailure?: (error: any) => void
}

export const GoogleLogin = ({
  buttonText = 'Use Google',
  className = 'btn btn-light btn-sm justify-center',
  onSuccess,
  onFailure
}: GoogleLoginProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const popupRef = useRef<Window | null>(null)
  const checkIntervalRef = useRef<number | null>(null)
  const { saveAuth } = useAuthContext()

  // 使用弹出窗口方式进行 Google 登录
  const handlePopupLogin = () => {
    try {
      setLoading(true)
      setError(null)

      console.log('Opening Google OAuth popup...')

      // 构建 OAuth URL
      const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      oauthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID)
      oauthUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI)
      oauthUrl.searchParams.append('response_type', 'token')
      oauthUrl.searchParams.append('scope', 'email profile openid')
      oauthUrl.searchParams.append('prompt', 'select_account')
      oauthUrl.searchParams.append('access_type', 'online')

      // 计算弹出窗口的位置（居中）
      const width = 500
      const height = 600
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      // 打开弹出窗口
      popupRef.current = window.open(
        oauthUrl.toString(),
        'googleLoginPopup',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      )

      if (!popupRef.current || popupRef.current.closed) {
        throw new Error('弹出窗口被阻止，请允许浏览器弹出窗口')
      }

      // 监听弹出窗口的关闭和消息
      const checkPopup = () => {
        if (!popupRef.current || popupRef.current.closed) {
          // 弹出窗口已关闭
          clearInterval(checkIntervalRef.current as number)
          setLoading(false)
          return
        }

        try {
          // 尝试获取弹出窗口的 URL
          const currentUrl = popupRef.current.location.href

          if (currentUrl.includes(GOOGLE_REDIRECT_URI) || currentUrl.includes('callback')) {
            // 已重定向到回调 URL
            clearInterval(checkIntervalRef.current as number)

            // 解析 URL 中的 token
            let token: string | null = null

            // 尝试从 URL hash 中获取 token
            if (popupRef.current.location.hash) {
              const hashParams = new URLSearchParams(popupRef.current.location.hash.substring(1))
              const idToken = hashParams.get('id_token')
              const accessToken = hashParams.get('access_token')
              const simpleToken = hashParams.get('token')
              token = idToken || accessToken || simpleToken
            }

            // 如果没有找到 token，尝试从 URL 参数中获取
            if (!token) {
              const params = new URLSearchParams(popupRef.current.location.search)
              const urlToken = params.get('token')
              const code = params.get('code')
              const credential = params.get('credential')
              token = urlToken || code || credential
            }

            if (token) {
              // 关闭弹出窗口
              popupRef.current.close()

              // 处理 token
              handleToken(token)
            } else {
              // 未找到 token
              popupRef.current.close()
              setError('未能获取认证令牌')
              setLoading(false)

              if (onFailure) {
                onFailure(new Error('未能获取认证令牌'))
              }
            }
          }
        } catch (e) {
          // 跨域错误，忽略
          // 当弹出窗口导航到其他域时，会发生这种情况
        }
      }

      // 每 500ms 检查一次弹出窗口状态
      checkIntervalRef.current = window.setInterval(checkPopup, 500)

      // 添加消息事件监听器，用于接收弹出窗口发送的消息
      const handleMessage = (event: MessageEvent) => {
        // 验证消息来源
        if (event.origin !== window.location.origin) {
          return
        }

        if (event.data && event.data.type === 'google-login') {
          if (event.data.token) {
            // 处理 token
            handleToken(event.data.token)
          } else if (event.data.error) {
            setError(event.data.error)
            setLoading(false)

            if (onFailure) {
              onFailure(new Error(event.data.error))
            }
          }
        }
      }

      window.addEventListener('message', handleMessage)

      // 清理函数
      return () => {
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current)
        }
        window.removeEventListener('message', handleMessage)
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close()
        }
      }
    } catch (error: any) {
      console.error('Failed to open Google OAuth popup:', error)
      setError(error.message || '无法打开登录窗口')
      setLoading(false)

      if (onFailure) {
        onFailure(error)
      }
    }
  }

  // 处理获取到的 token
  const handleToken = async (token: string) => {
    try {
      console.log('Token received, calling backend API...')
      console.log('Token length:', token.length)

      // 调用后端 API 验证 token
      const response = await authApi.googleLogin(token)

      console.log('Backend response received')

      if (response && response.access_token) {
        // 登录成功
        console.log('Authentication successful')

        // 更新认证上下文
        const authModel: AuthModel = {
          access_token: response.access_token,
          api_token: response.access_token
        }
        console.log('更新认证上下文...')
        saveAuth(authModel)
        console.log('认证上下文已更新')

        // 尝试在本地存储 token
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('access_token', response.access_token)
            console.log('Token 已保存到 localStorage')
          }
        } catch (storageError) {
          console.error('Failed to store token in localStorage:', storageError)
          // 继续执行，不中断登录流程
        }

        if (onSuccess) {
          console.log('调用 onSuccess 回调...')
          onSuccess(response)
        } else {
          console.log('准备导航到路径:', from)
          navigate(from, { replace: true })
          console.log('导航已触发')
        }
      } else {
        throw new Error('认证失败，未收到有效的访问令牌')
      }
    } catch (error: any) {
      console.error('Google login API error:', error)

      let errorMessage = '认证失败，请稍后再试'

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = `认证失败: ${error.response.data.message}`
        } else {
          errorMessage = `认证失败 (${error.response.status}): 服务器返回错误`
        }
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)

      if (onFailure) {
        onFailure(error)
      }
    } finally {
      setLoading(false)
    }
  }

  // 清理弹出窗口和定时器
  useEffect(() => {
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close()
      }
    }
  }, [])

  return (
    <>
      <button type="button" className={className} onClick={handlePopupLogin} disabled={loading}>
        <img
          src={toAbsoluteUrl('/media/brand-logos/google.svg')}
          className="size-3.5 shrink-0"
          alt="Google"
        />
        {loading ? 'Loading...' : buttonText}
      </button>

      {error && <div className="text-danger text-xs mt-1">{error}</div>}
    </>
  )
}

// 为 window 对象添加 google 类型
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          renderButton: (parent: HTMLElement, options: any) => void
        }
      }
    }
  }
}
