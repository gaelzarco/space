import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import Button from '@/components/ui/button'
import ThemeSwitcher from '@/components/themeswitch'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const LandingNavBar: FC<NavBarProps> = async ({
  children,
  className,
  onClick,
  ...props
}) => {
  const session: Session | null = await getServerSession(authOptions)

  return (
    <nav
      className={cn(
        'inline-flex min-w-full h-[80px] items-center justify-between content-center border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white px-5',
        className
      )}
      {...props}
    >
      <Link
        href='/'
        className='min-w-[120px] font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 transition-all ease-in-out duration-200'
      >
        SSpace
      </Link>

      <div className='inline-flex min-w-[120px] items-center content-center justify-center'>
        <ThemeSwitcher />
      </div>

      <div className='min-w-[120px] justify-self-end'>
        {!session ? (
          <Link href='/login'>
            <Button className='m-0'>Login</Button>
          </Link>
        ) : (
          <Link href='/dashboard'>
            <Button className='m-0'>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default LandingNavBar
