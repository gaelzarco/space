import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdownmenu'
import ThemeSwitcher from '@/components/themeswitch'
import LogoutOption from '@/components/logoutoption'

import { CaretDownIcon } from '@radix-ui/react-icons'
import Button from '@/components/ui/button'

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
        'inline-flex min-w-full h-[80px] items-center justify-between border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white',
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="min-w-[100px] p-2 m-2 font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 ml-6 transition-all ease-in-out duration-200"
      >
        SSpace
      </Link>

      {!!session && (
        <div className="inline-flex items-center content-center justify-self-end">
          <ThemeSwitcher />

          <Link href="/dashboard/friends">
            <Button className="text-sm m-0">Friends</Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 py-2 px-2 ml-6 transition-all ease-in-out duration-200">
              <div className="inline-flex items-center content-center justify-center">
                <CaretDownIcon className="w-4 h-4 mr-2" />

                <div className="flex flex-col h-full mr-2">
                  <p className="font-semibold">{session.user.name}</p>
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
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogoutOption />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </nav>
  )
}

export default DashNavBar
