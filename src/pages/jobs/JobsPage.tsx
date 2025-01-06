import { useParams } from 'react-router-dom'
import { JobsPageLayout } from './components/JobsPageLayout'

const JOBS_CONFIG = {
  all: {
    apiEndpoint: '/Jobs/search',
    hideStatus: true
  },
  my: {
    apiEndpoint: '/UserJobs/my',
    hideStatus: false
  },
  applied: {
    apiEndpoint: '/UserJobs/status/applied',
    hideStatus: false
  },
  new: {
    apiEndpoint: '/Jobs/new',
    hideStatus: false
  }
} as const

type JobsType = keyof typeof JOBS_CONFIG

const JobsPage = () => {
  const { type = 'all' } = useParams<{ type: JobsType }>()
  const config = JOBS_CONFIG[type as JobsType] || JOBS_CONFIG.all

  return <JobsPageLayout {...config} />
}

export { JobsPage }
