import { withAuth } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard'],
}

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token }) => token?.id !== null,
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  }
)
