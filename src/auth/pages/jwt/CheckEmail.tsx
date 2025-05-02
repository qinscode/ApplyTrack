import { Link, useLocation } from 'react-router-dom'

import { toAbsoluteUrl } from '@/utils'

const CheckEmail = () => {
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email') || 'your email'

  return (
    <div className="card max-w-[440px] w-full">
      <div className="card-body p-10">
        <div className="flex justify-center py-10">
          <img
            src={toAbsoluteUrl('/media/illustrations/30.svg')}
            className="dark:hidden max-h-[130px]"
            alt=""
          />
          <img
            src={toAbsoluteUrl('/media/illustrations/30-dark.svg')}
            className="light:hidden max-h-[130px]"
            alt=""
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 text-center mb-3">Check your email</h3>
        <div className="text-2sm text-center text-gray-700 mb-7.5">
          Please click the link sent to your email&nbsp;
          <span className="text-2sm text-gray-900 font-medium">{email}</span>
          <br />
          to verify your account. Thank you
        </div>

        <div className="flex justify-center mb-5">
          <Link to="/" className="btn btn-primary flex justify-center">
            Back to Home
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1">
          <span className="text-xs text-gray-700">Didn't receive an email?</span>
          <Link to="/auth/login" className="text-xs font-medium link">
            Resend
          </Link>
        </div>
      </div>
    </div>
  )
}

export { CheckEmail }
