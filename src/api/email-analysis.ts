import type { EmailAnalysisResult, Job } from '@/types/schema'
import api from './axios'

interface EmailAnalysisResponse {
  emails: EmailAnalysisResult[]
  totalCount: number
}

export const emailAnalysisApi = {
  getAnalysis: async (pageNumber: number, pageSize: number): Promise<EmailAnalysisResponse> => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await api.get<EmailAnalysisResponse>(`/emailanalysis`, {
        params: {
          pageNumber,
          pageSize
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching email analysis:', error)
      throw error
    }
  },

  analyzeEmails: async (): Promise<void> => {
    try {
      const token = localStorage.getItem('access_token')
      await api.post(
        '/emailconfig/scan-incremental',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (error) {
      console.error('Error analyzing emails:', error)
      throw error
    }
  },

  updateStatus: async (jobId: number, newStatus: Job['status']): Promise<void> => {
    try {
      const token = localStorage.getItem('access_token')
      await api.put(
        `/emailanalysis/${jobId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  search: async (searchTerm: string): Promise<EmailAnalysisResponse> => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await api.get<EmailAnalysisResponse>(`/emailanalysis/search`, {
        params: {
          searchTerm: encodeURIComponent(searchTerm)
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error searching emails:', error)
      throw error
    }
  }
}
