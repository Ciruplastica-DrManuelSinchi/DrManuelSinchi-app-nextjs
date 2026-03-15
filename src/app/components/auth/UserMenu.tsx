'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, LayoutDashboard, Shield, ChevronDown } from 'lucide-react'

export default function UserMenu() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (status === 'loading') {
    return (
      <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
    )
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-white/90 hover:text-white text-sm font-medium transition-colors"
      >
        Iniciar Sesión
      </Link>
    )
  }

  const initials = session.user.name
    ? session.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : session.user.email?.[0].toUpperCase() || 'U'

  const isAdmin = session.user.role === 'ADMIN'

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
        whileTap={{ scale: 0.95 }}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-semibold text-sm">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || ''}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        {/* Name (hidden on mobile) */}
        <span className="hidden md:block text-white/90 text-sm font-medium max-w-[120px] truncate">
          {session.user.name || session.user.email}
        </span>

        <ChevronDown
          className={`hidden md:block w-4 h-4 text-white/70 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />

        {/* Admin badge */}
        {isAdmin && (
          <span className="hidden md:flex items-center gap-1 bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full">
            <Shield className="w-3 h-3" />
            Admin
          </span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 glass-light rounded-xl shadow-elevation-3 py-2 z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-dark truncate">
                {session.user.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user.email}
              </p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" />
                Mi Perfil
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Panel Admin
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 pt-1">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
