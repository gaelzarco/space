'use client'

import type { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center max-xl:min-w-[90px] min-w-[142px] h-8 justify-center content-center bg-neutral-200/70 dark:bg-neutral-800/70 hover:bg-neutral-300/70 dark:hover:bg-neutral-900/70 dark:text-white px-6 py-5 m-2 rounded-full transition-all duration-200 ease-in-out',
        {
          'cursor-progress animate-pulse bg-black text-white dark:bg-white dark:text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black':
            isLoading
        },
        className
      )}
      onClick={!isLoading ? onClick : () => {}}
      {...props}
    >
      <div className='inline-flex mx-2 items-center justify-center'>
        {children}
      </div>
    </button>
  )
}

export default Button
