import { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { DefaultPage } from '@/pages/dashboards'
import { AuthPage } from '@/auth'
import { RequireAuth } from '@/auth/RequireAuth'
import { MainLayout } from '@/layouts'
import { ErrorsRouting } from '@/errors'
import { JobsPage } from '@/pages/jobs/JobsPage'
import Details from '@/pages/jobs/JobDetails.tsx'
import { ResumePage } from '@/pages/resume'
import { InterviewChecklistPage } from '@/pages/interview'

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DefaultPage />} />
          <Route path="/jobs/:type" element={<JobsPage />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/interview-checklist" element={<InterviewChecklistPage />} />
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  )
}

export { AppRoutingSetup }
