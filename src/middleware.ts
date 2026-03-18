import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Rutas de autenticación (redirigir si ya está logueado)
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

// Rutas protegidas (requieren autenticación)
const protectedRoutes = ['/dashboard', '/profile', '/admin']

// Rutas solo para admin
const adminRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Obtener token de sesión
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthenticated = !!token
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  // Si es admin y está en la página principal, redirigir a /admin
  if (pathname === '/' && isAuthenticated && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Si está en ruta de auth y ya está logueado, redirigir según rol
  if (isAuthRoute && isAuthenticated) {
    const redirectUrl = token.role === 'ADMIN' ? '/admin' : '/dashboard'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Si intenta acceder a ruta protegida sin auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si intenta acceder a ruta admin sin ser admin
  if (isAdminRoute && isAuthenticated && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
  ],
}
