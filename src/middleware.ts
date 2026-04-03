import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Crear middleware de internacionalización
const intlMiddleware = createIntlMiddleware(routing)

// Rutas de autenticación (redirigir si ya está logueado)
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

// Rutas protegidas (requieren autenticación)
const protectedRoutes = ['/dashboard', '/profile', '/admin']

// Rutas solo para admin
const adminRoutes = ['/admin']

// Rutas públicas del sitio (landing page y contenido público)
// Los administradores logueados serán redirigidos a /admin si intentan acceder
const publicLandingRoutes = [
  '/cirugia-plastica-facial',
  '/cirugia-plastica-corporal',
  '/cirugia-reconstructiva',
  '/medicina-estetica',
  '/cirugia-capilar',
  '/procedimientos',
  '/blog',
  '/casos-reales',
  '/videos',
  '/dr-manuel-sinchi',
  '/preguntas-frecuentes',
  '/reservar',
  '/terminos',
  '/privacidad',
]

// Rutas que existen a nivel raíz (no bajo [locale])
// Estas rutas no necesitan reescritura de locale
const rootLevelRoutes = [
  ...publicLandingRoutes,
  // Auth routes
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  // Protected routes
  '/dashboard',
  '/profile',
  '/admin',
]

// Función para quitar el locale del pathname
function removeLocaleFromPathname(pathname: string): string {
  const localePattern = /^\/(es|en)(\/|$)/
  return pathname.replace(localePattern, '/')
}

// Verificar si es una ruta que existe a nivel raíz
function isRootLevelRoute(pathname: string): boolean {
  const cleanPath = removeLocaleFromPathname(pathname)
  return rootLevelRoutes.some(route => cleanPath.startsWith(route))
}

// Verificar si es una ruta pública del landing (contenido público)
function isPublicLandingRoute(pathname: string): boolean {
  const cleanPath = removeLocaleFromPathname(pathname)
  return publicLandingRoutes.some(route => cleanPath.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorar rutas de API y assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.') // archivos estáticos
  ) {
    return NextResponse.next()
  }

  // Detectar locale en el pathname
  const localeFromPath = pathname.match(/^\/(es|en)(\/|$)/)
  const currentLocale = localeFromPath ? localeFromPath[1] : 'es'
  const pathnameWithoutLocale = removeLocaleFromPathname(pathname)

  // Manejar rutas a nivel raíz (procedure pages, blog, etc.)
  // Si alguien accede con prefijo de locale a una ruta raíz
  if (localeFromPath) {
    const restPath = pathname.replace(/^\/(es|en)/, '') || '/'
    if (isRootLevelRoute(restPath)) {
      if (currentLocale === 'es') {
        // Para español (default), quitar el prefijo y redirigir
        return NextResponse.redirect(new URL(restPath, request.url))
      }
      // Para otros idiomas (ej: /en/cirugia-plastica-facial/...),
      // usar rewrite para servir la página raíz pero mantener el locale
      const url = new URL(restPath, request.url)
      const response = NextResponse.rewrite(url, {
        request: {
          headers: new Headers({
            ...Object.fromEntries(request.headers),
            'x-next-intl-locale': currentLocale,
          }),
        },
      })
      response.cookies.set('NEXT_LOCALE', currentLocale, { path: '/', sameSite: 'lax' })
      return response
    }
  }

  // Para rutas raíz sin prefijo, no aplicar intlMiddleware
  if (isRootLevelRoute(pathname)) {
    // Obtener token de sesión para rutas protegidas
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const isAuthenticated = !!token
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))
    const isPublicRoute = isPublicLandingRoute(pathname)

    // Si es admin y está en una ruta pública del landing, redirigir a /admin
    if (isPublicRoute && isAuthenticated && token.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Si está en ruta de auth y ya está logueado, redirigir según rol
    if (isAuthRoute && isAuthenticated) {
      const redirectPath = token.role === 'ADMIN' ? '/admin' : '/dashboard'
      return NextResponse.redirect(new URL(redirectPath, request.url))
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

    // Si un ADMIN accede a /dashboard, redirigir a /admin
    if (pathname === '/dashboard' && isAuthenticated && token.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Leer el locale de la cookie o usar el default
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    const locale = cookieLocale && ['es', 'en'].includes(cookieLocale) ? cookieLocale : 'es'

    // Usar rewrite para establecer el header que next-intl necesita
    const response = NextResponse.rewrite(request.nextUrl, {
      request: {
        headers: new Headers({
          ...Object.fromEntries(request.headers),
          'x-next-intl-locale': locale,
        }),
      },
    })
    response.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax' })
    return response
  }

  // Categorías dinámicas nuevas: rutas de 1-2 segmentos no reconocidas
  // Ej: /nueva-categoria  →  reescribe internamente a /categoria/nueva-categoria
  //     /nueva-categoria/procedimiento  →  /categoria/nueva-categoria/procedimiento
  // La URL del navegador permanece limpia (sin /categoria/).
  if (!localeFromPath && pathname !== '/' && !pathname.startsWith('/categoria')) {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length >= 1 && segments.length <= 2) {
      const locale = request.cookies.get('NEXT_LOCALE')?.value ?? 'es'
      const url = request.nextUrl.clone()
      url.pathname = `/categoria/${segments.join('/')}`
      const response = NextResponse.rewrite(url, {
        request: {
          headers: new Headers({
            ...Object.fromEntries(request.headers),
            'x-next-intl-locale': locale,
          }),
        },
      })
      response.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax' })
      return response
    }
  }

  // Para rutas que necesitan intl middleware (landing page /, /en, auth pages)
  const response = intlMiddleware(request)

  // Obtener token de sesión
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthenticated = !!token
  const isAuthRoute = authRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  const isProtectedRoute = protectedRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathnameWithoutLocale.startsWith(route))
  const isPublicRoute = isPublicLandingRoute(pathnameWithoutLocale)

  // Si es admin y está en la página principal o cualquier ruta pública, redirigir a /admin
  if ((pathnameWithoutLocale === '/' || isPublicRoute) && isAuthenticated && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Si está en ruta de auth y ya está logueado, redirigir según rol
  if (isAuthRoute && isAuthenticated) {
    const redirectPath = token.role === 'ADMIN' ? '/admin' : '/dashboard'
    return NextResponse.redirect(new URL(redirectPath, request.url))
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

  // Si un ADMIN accede a /dashboard, redirigir a /admin
  if (pathnameWithoutLocale === '/dashboard' && isAuthenticated && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Coincidir con todas las rutas excepto las que comienzan con:
    // - api (rutas API)
    // - _next/static (archivos estáticos)
    // - _next/image (archivos de optimización de imagen)
    // - favicon.ico, etc
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
