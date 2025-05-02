import { ReactElement, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useAuthContext } from '@/auth'
import { useLoaders } from '@/providers'
import { AppRoutingSetup } from '.'

const AppRouting = (): ReactElement => {
  const { setProgressBarLoader } = useLoaders()
  const { verify, setLoading } = useAuthContext()
  const [previousLocation, setPreviousLocation] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)
  const location = useLocation()
  const path = location.pathname.trim()

  useEffect(() => {
    if (firstLoad) {
      verify().finally(() => {
        setLoading(false)
        setFirstLoad(false)
      })
    }
  })

  useEffect(() => {
    if (!firstLoad) {
      setProgressBarLoader(true)
      try {
        verify()
          .catch((error) => {
            console.error('User verification failed:', error)
            // 不抛出错误，而是记录它，这样不会中断应用流程
          })
          .finally(() => {
            setPreviousLocation(path)
            setProgressBarLoader(false)
            if (path === previousLocation) {
              setPreviousLocation('')
            }
          })
      } catch (error) {
        console.error('Error during verification process:', error)
        setProgressBarLoader(false)
      }
    }
  }, [location])

  useEffect(() => {
    if (!CSS.escape(window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [previousLocation])

  return <AppRoutingSetup />
}

export { AppRouting }
