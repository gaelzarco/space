import { type FC, type HTMLAttributes } from 'react'
import { type Session, getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import { fetchRedis } from '@/helpers/fetchredis'
import { getIncomingFriendRequests } from '@/helpers/getIncomingFriendRequests'
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
import AddFriendsDialog from '@/components/addfriendsdialog'
import LogoutOption from '@/components/logoutoption'
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
        'inline-flex max-xl:w-full xl:w-max xl:min-h-[80px] items-center text-black dark:text-white max-xl:px-2 xl:px-5',
        className
      )}
      {...props}
    >
      {!!session && (
        <div className='max-xl:flex max-xl:flex-row-reverse xl:inline-flex max-xl:w-full items-center max-xl:justify-between justify-self-end'>
          <FriendRequests
            incomingFriendRequests={incomingFriendRequests}
            sessionId={session.user.id}
          />

          <AddFriendsDialog />

          <div className='max-xl:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger className='inline-flex min-w-[142px] items-center justify-center rounded-full dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 h-8 py-5 px-6 m-2 transition-all duration-200 ease-in-out'>
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
        </div>
      )}
    </nav>
  )
}

export default DashNavBar
