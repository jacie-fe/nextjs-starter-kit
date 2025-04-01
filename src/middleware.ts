import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/navigation'
import { getUserProfile } from './data/actions/auth-actions'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from './data/services/token-service'

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

export async function middleware(request: NextRequest, response: NextResponse) {
  const currentPath = request.nextUrl.pathname
console.log("middleware");

  let user = null
  try {
    user = await getUserProfile()
  } catch (error) {
    console.error('Error fetching user info:', error)
  }
  console.log('User info:', user);
  

  if (!user?.user_id) {
    console.log("User not logged in, clearing cookies");
    
    response.cookies?.set(ACCESS_TOKEN_KEY, '', { maxAge: 0 })
    response.cookies?.set(REFRESH_TOKEN_KEY, '', { maxAge: 0 })
    if (isProtectedRoute(currentPath)) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  if (isPublicRoute(currentPath) && user && user.user_id) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
