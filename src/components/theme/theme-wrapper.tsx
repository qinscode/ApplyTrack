import { useConfig } from '@/hooks/use-config'
import { cn } from '@/lib/utils'
import React from 'react'

type ThemeWrapperProps = {
  defaultTheme?: string
} & React.ComponentProps<'div'>

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const [config] = useConfig()

  return (
    <div
      className={cn(`theme-${defaultTheme || config.theme}`, 'w-full', className)}
      style={
        {
          '--radius': `${defaultTheme ? 0.5 : config.radius}rem`,
          '--card-radius': `calc(var(--radius) * 1.5)`
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
