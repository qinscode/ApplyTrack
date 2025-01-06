export const styles = [
  {
    name: 'default',
    label: 'Default'
  },
  {
    name: 'new-york',
    label: 'new York'
  }
] as const

export type Style = (typeof styles)[number]
