import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'sSpace',
  description: `sSpace | See what your friend's are up to`
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='flex flex-col items-center content-center justify-center w-full text-sm flex-grow'>
      {children}
    </main>
  )
}
