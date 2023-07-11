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
        'inline-flex items-center bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-6 rounded-xl transition-colors duration-200 ease-in-out',
        { 'cursor-not-allowed': isLoading },
        { 'opacity-50': isLoading },
        className
      )}
      onClick={(e) => {
        onClick(e)
      }}
      {...props}
    >
      {isLoading && 'loading...'}
      {children}
    </button>
  )
}

export default Button
