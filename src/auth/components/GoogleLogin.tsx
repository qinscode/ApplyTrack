import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authApi } from '@/api'
import { toAbsoluteUrl } from '@/utils'
import { useAuthContext } from '@/auth/useAuthContext'
import { AuthModel } from '@/auth'

// Google login configuration
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

  // Use popup window for Google login
  const handlePopupLogin = () => {
    try {
      setLoading(true)
      setError(null)

      console.log('Opening Google OAuth popup...')

      // Build OAuth URL
      const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      oauthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID)
      oauthUrl.searchParams.append('redirect_uri', GOOGLE_REDIRECT_URI)
      oauthUrl.searchParams.append('response_type', 'token')
      oauthUrl.searchParams.append('scope', 'email profile openid')
      oauthUrl.searchParams.append('prompt', 'select_account')
      oauthUrl.searchParams.append('access_type', 'online')

      // Calculate popup window position (centered)
      const width = 500
      const height = 600
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      // Open popup window
      popupRef.current = window.open(
        oauthUrl.toString(),
        'googleLoginPopup',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      )

      if (!popupRef.current || popupRef.current.closed) {
        throw new Error('Popup window was blocked, please allow browser popups')
      }

      // Monitor popup window for closure and messages
      const checkPopup = () => {
        if (!popupRef.current || popupRef.current.closed) {
          // Popup window is closed
          clearInterval(checkIntervalRef.current as number)
          setLoading(false)
          return
        }

        try {
          // Try to get popup window URL
          const currentUrl = popupRef.current.location.href

          if (currentUrl.includes(GOOGLE_REDIRECT_URI) || currentUrl.includes('callback')) {
            // Redirected to callback URL
            clearInterval(checkIntervalRef.current as number)

            // Parse token from URL
            let token: string | null = null

            // Try to get token from URL hash
            if (popupRef.current.location.hash) {
              const hashParams = new URLSearchParams(popupRef.current.location.hash.substring(1))
              const idToken = hashParams.get('id_token')
              const accessToken = hashParams.get('access_token')
              const simpleToken = hashParams.get('token')
              token = idToken || accessToken || simpleToken
            }

            // If token not found, try to get from URL parameters
            if (!token) {
              const params = new URLSearchParams(popupRef.current.location.search)
              const urlToken = params.get('token')
              const code = params.get('code')
              const credential = params.get('credential')
              token = urlToken || code || credential
            }

            if (token) {
              // Close popup window
              popupRef.current.close()

              // Process token
              handleToken(token)
            } else {
              // Token not found
              popupRef.current.close()
              setError('Failed to get authentication token')
              setLoading(false)

              if (onFailure) {
                onFailure(new Error('Failed to get authentication token'))
              }
            }
          }
        } catch (e) {
          // Cross-domain error, ignore
          // This happens when the popup window navigates to another domain
        }
      }

      // Check popup window status every 500ms
      checkIntervalRef.current = window.setInterval(checkPopup, 500)

      // Add message event listener to receive messages from popup window
      const handleMessage = (event: MessageEvent) => {
        // Verify message origin
        if (event.origin !== window.location.origin) {
          return
        }

        if (event.data && event.data.type === 'google-login') {
          if (event.data.token) {
            // Process token
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

      // Cleanup function
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
      setError(error.message || 'Unable to open login window')
      setLoading(false)

      if (onFailure) {
        onFailure(error)
      }
    }
  }

  // Process the received token
  const handleToken = async (token: string) => {
    try {
      console.log('Token received, calling backend API...')
      console.log('Token length:', token.length)

      // Call backend API to validate token
      const response = await authApi.googleLogin(token)

      console.log('Backend response received')

      if (response && response.access_token) {
        // Login successful
        console.log('Authentication successful')

        // Update authentication context
        const authModel: AuthModel = {
          access_token: response.access_token,
          api_token: response.access_token
        }
        console.log('Updating authentication context...')
        saveAuth(authModel)
        console.log('Authentication context updated')

        // Try to store token in local storage
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('access_token', response.access_token)
            console.log('Token saved to localStorage')
          }
        } catch (storageError) {
          console.error('Failed to store token in localStorage:', storageError)
          // Continue execution, don't interrupt login flow
        }

        if (onSuccess) {
          console.log('Calling onSuccess callback...')
          onSuccess(response)
        } else {
          console.log('Preparing to navigate to path:', from)
          navigate(from, { replace: true })
          console.log('Navigation triggered')
        }
      } else {
        throw new Error('Authentication failed, no valid access token received')
      }
    } catch (error: any) {
      console.error('Google login API error:', error)

      let errorMessage = 'Authentication failed, please try again later'

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = `Authentication failed: ${error.response.data.message}`
        } else {
          errorMessage = `Authentication failed (${error.response.status}): Server returned an error`
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

  // Clean up popup window and timer
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

// Add google type to window object
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
