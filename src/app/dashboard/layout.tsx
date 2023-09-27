import type { ReactNode } from 'react'
import type { Metadata } from 'next'

import DashNavBar from '@/components/dashnavbar'
import DashSideBar from '@/components/dashsidebar'
import MobileNavBar from '@/components/mobilenavbar'

export const metadata: Metadata = {
  title: 'sSpace',
  description: `sSpace | Dashboard`
}

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='layout-1800'>
      <div className='max-md:hidden fixed flex flex-col self-end z-20'>
        <DashNavBar />
      </div>

      <div className='flex flex-row h-full max-h-screen w-full'>
        <div className='max-md:hidden h-screen min-w-1/4'>
          <DashSideBar />
        </div>

        <div className='h-screen w-full'>{children}</div>

        <div className='lg:hidden fixed bottom-0 h-full'>
          <MobileNavBar />
        </div>
      </div>
    </main>
  )
}
