'use client'

import { type FC, type HTMLAttributes, useState } from 'react'
import { signOut } from 'next-auth/react'

interface LogOutOptionProps extends HTMLAttributes<HTMLDivElement> {}

const LogoutOption: FC<LogOutOptionProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false)

  return (
    <div
      {...props}
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
    </div>
  )
}

export default LogoutOption
