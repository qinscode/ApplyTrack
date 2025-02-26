import { useEffect, useRef, useState } from 'react'
import { useResponsive, useViewport } from '@/hooks'
import { useLayoutContext } from '../index.ts'
import { SidebarFooter, SidebarHeader, SidebarMenu } from './index.ts'
import { getHeight } from '@/utils'
import { usePathname } from '@/providers'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet.tsx'

const Sidebar = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const desktopMode = useResponsive('up', 'lg')
  const { pathname, prevPathname } = usePathname()
  const [viewportHeight] = useViewport()
  const { mobileSidebarOpen, setMobileSidebarOpen } = useLayoutContext()
  const [scrollableHeight, setScrollableHeight] = useState<number>(0)
  const scrollableOffset = 50

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false)
  }

  const renderContent = () => {
    return (
      <div className="fixed top-0 bottom-0 z-20 lg:flex flex-col shrink-0 w-[--tw-sidebar-width] bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark]">
        <SidebarHeader ref={headerRef} />
        <SidebarMenu height={scrollableHeight} />
        <SidebarFooter ref={footerRef} />
      </div>
    )
  }

  useEffect(() => {
    if (headerRef.current && footerRef.current) {
      const headerHeight = getHeight(headerRef.current)
      const footerHeight = getHeight(footerRef.current)
      const availableHeight = viewportHeight - headerHeight - footerHeight - scrollableOffset
      setScrollableHeight(availableHeight)
    } else {
      setScrollableHeight(viewportHeight)
    }
  }, [viewportHeight])

  useEffect(() => {
    if (!desktopMode && prevPathname !== pathname) {
      handleMobileSidebarClose()
    }
  }, [desktopMode, pathname, prevPathname])

  if (desktopMode) {
    return renderContent()
  } else {
    return (
      <Sheet open={mobileSidebarOpen} onOpenChange={handleMobileSidebarClose}>
        <SheetContent
          className="border-0 p-0 w-[--tw-sidebar-width] scrollable-y-auto"
          forceMount={true}
          side="left"
          close={false}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Mobile Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          {renderContent()}
        </SheetContent>
      </Sheet>
    )
  }
}

export { Sidebar }
