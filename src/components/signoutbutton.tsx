'use client'

import { ButtonHTMLAttributes, FC, useState } from 'react'
import { signOut } from 'next-auth/react'

import Button from '@/components/ui/button'

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  return (
    <Button
      {...props}
      isLoading={isSigningOut}
      onClick={async () => {
        setIsSigningOut(true)
        try {
          await signOut()
        } catch (error) {
          console.error(error)
        } finally {
          setIsSigningOut(false)
        }
      }}
    >
      {isSigningOut ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}

export default SignOutButton
