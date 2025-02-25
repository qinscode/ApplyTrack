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
    if (error.response?.status === 401) {
      console.group('Authentication Error Details')
      console.error('Status:', error.response.status)
      console.error('Message:', error.response?.data?.message)
      console.error('URL:', error.config?.url)
      console.error('Method:', error.config?.method?.toUpperCase())
      console.error('Headers:', error.config?.headers)
      console.error('Request Data:', error.config?.data)
      console.error('Response Data:', error.response?.data)
      console.error('Stack:', error.stack)
      console.groupEnd()
    }
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
