import { type FC } from 'react'
import { type Session } from 'next-auth'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdownmenu'
import LogoutOption from '@/components/logoutoption'

import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'

const UserOptions: FC<{ session: Session }> = async ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='inline-flex items-center justify-center rounded-full dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 h-8 py-5 px-6 m-2 transition-all duration-200 ease-in-out'>
        <div className='inline-flex items-center content-center justify-center'>
          <CaretDownIcon className='w-4 h-4 mr-2 max-md:hidden' />
          <CaretUpIcon className='w-4 h-4 mr-2 md:hidden' />

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
  )
}

export default UserOptions
