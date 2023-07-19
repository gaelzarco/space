import { type FC } from 'react'

import Button from '@/components/ui/button'
import { PersonIcon } from '@radix-ui/react-icons'

const Dashboard: FC = () => {
  return (
    <div className="flex flex-col items-center content-center justify-center w-full min-h-[93.8vh] text-sm">
      <h1 className="text-lg mb-2 text-neutral-400 dark:text-neutral-500">
        You could use a friend or two
      </h1>
      <Button className="text-sm mx-0">
        <PersonIcon className="mr-2" />
        New
      </Button>
    </div>
  )
}

export default Dashboard
