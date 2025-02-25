import api, { updateToken } from './axios'

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', {
    email,
    password
  })

  if (!response.data.access_token) {
    throw new Error('No token received from server')
  }

  const { access_token } = response.data
  updateToken(access_token)
  return response.data
}

export const googleLogin = async (idToken: string) => {
  try {
    console.log('Calling backend with Google token...')

    // 确保 idToken 不为空
    if (!idToken) {
      throw new Error('Google token is empty')
    }

    // 记录 token 长度，但不记录实际 token（安全考虑）
    console.log('Token length:', idToken.length)

    const response = await api.post('/auth/google', {
      access_token: idToken // 使用 access_token 作为参数名，与后端保持一致
    })

    console.log('Backend response status:', response.status)

    // 检查响应是否包含数据
    if (!response.data) {
      throw new Error('Empty response from server')
    }

    // 检查是否包含 access_token
    if (!response.data.access_token) {
      console.error('Response data:', JSON.stringify(response.data))
      throw new Error('No access token received from server')
    }

    const { access_token } = response.data
    updateToken(access_token)
    return response.data
  } catch (error: any) {
    console.error('Google login API error:', error)

    // 增强错误信息
    if (error.response) {
      console.error('Error response status:', error.response.status)
      console.error('Error response data:', error.response.data)

      // 根据状态码提供更具体的错误信息
      if (error.response.status === 401) {
        throw new Error('Google 认证失败：无效的令牌')
      } else if (error.response.status === 400) {
        throw new Error('Google 认证失败：请求格式错误')
      } else if (error.response.status === 500) {
        throw new Error('Google 认证失败：服务器内部错误')
      }
    }

    // 如果没有特定错误信息，则抛出原始错误
    throw error
  }
}

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password
  })

  if (!response.data.access_token) {
    throw new Error('No token received from server')
  }

  const { access_token } = response.data
  updateToken(access_token)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('access_token')
}
