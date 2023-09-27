import LandingNavBar from '@/components/landingnavbar'
import Link from 'next/link'

import Button from '@/components/ui/button'
import { GearIcon, LightningBoltIcon } from '@radix-ui/react-icons'

export default function Home() {
  return (
    <main className='cursor-default flex flex-col max-w-[1800px] w-full mx-auto items-center content-center justify-center'>
      <LandingNavBar />

      <div className='flex flex-col w-full mx-auto items-center max-sm:mt-12 my-20 flex-grow'>
        <h1 className='max-sm:text-4xl max-xl:text-6xl text-8xl font-bold text-center'>
          Real-time chat app
        </h1>
        <h1 className='max-sm:text-4xl max-xl:text-6xl text-8xl font-bold text-center'>
          for developers
        </h1>

        <div className='flex max-sm:flex-col flex-row w-full items-center justify-center max-sm:my-0 max-sm:mb-44 my-10'>
          <div className='mt-10 flex max-sm:flex-col flex-row items-center max-sm:w-[80%] w-[95%] h-[180px] justify-between'>
            <div className='flex flex-col items-center text-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-full rounded-l-[45px] rounded-r-lg'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>
                NextJS 13
              </h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Serverless architecture
              </h2>
            </div>
            <div className='flex flex-col items-center text-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-full rounded-lg'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>
                Tailwind CSS
              </h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Inline styling for the modern web
              </h2>
            </div>
            <div className='flex flex-col items-center text-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-full rounded-l-lg rounded-r-[45px]'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>Redis</h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Serverless database w/ Upstash
              </h2>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center w-full my-10'>
          <h1 className='text-center max-sm:text-[2.7em] max-lg:text-[5em] max-xl:text-[8em] text-[10em] font-extrabold text-neutral-200 dark:text-neutral-900'>
            Fast and Secure
          </h1>
        </div>

        <div className='flex flex-col items-center w-full'>
          <h1 className='max-sm:text-2xl max-xl:text-4xl text-6xl font-bold text-center'>
            React & Flow
          </h1>
          <h1 className='max-sm:text-lg max-xl:text-2xl text-3xl font-bold text-center text-neutral-500'>
            RSCs, Webhooks, timestamps, and animations.
          </h1>
        </div>

        <div className='flex max-sm:flex-col flex-row w-full items-center justify-center max-sm:my-0 max-sm:mb-8 my-10'>
          <div className='mt-8 flex max-sm:flex-col flex-row items-center max-sm:w-[80%] w-[95%] h-[180px] justify-between'>
            <div className='flex flex-row items-center leading-8 justify-center max-sm:mt-4 mt-10 w-[49.7%] max-sm:w-full max-sm:min-h-[100px] min-h-[180px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white rounded-3xl rounded-r-lg max-sm:rounded-full'>
              <h1 className='font-semibold max-xl:text-lg text-xl mr-4'>
                Lightning Fast
              </h1>
              <LightningBoltIcon className='w-5 h-5 animate-pulse text-orange-600 dark:text-orange-400' />
            </div>
            <div className='flex flex-row items-center leading-8 justify-center max-sm:mt-4 mt-10 w-[49.7%] max-sm:w-full max-sm:min-h-[100px] min-h-[180px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white rounded-3xl rounded-l-lg max-sm:rounded-full'>
              <h1 className='font-semibold max-xl:text-lg text-xl mr-4'>
                Incredibly Responsive
              </h1>
              <GearIcon className='w-5 h-5 animate-spin text-purple-600 dark:text-purple-400' />
            </div>
          </div>
        </div>
      </div>

      <footer className='flex flex-col max-sm:py-5 py-10 min-w-full h-[80px] items-center justify-between content-center border-t border-neutral-200 dark:border-neutral-800 text-black dark:text-white px-5'>
        <Link
          href='/'
          className='font-bold text-lg my-2 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 transition-all ease-in-out duration-200'
        >
          Social Space
        </Link>

        <div className='max-sm:text-sm mb-2 text-center'>
          <h1 className=' text-neutral-500'>
            © 2023 Gael Zarco. Software Developer from Las Vegas.
          </h1>
        </div>

        <div className='pb-10 max-sm:pb-5'>
          <Button className='bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:bg-green-600/10 dark:hover:bg-green-600/20 dark:text-green-400 cursor-default'>
            <div className='rounded-full h-[15px] w-[15px] bg-green-500 animate-pulse mr-2'></div>
            Status
          </Button>
        </div>
      </footer>
    </main>
  )
}
