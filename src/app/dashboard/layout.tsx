import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import DashNavBar from '@/components/dashnavbar'
import DashSideBar from '@/components/dashsidebar'

export const metadata: Metadata = {
  title: 'sSpace',
  description: `sSpace | Dashboard`
}

export default async function Layout({ children }: { children: ReactNode }) {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  return (
    <main className='layout-1800'>
      <DashNavBar />
      <div className='flex flex-row w-full flex-grow cursor-default'>
        <DashSideBar />
        {children}
      </div>
    </main>
  )
}
