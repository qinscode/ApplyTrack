import React, { forwardRef, useRef } from 'react'
import { toAbsoluteUrl } from '@/utils'
import { useAuthContext } from '@/auth'
import { KeenIcon, Menu, MenuIcon, MenuItem, MenuToggle } from '@/components'
import { DropdownUser } from '@/partials/dropdowns/user'
import { useLanguage } from '@/i18n'
import { useCurrentUser } from '@/hooks'

const SidebarFooter = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { logout } = useAuthContext()
  const itemNotificationsRef = useRef<any>(null)
  const itemUserRef = useRef<any>(null)
  const { isRTL } = useLanguage()
  const { user, loading } = useCurrentUser()
  const getUserInitial = () => {
    if (loading || !user?.username) {
      return '?'
    }
    return user.username.charAt(0).toUpperCase()
  }

  return (
    <div ref={ref} className="flex flex-center justify-between shrink-0 ps-4 pe-3.5 mb-3.5">
      <Menu data-menu="true">
        <MenuItem
          ref={itemUserRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: isRTL() ? 'right-start' : 'right-end',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: isRTL() ? [10, 15] : [-10, 15] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuToggle className="btn btn-icon rounded-full">
            <div className="size-9 rounded-full border-2 border-success flex items-center justify-center bg-primary text-white font-bold">
              {getUserInitial()}
            </div>
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>

      <div className="flex items-center gap-1.5">
        <Menu>
          <MenuItem
            ref={itemNotificationsRef}
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'right-start' : 'right-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [10, 15]
                  }
                }
              ]
            }}
          ></MenuItem>

          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'right-start' : 'right-end',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [10, 15]
                  }
                }
              ]
            }}
          ></MenuItem>
        </Menu>

        <div
          onClick={logout}
          className="btn btn-icon btn-icon-lg size-8 hover:bg-light hover:text-primary text-gray-600"
        >
          <KeenIcon icon="exit-right" />
        </div>
      </div>
    </div>
  )
})

export { SidebarFooter }
