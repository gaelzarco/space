import { type FC, type HTMLAttributes } from 'react'
import { Session, getServerSession } from 'next-auth'
import { GET } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import Button from '@/components/ui/button'
import ThemeSwitcher from '@/components/themeswitch'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const DashNavBar: FC<NavBarProps> = async ({
  children,
  className,
  onClick,
  ...props
}) => {
  const session: Session | null = await getServerSession(GET)

  return (
    <nav
      className={cn(
        'inline-flex min-w-full h-[80px] items-center justify-between border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white p-4 mx-2',
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
        <Button className="inline-flex items-center min-w-[100px] justify-self-end">
          <div className="flex flex-col w-full h-full">
            <p className="font-semibold dark:text-white">{session.user.name}</p>
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
        </Button>
      )}
    </nav>
  )
}

export default DashNavBar
