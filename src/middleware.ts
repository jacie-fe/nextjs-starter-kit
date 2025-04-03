import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/navigation'
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
  const currentPath = request.nextUrl.pathname

  const access_token = request.cookies.get('access_token')?.value

  if (!access_token) {
    if (isProtectedRoute(currentPath)) {
      const returnUrl = encodeURIComponent(currentPath)
      return NextResponse.redirect(new URL(`/signin?returnUrl=${returnUrl}`, request.url))
    }
  }

  if (isPublicRoute(currentPath) && access_token) {
    // User is logged in and trying to access a public route, redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
