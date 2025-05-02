import axios from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`.trim()
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 记录所有API错误
    console.group('API Error')
    console.error('Error:', error.message)

    if (error.response) {
      console.error('Status:', error.response.status)
      console.error('Message:', error.response?.data?.message)
      console.error('URL:', error.config?.url)
      console.error('Method:', error.config?.method?.toUpperCase())
      console.error('Response Data:', error.response?.data)

      // 特别处理401错误（未授权）
      if (error.response.status === 401) {
        console.error('Authentication Error - User may need to login again')
        // 可以在这里添加自动登出逻辑
        // 例如: window.location.href = '/auth/login'
      }

      // 处理服务器错误
      if (error.response.status >= 500) {
        console.error('Server Error - This should be reported to the development team')
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('No response received from server - Network issue or server down')
    }

    console.groupEnd()
    return Promise.reject(error)
  }
)

export const updateToken = (newToken: string) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('access_token', newToken)
    }
  } catch (error) {
    console.error('Failed to store token in localStorage:', error)
  }
}

export const clearToken = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('access_token')
    }
  } catch (error) {
    console.error('Failed to remove token from localStorage:', error)
  }
}

export default api
