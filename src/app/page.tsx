import { db } from '@/lib/db'

export const runtime = 'edge'

export default async function Home() {
  await db.set('test', 'test')

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to Space!</h1>
      <p>Your real-time chat app hosted on the edge</p>
    </main>
  )
}
