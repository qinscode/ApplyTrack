import { User as Auth0UserModel } from '@auth0/auth0-spa-js'

import { getData, setData } from '@/utils'
import { type AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-auth-v${
  import.meta.env.VITE_APP_VERSION
}`

const getAuth = (): AuthModel | undefined => {
  try {
    const auth = getData(AUTH_LOCAL_STORAGE_KEY) as AuthModel | undefined

    if (auth) {
      return auth
    } else {
      // 尝试从 localStorage 中获取 access_token
      const access_token = localStorage.getItem('access_token')
      if (access_token) {
        const newAuth: AuthModel = {
          access_token,
          api_token: access_token
        }
        setAuth(newAuth)
        return newAuth
      }
      return undefined
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel | Auth0UserModel) => {
  setData(AUTH_LOCAL_STORAGE_KEY, auth)

  // 同时在 localStorage 中存储 access_token，以便其他组件使用
  if ('access_token' in auth && auth.access_token) {
    localStorage.setItem('access_token', auth.access_token)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    localStorage.removeItem('access_token')
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth()

      if (auth?.access_token) {
        config.headers.Authorization = `Bearer ${auth.access_token}`
      }

      return config
    },
    async (err: any) => await Promise.reject(err)
  )
}

export { AUTH_LOCAL_STORAGE_KEY, getAuth, removeAuth, setAuth }
