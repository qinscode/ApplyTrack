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
        console.log('GoogleCallback: Processing callback...')
        console.log('Current URL:', window.location.href)

        // Try to get token from URL
        let token: string | null = null

        // First try to get token from URL hash
        if (location.hash) {
          console.log('Looking for token in hash')
          const hashParams = new URLSearchParams(location.hash.substring(1))
          const idToken = hashParams.get('id_token')
          const accessToken = hashParams.get('access_token')
          const simpleToken = hashParams.get('token')
          token = idToken || accessToken || simpleToken

          if (token) {
            console.log('Token found in hash, length:', token.length)
          }
        }

        // If token not found in hash, try to get from URL parameters
        if (!token) {
          console.log('Looking for token in URL parameters')
          const params = new URLSearchParams(location.search)
          const urlToken = params.get('token')
          const code = params.get('code')
          const credential = params.get('credential')
          token = urlToken || code || credential

          if (token) {
            console.log('Token found in URL parameters, length:', token.length)
          }
        }

        // Check if token was found
        if (!token) {
          console.error('No token found')
          throw new Error('Failed to get authentication token')
        }

        console.log('Calling backend API to validate token...')

        // Call backend API to validate token
        const response = await authApi.googleLogin(token)

        console.log('Backend response:', response)

        if (response && response.access_token) {
          console.log('Authentication successful, preparing to navigate or send message')

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

          // Check if in popup window
          if (window.opener && window.opener !== window) {
            // In popup window, send message to parent window
            console.log('In popup window, sending success message to parent window')
            try {
              window.opener.postMessage(
                {
                  type: 'google-login',
                  token: token,
                  response: response
                },
                window.location.origin
              )
              console.log('Message sent to parent window')
            } catch (messageError) {
              console.error('Failed to send message to parent window:', messageError)
            }

            // Close popup window
            console.log('Preparing to close popup window')
            window.close()
          } else {
            // Not in popup window, navigate normally
            console.log('Not in popup window, preparing to navigate to home page')
            navigate('/', { replace: true })
            console.log('Navigation triggered')
          }
        } else {
          throw new Error('Authentication failed, no valid access token received')
        }
      } catch (error: any) {
        console.error('Google callback processing error:', error)

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

        // If in popup window, send error message to parent window
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
          <p className="text-lg">Processing Google login...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="max-w-md">
          <div>
            <h4 className="font-medium mb-1">Login Failed</h4>
            <p>{error}</p>
          </div>
        </Alert>
      ) : (
        <p className="text-lg">Login successful, redirecting...</p>
      )}
    </div>
  )
}
