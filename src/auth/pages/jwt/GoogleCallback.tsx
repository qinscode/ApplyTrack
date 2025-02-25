import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '@/api'
import { Alert } from '@/components/alert'
import { useAuthContext } from '@/auth/useAuthContext'
import { AuthModel } from '@/auth'

export const GoogleCallback = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { saveAuth } = useAuthContext()

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log('GoogleCallback: 处理回调...')
        console.log('当前URL:', window.location.href)

        // 尝试从 URL 获取令牌
        let token: string | null = null

        // 首先尝试从 URL hash 中获取令牌
        if (location.hash) {
          console.log('从 hash 中查找令牌')
          const hashParams = new URLSearchParams(location.hash.substring(1))
          const idToken = hashParams.get('id_token')
          const accessToken = hashParams.get('access_token')
          const simpleToken = hashParams.get('token')
          token = idToken || accessToken || simpleToken

          if (token) {
            console.log('在 hash 中找到令牌，长度:', token.length)
          }
        }

        // 如果在 hash 中没有找到令牌，尝试从 URL 参数中获取
        if (!token) {
          console.log('从 URL 参数中查找令牌')
          const params = new URLSearchParams(location.search)
          const urlToken = params.get('token')
          const code = params.get('code')
          const credential = params.get('credential')
          token = urlToken || code || credential

          if (token) {
            console.log('在 URL 参数中找到令牌，长度:', token.length)
          }
        }

        // 检查是否找到令牌
        if (!token) {
          console.error('未找到令牌')
          throw new Error('未能获取认证令牌')
        }

        console.log('调用后端 API 验证令牌...')

        // 调用后端 API 验证令牌
        const response = await authApi.googleLogin(token)

        console.log('后端响应:', response)

        if (response && response.access_token) {
          console.log('认证成功，准备导航或发送消息')

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

          // 检查是否在弹出窗口中
          if (window.opener && window.opener !== window) {
            // 在弹出窗口中，向父窗口发送消息
            console.log('在弹出窗口中，向父窗口发送成功消息')
            try {
              window.opener.postMessage(
                {
                  type: 'google-login',
                  token: token,
                  response: response
                },
                window.location.origin
              )
              console.log('消息已发送到父窗口')
            } catch (messageError) {
              console.error('Failed to send message to parent window:', messageError)
            }

            // 关闭弹出窗口
            console.log('准备关闭弹出窗口')
            window.close()
          } else {
            // 不在弹出窗口中，正常导航
            console.log('不在弹出窗口中，准备导航到首页')
            navigate('/', { replace: true })
            console.log('导航已触发')
          }
        } else {
          throw new Error('认证失败，未收到有效的访问令牌')
        }
      } catch (error: any) {
        console.error('Google 回调处理错误:', error)

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

        // 如果在弹出窗口中，向父窗口发送错误消息
        if (window.opener && window.opener !== window) {
          try {
            window.opener.postMessage(
              {
                type: 'google-login',
                error: errorMessage
              },
              window.location.origin
            )
          } catch (messageError) {
            console.error('Failed to send error message to parent window:', messageError)
          }

          // // 延迟关闭窗口，让用户有机会看到错误信息
          // setTimeout(() => window.close(), 3000)
        }
      } finally {
        setLoading(false)
      }
    }

    processCallback()
  }, [location, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-lg">正在处理 Google 登录...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="max-w-md">
          <div>
            <h4 className="font-medium mb-1">登录失败</h4>
            <p>{error}</p>
          </div>
        </Alert>
      ) : (
        <p className="text-lg">登录成功，正在跳转...</p>
      )}
    </div>
  )
}
