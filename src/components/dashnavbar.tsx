import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import ThemeSwitcher from '@/components/themeswitch'
import SignOutButton from '@/components/signoutbutton'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const DashNavBar: FC<NavBarProps> = async ({
  children,
  className,
  onClick,
  ...props
}) => {
  const session: Session | null = await getServerSession(authOptions)

  return (
    <nav
      className={cn(
        'inline-flex min-w-full h-[80px] items-center justify-between border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white p-4',
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="min-w-[100px] py-2 px-6 m-2 font-bold justify-self-start"
      >
        SSpace
      </Link>

      <div className="inline-flex items-center justify-self-center">
        <ThemeSwitcher />
      </div>

      {!!session && (
        <>
          <div className="inline-flex items-center">
            <div className="flex flex-col h-full mr-2">
              <p className="font-semibold dark:text-white">
                {session.user.name}
              </p>
            </div>

            <div>
              <Image
                className="rounded-full"
                src={session.user.image as string}
                width={30}
                height={30}
                alt="Profile"
              />
            </div>

            <SignOutButton className="bg-opacity-0 dark:bg-opacity-0 text-neutral-200 dark:text-neutral-300 min-w-[25px]" />
          </div>
        </>
      )}
    </nav>
  )
}

export default DashNavBar
