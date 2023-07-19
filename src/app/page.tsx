import LandingNavBar from '@/components/landingnavbar'

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full max-w-7xl items-center content-center justify-center mx-auto">
      <LandingNavBar />

      <div className="flex flex-col w-full h-full mx-auto items-center my-20">
        <h1 className="text-8xl font-bold text-center">Your real-time chat</h1>
        <h1 className="text-8xl font-bold text-center">application</h1>

        <div className="flex flex-row w-full items-center justify-center my-10">
          <div className="mt-10 flex flex-row items-center w-[95%] h-[180px] justify-between">
            <div className="flex flex-col items-center leading-8 justify-center w-[32.9%] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white rounded-l-[45px] rounded-r-lg">
              <h1 className="text-xl font-semibold">NextJS 13</h1>
              <h2 className="text-md text-neutral-500 font-semibold">
                Serverless architecture hosted on Vercel
              </h2>
            </div>
            <div className="flex flex-col items-center leading-8 justify-center w-[32.9%] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white rounded-lg">
              <h1 className="text-xl font-semibold">Tailwind CSS</h1>
              <h2 className="text-md text-neutral-500 font-semibold">
                Inline styling for the modern web
              </h2>
            </div>
            <div className="flex flex-col items-center leading-8 justify-center w-[32.9%] h-full bg-neutral-200 dark:bg-neutral-900 dark:text-white rounded-l-lg rounded-r-[45px]">
              <h1 className="text-xl font-semibold">Redis</h1>
              <h2 className="text-md text-neutral-500 font-semibold">
                Serverless database with Upstash
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full my-10">
          <h1 className="z-[-10] absolute text-[10em] font-extrabold text-neutral-200 dark:text-neutral-900">
            Fast and Secure
          </h1>
        </div>
      </div>
    </main>
  )
}
