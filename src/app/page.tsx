import LandingNavBar from '@/components/landingnavbar'

export default function Home() {
  return (
    <main className='flex flex-col max-w-[1800px] w-full mx-auto items-center content-center justify-center flex-grow'>
      <LandingNavBar />

      <div className='flex flex-col w-full mx-auto items-center max-sm:mt-12 my-20 flex-grow'>
        <h1 className='max-sm:text-4xl max-xl:text-6xl text-8xl font-bold text-center'>
          Real-time chat app
        </h1>
        <h1 className='max-sm:text-4xl max-xl:text-6xl text-8xl font-bold text-center'>
          for developers
        </h1>

        <div className='flex max-sm:flex-col flex-row w-full items-center justify-center max-sm:my-0 max-sm:mb-44 max-sm:p my-10'>
          <div className='mt-10 flex max-sm:flex-col flex-row items-center max-sm:w-[80%] w-[95%] h-[180px] justify-between'>
            <div className='flex flex-col items-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-3xl rounded-l-[45px] rounded-r-lg'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>
                NextJS 13
              </h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Serverless architecture
              </h2>
            </div>
            <div className='flex flex-col items-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-3xl rounded-lg'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>
                Tailwind CSS
              </h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Inline styling for the modern web
              </h2>
            </div>
            <div className='flex flex-col items-center leading-8 justify-center max-sm:mt-4 max-sm:w-full w-[32.9%] max-sm:min-h-[100px] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white max-sm:rounded-3xl rounded-l-lg rounded-r-[45px]'>
              <h1 className='max-xl:text-lg text-xl font-semibold'>Redis</h1>
              <h2 className='max-xl:text-xs text-md text-neutral-500 font-semibold'>
                Serverless database w/ Upstash
              </h2>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center w-full my-10'>
          <h1 className='z-[-10] absolute max-sm:text-[2.7em] max-lg:text-[5em] max-xl:text-[8em] text-[10em] font-extrabold text-neutral-200 dark:text-neutral-900'>
            Fast and Secure
          </h1>
        </div>
      </div>
    </main>
  )
}
