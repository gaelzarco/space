import NextAuth, { type NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { db } from '@/lib/db'

function getGithubCredential() {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set')
  }
  return {
    clientId,
    clientSecret,
  }
}

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set')
  }
  return {
    clientId,
    clientSecret,
  }
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHubProvider({
      clientId: getGithubCredential().clientId,
      clientSecret: getGithubCredential().clientSecret,
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser: User | null = await db.get(`user: ${token.id}`)

      if (!dbUser) {
        if (user) {
          token.id = user!.id
        }

        return token
      }

      if (dbUser) {
        token.name = dbUser.name
        token.email = dbUser.email
        token.image = dbUser.image
        token.id = dbUser.id
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    redirect() {
      return '/'
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
