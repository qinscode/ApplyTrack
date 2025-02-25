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

export const googleLogin = async (accessToken: string) => {
  const response = await api.post('/auth/google', {
    access_token: accessToken
  })
  const { access_token } = response.data
  updateToken(access_token)
  return response.data
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
