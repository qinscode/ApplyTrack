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
  interviewing: {
    apiEndpoint: '/UserJobs/status/interviewing',
    hideStatus: false
  },
  archived: {
    apiEndpoint: '/UserJobs/status/archived',
    hideStatus: false
  },
  assessment: {
    apiEndpoint: '/UserJobs/status/technicalassessment',
    hideStatus: false
  },
  offered: {
    apiEndpoint: '/UserJobs/status/offered',
    hideStatus: false
  },
  rejected: {
    apiEndpoint: '/UserJobs/status/rejected',
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
