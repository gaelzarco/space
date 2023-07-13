import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import DashNavBar from '@/components/dashnavbar'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'SSpace dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <DashNavBar />
      {children}
    </div>
  )
}
