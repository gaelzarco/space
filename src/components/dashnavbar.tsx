import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { fetchRedis } from '@/helpers/fetchredis'
import { getIncomingFriendRequests } from '@/helpers/getIncomingFriendRequests'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdownmenu'
import ThemeSwitcher from '@/components/themeswitch'
import LogoutOption from '@/components/logoutoption'
import NavBarLogo from './navbarlogo'
import FriendRequests from './friendrequests'

import { CaretDownIcon } from '@radix-ui/react-icons'

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const DashNavBar: FC<NavBarProps> = async ({
  children,
  className,
  onClick,
  ...props
}) => {
  const session: Session | null = await getServerSession(authOptions)
  if (!session) return notFound()

  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

  const incomingFriendRequests = await getIncomingFriendRequests(
    incomingSenderIds
  )

  return (
    <nav
      className={cn(
        'inline-flex w-full min-h-[80px] items-center justify-between border-b border-neutral-200 dark:border-neutral-800 text-black dark:text-white px-5',
        className
      )}
      {...props}
    >
      <Link
        href='/'
        className='min-w-[100px] font-bold justify-self-start hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 transition-all ease-in-out duration-200'
      >
        <NavBarLogo />
      </Link>

      {!!session && (
        <div className='inline-flex items-center content-center justify-self-end'>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />

          <ThemeSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger className='inline-flex min-w-[142px] items-center justify-center rounded-full hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 h-8 py-5 px-6 m-2 transition-all duration-200 ease-in-out'>
              <div className='inline-flex items-center content-center justify-center'>
                <CaretDownIcon className='w-4 h-4 mr-2' />

                <div className='flex flex-col h-full mr-2'>
                  <p className='font-semibold'>{session.user.name}</p>
                </div>

                <div>
                  <Image
                    className='rounded-full'
                    src={session.user.image as string}
                    width={30}
                    height={30}
                    alt='Profile'
                  />
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='box-content'>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
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
