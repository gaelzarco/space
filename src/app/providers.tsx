'use client'

import { type FC, type ReactNode, useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'

type ProvidersProps = {
  children?: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

export default Providers
