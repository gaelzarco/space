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
    <main className='layout-1800 border-l border-r border-neutral-200 dark:border-neutral-800'>
      <div className='flex flex-col w-full h-screen max-h-screen cursor-default'>
        <div className='flex flex-col h-full max-h-screen w-full'>
          <div className='fixed flex flex-col self-end'>
            <DashNavBar />
          </div>

          <div className='flex flex-row h-full max-h-full w-full'>
            <div className='h-full min-w-1/4'>
              <DashSideBar />
            </div>
            <div className='h-full w-full'>{children}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
