import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import Link from 'next/link'
import Button from '@/components/ui/button'
import DashNavBar from '@/components/dashnavbar'
import DashSideBar from '@/components/dashsidebar'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'SSpace dashboard'
}

export default async function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session)
    return (
      <div className='flex flex-col w-full mx-auto content-center justify-center items-center flex-grow'>
        <p className='font-bold text-2xl'>Login to view your dashboard</p>
        <div>
          <Link href='/login'>
            <Button className='my-10'>Login</Button>
          </Link>
        </div>
      </div>
    )

  return (
    <main className='flex flex-col w-full mx-auto flex-grow'>
      <DashNavBar />
      <div className='flex flex-row w-full cursor-default flex-grow'>
        <DashSideBar />
        {children}
      </div>
    </main>
  )
}
