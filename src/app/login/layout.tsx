import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'SSpace dashboard'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className='h-full w-full mx-auto'>{children}</div>
}
