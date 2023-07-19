'use client'

import type { FC, ComponentProps } from 'react'
import { useTheme } from 'next-themes'
import { Ping } from '@uiball/loaders'

interface ThemedPingProps extends ComponentProps<typeof Ping> {}

const ThemedPing: FC<ThemedPingProps> = ({ ...props }) => {
  const { theme } = useTheme()

  return theme === 'light' ? (
    <Ping color="black" {...props} />
  ) : (
    <Ping color="white" {...props} />
  )
}

export default ThemedPing
