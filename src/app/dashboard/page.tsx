import { type FC } from 'react'

import Button from '@/components/ui/button'

const Dashboard: FC = () => {
  return (
    <div className="flex flex-col items-center content-center justify-center w-full min-h-[93.8vh] text-sm">
      <h1 className="text-lg mb-2 text-neutral-400 dark:text-neutral-500">
        Start a conversation
      </h1>
      <Button className="mx-0">New</Button>
    </div>
  )
}

export default Dashboard
