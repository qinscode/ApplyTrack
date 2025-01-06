import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet, useLocation } from 'react-router'
import { useMenuCurrentItem } from '@/components/menu'
import { Footer, Header, Sidebar, Toolbar, ToolbarHeading } from '../index.ts'
import { useMenus } from '@/providers'
import { useResponsive } from '@/hooks'

const Main = () => {
  const mobileMode = useResponsive('down', 'lg')
  const { pathname } = useLocation()
  const { getMenuConfig } = useMenus()
  const menuConfig = getMenuConfig('primary')
  const menuItem = useMenuCurrentItem(pathname, menuConfig)

  return (
    <Fragment>
      <Helmet>
        <title>{menuItem?.title}</title>
      </Helmet>

      <div className="flex grow">
        <Sidebar />
        {mobileMode && <Header />}

        <div className="flex flex-col lg:flex-row grow pt-[--tw-header-height] lg:pt-0">
          <div className="flex flex-col grow items-stretch rounded-xl bg-[--tw-content-bg] dark:bg-[--tw-content-bg-dark] border border-gray-300 dark:border-gray-200 lg:ms-[--tw-sidebar-width] mt-0 lg:mt-[15px] m-[15px]">
            <div className="flex flex-col grow lg:scrollable-y-auto lg:[scrollbar-width:auto] lg:light:[--tw-scrollbar-thumb-color:var(--tw-content-scrollbar-color)] pt-5">
              <main className="grow" role="content">
                <Toolbar>
                  <ToolbarHeading />

                  {/*<ToolbarActions>*/}
                  {/*  <Link to={'/account/home/get-started'} className="btn btn-sm btn-light">*/}
                  {/*    <KeenIcon icon="exit-down !text-base" />*/}
                  {/*    Export*/}
                  {/*  </Link>*/}
                  {/*  <ToolbarMenu />*/}
                  {/*</ToolbarActions>*/}
                </Toolbar>
                <Outlet />
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export { Main }
