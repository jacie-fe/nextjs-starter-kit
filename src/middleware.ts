import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/navigation'
import { getUserInfo } from './data/actions/auth-actions'

const intlMiddleware = createMiddleware(routing)

const protectedRoutes = ['/console']

const publicRoutes = ['/signin', '/signup']

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route))
}

// Helper function to check if a path is public
function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const user = await getUserInfo()
  const currentPath = request.nextUrl.pathname

  if (isProtectedRoute(currentPath) && (!user || !user.user_id)) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isPublicRoute(currentPath) && user && user.user_id) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
