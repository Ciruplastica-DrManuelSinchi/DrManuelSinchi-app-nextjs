'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe, ChevronDown, Check, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { locales, localeNames, defaultLocale, type Locale } from '@/i18n/config'

interface LanguageSelectorProps {
  isScrolled: boolean
}

// Función para obtener el locale de la cookie
function getLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/)
  if (match && (match[1] === 'es' || match[1] === 'en')) {
    return match[1] as Locale
  }
  return null
}

export default function LanguageSelector({ isScrolled }: LanguageSelectorProps) {
  const serverLocale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [cookieLocale, setCookieLocale] = useState<Locale | null>(null)

  // Leer el locale de la cookie al montar el componente
  useEffect(() => {
    setCookieLocale(getLocaleFromCookie())
  }, [pathname])

  // Derivar el locale actual usando múltiples fuentes
  const getCurrentLocale = (): Locale => {
    // 1. Primero intentar obtenerlo del pathname
    const match = pathname.match(/^\/(es|en)(\/|$)/)
    if (match) {
      return match[1] as Locale
    }

    // 2. Si no hay prefijo en la URL, usar la cookie (más confiable para rutas raíz)
    if (cookieLocale) {
      return cookieLocale
    }

    // 3. Fallback al locale del servidor
    return serverLocale || defaultLocale
  }

  const currentLocale = getCurrentLocale()

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false)
      return
    }

    // Detectar si la ruta actual tiene prefijo de locale
    const localePattern = /^\/(es|en)(\/|$)/
    const hasLocalePrefix = localePattern.test(pathname)

    let newPath: string

    if (hasLocalePrefix) {
      // La ruta tiene prefijo de locale, reemplazarlo
      const pathWithoutLocale = pathname.replace(localePattern, '/')

      if (newLocale === defaultLocale) {
        // Cambiar al idioma por defecto: quitar el prefijo
        newPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale
      } else {
        // Cambiar a otro idioma: agregar/reemplazar prefijo
        newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
      }
    } else {
      // La ruta NO tiene prefijo de locale (es una ruta raíz)
      if (newLocale === defaultLocale) {
        // Ya estamos en el idioma por defecto, mantener la ruta
        newPath = pathname
      } else {
        // Agregar prefijo del nuevo idioma
        newPath = `/${newLocale}${pathname === '/' ? '' : pathname}`
      }
    }

    // Guardar preferencia en cookie ANTES de navegar
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`

    // Actualizar el estado local inmediatamente
    setCookieLocale(newLocale)

    setIsOpen(false)

    // Si la ruta no cambia (ej: cambiar de en a es en /cirugia-plastica-corporal),
    // necesitamos forzar un reload completo para que el servidor lea la nueva cookie
    if (newPath === pathname) {
      window.location.reload()
      return
    }

    // Usar startTransition para una navegación más suave
    startTransition(() => {
      router.push(newPath)
      router.refresh()
    })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
          isScrolled
            ? 'text-gray-700 hover:bg-gray-100'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        } ${isPending ? 'opacity-70' : ''}`}
        whileHover={{ scale: isPending ? 1 : 1.05 }}
        whileTap={{ scale: isPending ? 1 : 0.95 }}
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Globe className="w-5 h-5" />
        )}
        <span className="hidden md:block text-sm font-medium uppercase">{currentLocale}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 py-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                disabled={isPending}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                  loc === currentLocale
                    ? 'bg-primary/5 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">
                    {loc === 'es' ? '🇪🇸' : '🇺🇸'}
                  </span>
                  {localeNames[loc]}
                </span>
                {loc === currentLocale && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
