import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value
  const path = request.nextUrl.pathname

  // Protect dashboard routes
  if (path.startsWith('/dashboard')) {
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Additional role-based protection
    if (path.includes('/admin') || path.includes('/superadmin')) {
      try {
        // Verify role from token or make API call to verify role
        const userRole = request.cookies.get('userRole')?.value

        if (path.includes('/admin') && userRole !== 'admin' && userRole !== 'superadmin') {
          return NextResponse.redirect(new URL('/', request.url))
        }

        if (path.includes('/superadmin') && userRole !== 'superadmin') {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } catch {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // Protect API routes
  if (path.startsWith('/api') && !path.includes('/api/auth/login')) {
    if (!authToken) {
      return new NextResponse(
        JSON.stringify({ message: 'Unauthorized' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ]
} 