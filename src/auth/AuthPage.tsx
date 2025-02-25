import { Navigate, Route, Routes } from 'react-router'
import {
  Login,
  ResetPassword,
  ResetPasswordChange,
  ResetPasswordChanged,
  ResetPasswordCheckEmail,
  ResetPasswordEnterEmail,
  Signup,
  TwoFactorAuth,
  GoogleCallback
} from './pages/jwt'
import { AuthLayout } from '@/layouts/auth'
import { CheckEmail } from '@/auth/pages/jwt'
import { RequireNoAuth } from './RequireNoAuth'

const AuthPage = () => (
  <Routes>
    {/*<Route element={<AuthBrandedLayout />}>*/}
    {/*  /!*<Route index element={<Login />} />*!/*/}
    {/*  /!*<Route path="/login" element={<Login />} />*!/*/}
    {/*  /!*<Route path="/signup" element={<Signup />} />*!/*/}
    {/*  <Route path="/2fa" element={<TwoFactorAuth />} />*/}
    {/*  <Route path="/check-email" element={<CheckEmail />} />*/}
    {/*  <Route path="/reset-password" element={<ResetPassword />} />*/}
    {/*  <Route path="/reset-password/enter-email" element={<ResetPasswordEnterEmail />} />*/}
    {/*  <Route path="/reset-password/check-email" element={<ResetPasswordCheckEmail />} />*/}
    {/*  <Route path="/reset-password/change" element={<ResetPasswordChange />} />*/}
    {/*  <Route path="/reset-password/changed" element={<ResetPasswordChanged />} />*/}
    {/*  <Route path="*" element={<Navigate to="/error/404" />} />*/}
    {/*</Route>*/}

    <Route element={<AuthLayout />}>
      {/* Protect login and registration pages with RequireNoAuth */}
      <Route element={<RequireNoAuth />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Other authentication related pages that don't need protection */}
      <Route path="/2fa" element={<TwoFactorAuth />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/google-callback" element={<GoogleCallback />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/enter-email" element={<ResetPasswordEnterEmail />} />
      <Route path="/reset-password/check-email" element={<ResetPasswordCheckEmail />} />
      <Route path="/reset-password/change" element={<ResetPasswordChange />} />
      <Route path="/reset-password/changed" element={<ResetPasswordChanged />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>
)

export { AuthPage }
