import api, { updateToken } from './axios'

interface User {
  username: string
  email: string
}

interface RegisterResponse {
  access_token: string
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/Users')
  return response.data
}

export const register = async (userData: {
  username: string
  email: string
  password: string
}): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', userData)
  const { access_token } = response.data
  updateToken(access_token)
  return response.data
}

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/Users/GetUser')
    return response.data
  } catch (error) {
    console.error('Failed to fetch current user:', error)
    throw error
  }
}
