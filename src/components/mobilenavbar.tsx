import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import ThemeSwitch from '@/components/themeswitch'
import UserOptions from './useroptions'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const MobileNavBar: FC<NavBarProps> = async ({
  children,
  className,
  ...props
}) => {
  const session: Session | null = await getServerSession(authOptions)

  return (
    <nav
      className={cn(
        'md:hidden bottom-0 fixed inline-flex min-w-full h-[80px] items-center justify-between content-center border-t border-neutral-200 dark:border-neutral-800 text-black dark:text-white px-5',
        className
      )}
      {...props}
    >
      <ThemeSwitch />

      <div className='w-full flex justify-self-end justify-end'>
        {!!session && <UserOptions session={session} />}
      </div>
    </nav>
  )
}

export default MobileNavBar
