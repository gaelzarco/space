import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import DashNavBar from '@/components/dashnavbar'
import Link from 'next/link'
import Button from '@/components/ui/button'
import ThemedPing from '@/components/ui/themedping'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'SSpace dashboard',
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const session: Session | null = await getServerSession(authOptions)

  if (!session)
    return (
      <div className="min-h-screen min-w-7xl max-w-7xl mx-auto flex flex-col content-center justify-center items-center">
        <p className="font-bold text-2xl">Login to view your dashboard</p>
        <div>
          <Link href="/login">
            <Button className="my-10">Login</Button>
          </Link>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen min-w-7xl max-w-7xl mx-auto">
      <DashNavBar />
      {children}
    </div>
  )
}
