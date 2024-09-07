import { useAtom } from "jotai"
import { Menu } from "lucide-react"
import { useRef } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"
import { Outlet } from "react-router-dom"

import { isCollapsedAtom, layoutAtom } from "@/atoms/resizable-panels"
import LanguageSwitch from "@/components/language-switch"
import { Search } from "@/components/layout/search"
import { Sidebar } from "@/components/layout/sidebar"
import { MobileNav } from "@/components/layout/sidebar/mobile-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { DEFAULT_LAYOUT, NAV_COLLAPSED_SIZE } from "@/constants"
import { cn } from "@/lib/utils"

export function Component() {
  const [layout, setLayout] = useAtom(layoutAtom)
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)
  const defaultLayout = layout ? JSON.parse(layout) : DEFAULT_LAYOUT
  const ref = useRef<ImperativePanelHandle>(null)
  const handleNavCollapse = () => {
    setIsCollapsed((pre) => !pre)
    const panel = ref.current
    if (panel) {
      panel?.isCollapsed() ? panel?.expand() : panel?.collapse()
    }
  }
  return (
    <div className="h-screen overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          setLayout(JSON.stringify(sizes))
        }}
        className="h-full items-stretch transition-all duration-300"
      >
        <ResizablePanel
          ref={ref}
          defaultSize={defaultLayout[0]}
          collapsedSize={NAV_COLLAPSED_SIZE}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
          }}
          onResize={() => {
            setIsCollapsed(false)
          }}
          className={cn(
            "hidden !max-w-[330px] lg:block",
            isCollapsed &&
            "min-w-[50px] transition-all duration-300",
          )}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30} className="transition-all duration-300">
          <div className="flex h-full flex-col overflow-auto">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleNavCollapse}
                  className="hidden lg:flex"
                >
                  <Menu />
                </Button>
                <MobileNav />
                <div className="ml-auto flex items-center space-x-4">
                  <Search />
                  <LanguageSwitch />
                  <ThemeSwitcher />
                  <UserNav />
                </div>
              </div>
            </div>
            <div className="h-full flex-1 overflow-y-auto p-8 pt-6">
              <Outlet />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
