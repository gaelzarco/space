import type { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isLoading: boolean
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
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
        'inline-flex items-center min-w-[100px] justify-center bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-6 m-2 rounded-xl transition-all duration-200 ease-in-out',
        {
          'cursor-not-allowed animate-pulse bg-white text-black hover:bg-white':
            isLoading,
        },
        className
      )}
      onClick={(e) => {
        onClick(e)
      }}
      {...props}
    >
      <div className="inline-flex mx-2 items-center justify-center">
        {children}
      </div>
    </button>
  )
}

export default Button
