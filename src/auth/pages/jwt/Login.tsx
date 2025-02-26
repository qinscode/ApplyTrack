import { type MouseEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Alert, KeenIcon } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import { useAuthContext } from '@/auth'
import { useLayout } from '@/providers'
import { GoogleLogin } from '@/auth/components'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  remember: Yup.boolean()
})

const initialValues = {
  email: 'user@example.com',
  password: 'test',
  remember: false
}

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setLoginError(null)

      try {
        if (!login) {
          throw new Error('JWTProvider is required for this form.')
        }

        const auth = await login(values.email, values.password)

        if (values.remember) {
          localStorage.setItem('email', values.email)
        } else {
          localStorage.removeItem('email')
        }

        navigate(from, { replace: true })
      } catch (error: any) {
        console.error('Login error:', error)
        if (error.response && error.response.data) {
          setStatus(error.response.data.message || 'Login failed, please check your credentials')
        } else {
          setStatus('Login failed, please try again later')
        }
        setSubmitting(false)
      }
      setLoading(false)
    }
  })

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google login successful, preparing to navigate to:', from)
    setTimeout(() => {
      navigate(from, { replace: true })
      console.log('Navigation triggered')
    }, 100)
  }

  const handleGoogleLoginFailure = (error: any) => {
    console.error('Google login failed:', error)

    let errorMessage = 'Google login failed, please try again later'

    // Try to extract more detailed error information
    if (error && error.message) {
      if (error.message.includes('localStorage')) {
        errorMessage =
          'Google login failed: Browser storage issue, please ensure cookies and local storage are not disabled'
      } else {
        errorMessage = `Google login failed: ${error.message}`
      }
    }

    setLoginError(errorMessage)
  }

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <div className="card max-w-[390px] w-full">
      <form
        className="card-body flex flex-col gap-5 p-10"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <div className="text-center mb-2.5">
          <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">Sign in</h3>
          <div className="flex items-center justify-center font-medium">
            <span className="text-2sm text-gray-600 me-1.5">Need an account?</span>
            <Link to="/auth/signup" className="text-2sm link">
              Sign up
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} />

          <a href="#" className="btn btn-light btn-sm justify-center">
            <img
              alt=""
              src={toAbsoluteUrl('/media/brand-logos/github.svg')}
              className="size-3.5 shrink-0 dark:hidden"
            />
            <img
              alt=""
              src={toAbsoluteUrl('/media/brand-logos/github-white.svg')}
              className="size-3.5 shrink-0 light:hidden"
            />
            Use GitHub
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="border-t border-gray-200 w-full"></span>
          <span className="text-2xs text-gray-500 font-medium uppercase">Or</span>
          <span className="border-t border-gray-200 w-full"></span>
        </div>

        <Alert variant="primary">
          Use <span className="font-semibold text-gray-900">user@example.com</span> username and{' '}
          <span className="font-semibold text-gray-900">test</span> password.
        </Alert>

        {formik.status && <Alert variant="danger">{formik.status}</Alert>}
        {loginError && <Alert variant="danger">{loginError}</Alert>}

        <div className="flex flex-col gap-1">
          <label className="form-label text-gray-900">Email</label>
          <label className="input">
            <input
              placeholder="Enter username"
              autoComplete="off"
              {...formik.getFieldProps('email')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.email && formik.errors.email
              })}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <label className="form-label text-gray-900">Password</label>
            <Link to="/auth/reset-password" className="text-2sm link shrink-0">
              Forgot Password?
            </Link>
          </div>
          <label className="input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              autoComplete="off"
              {...formik.getFieldProps('password')}
              className={clsx('form-control', {
                'is-invalid': formik.touched.password && formik.errors.password
              })}
            />
            <button className="btn btn-icon" onClick={togglePassword}>
              <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
              <KeenIcon
                icon="eye-slash"
                className={clsx('text-gray-500', { hidden: !showPassword })}
              />
            </button>
          </label>
          {formik.touched.password && formik.errors.password && (
            <span role="alert" className="text-danger text-xs mt-1">
              {formik.errors.password}
            </span>
          )}
        </div>

        <label className="checkbox-group">
          <input
            className="checkbox checkbox-sm"
            type="checkbox"
            {...formik.getFieldProps('remember')}
          />
          <span className="checkbox-label">Remember me</span>
        </label>

        <button
          type="submit"
          className="btn btn-primary flex justify-center grow"
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Please wait...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export { Login }
