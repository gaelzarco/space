import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'

import Providers from '@/app/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sSpace',
  description: 'The real-time chat app built for developers'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex flex-col min-h-screen w-full bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white transition-all duration-200 ease-in-out`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
