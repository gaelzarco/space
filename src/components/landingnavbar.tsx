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
        'inline-flex min-w-full h-[80px] items-center justify-between border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white',
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="min-w-[100px] font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 p-2 m-2 ml-6 transition-all ease-in-out duration-200"
      >
        SSpace
      </Link>

      <div className="inline-flex items-center justify-self-center">
        <ThemeSwitcher />
      </div>

      {!session ? (
        <Link href="/login" className="justify-self-end">
          <Button className="m-0">Login</Button>
        </Link>
      ) : (
        <Link href="/dashboard" className="justify-self-end">
          <Button className="m-0">Dashboard</Button>
        </Link>
      )}
    </nav>
  )
}

export default LandingNavBar
