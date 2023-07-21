'use client'

import { type FC, type ButtonHTMLAttributes, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import Button from '@/components/ui/button'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'

const ThemeSwitcher: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className
}) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  function toggleTheme() {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  return (
    <Button
      className={`${className} text-neutral-700 dark:text-neutral-200`}
      onClick={toggleTheme}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default ThemeSwitcher
