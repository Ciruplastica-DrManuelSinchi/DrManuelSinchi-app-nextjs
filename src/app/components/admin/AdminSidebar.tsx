'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  FolderOpen,
  Image,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  ShieldAlert,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

interface MenuItem {
  title: string
  href: string
  icon: typeof LayoutDashboard
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    title: 'General',
    items: [
      { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      { title: 'Reservas', href: '/admin/bookings', icon: Calendar },
      { title: 'Bloqueos', href: '/admin/blocked-slots', icon: ShieldAlert },
      { title: 'Usuarios', href: '/admin/users', icon: Users },
      { title: 'Estadísticas', href: '/admin/stats', icon: BarChart3 },
    ],
  },
  {
    title: 'Contenido Web',
    items: [
      { title: 'Categorías', href: '/admin/categories', icon: FolderOpen },
      { title: 'Procedimientos', href: '/admin/procedures', icon: Stethoscope },
      { title: 'Casos Reales', href: '/admin/cases', icon: Image },
      { title: 'Blog', href: '/admin/blog', icon: FileText },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { title: 'Configuración', href: '/admin/settings', icon: Settings },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 flex flex-col shadow-sm"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-dark text-sm">Admin Panel</h2>
                  <p className="text-xs text-gray-500">Dr. Manuel Sinchi</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title}>
                {/* Section Header */}
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {section.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
                {isCollapsed && sectionIndex > 0 && (
                  <div className="border-t border-gray-100 mx-2 mb-2" />
                )}

                {/* Section Items */}
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`
                            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                            ${active
                              ? 'bg-primary text-white shadow-md'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-dark'
                            }
                            ${isCollapsed ? 'justify-center' : ''}
                          `}
                          title={isCollapsed ? item.title : undefined}
                        >
                          <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : ''}`} />
                          <AnimatePresence mode="wait">
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                              >
                                {item.title}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          {/* Cerrar sesión */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-600
              hover:bg-red-50 hover:text-red-600 transition-colors
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? 'Cerrar sesión' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Cerrar sesión
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </motion.aside>

      {/* Spacer for content */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-shrink-0"
      />
    </>
  )
}
