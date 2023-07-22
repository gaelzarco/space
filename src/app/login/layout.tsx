import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'sSpace Login',
  description: `Create an account or login to sSpace`
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className='layout-1800'>{children}</div>
}
