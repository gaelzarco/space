import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'sSpace',
  description: `sSpace | Chat`
}

export default function Layout({ children }: { children: ReactNode }) {
  return <main className=' w-full h-full items-center'>{children}</main>
}
