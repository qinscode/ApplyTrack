import useBodyClasses from '@/hooks/useBodyClasses.ts'
import { Main, MainLayoutProvider } from './index.ts'

const MainLayout = () => {
  // Using the custom hook to set multiple CSS variables and class properties
  useBodyClasses(`
    [--tw-page-bg:#F6F6F9]
    [--tw-page-bg-dark:var(--tw-coal-200)]
    [--tw-content-bg:var(--tw-light)]
    [--tw-content-bg-dark:var(--tw-coal-500)]
    [--tw-content-scrollbar-color:#e8e8e8]
    [--tw-header-height:60px]
    [--tw-sidebar-width:270px]
    bg-[--tw-page-bg]
    dark:bg-[--tw-page-bg-dark]
    lg:overflow-hidden
  `)

  return (
    // Providing layout context and rendering the main content
    <MainLayoutProvider>
      <Main />
    </MainLayoutProvider>
  )
}

export { MainLayout }
