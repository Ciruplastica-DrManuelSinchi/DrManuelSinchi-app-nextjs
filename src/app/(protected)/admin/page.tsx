'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  ArrowLeft,
  Shield,
  TrendingUp,
  TrendingDown,
  UserCheck,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

interface StatsData {
  overview: {
    totalUsers: number
    usersThisMonth: number
    usersThisWeek: number
    userGrowth: number
    verifiedUsers: number
    verificationRate: number
    activeUsers: number
    suspendedUsers: number
  }
}

const adminActions = [
  {
    title: 'Gestión de Reservas',
    description: 'Administrar citas y consultas de pacientes',
    icon: Calendar,
    href: '/admin/bookings',
    color: 'bg-green-500',
  },
  {
    title: 'Gestión de Usuarios',
    description: 'Ver, editar y administrar cuentas de pacientes',
    icon: Users,
    href: '/admin/users',
    color: 'bg-blue-500',
  },
  {
    title: 'Estadísticas',
    description: 'Analíticas y reportes del sistema',
    icon: BarChart3,
    href: '/admin/stats',
    color: 'bg-purple-500',
  },
  {
    title: 'Configuración',
    description: 'Ajustes generales del sistema',
    icon: Settings,
    href: '/admin/settings',
    color: 'bg-gray-700',
  },
]

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        const data = await res.json()
        if (res.ok) {
          setStats(data)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  if (status === 'loading') {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const statsCards = [
    {
      label: 'Usuarios Registrados',
      value: loadingStats ? '—' : stats?.overview.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: stats?.overview.userGrowth || 0,
    },
    {
      label: 'Nuevos Este Mes',
      value: loadingStats ? '—' : stats?.overview.usersThisMonth || 0,
      icon: Calendar,
      color: 'bg-green-500',
      change: null,
    },
    {
      label: 'Tasa de Verificación',
      value: loadingStats ? '—' : `${stats?.overview.verificationRate || 0}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: null,
    },
    {
      label: 'Verificados',
      value: loadingStats ? '—' : stats?.overview.verifiedUsers || 0,
      icon: UserCheck,
      color: 'bg-accent',
      change: null,
    },
  ]

  return (
    <div className="container-custom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-primary">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Bienvenido, {session?.user?.name}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                {stat.change !== null && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                      stat.change >= 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.change >= 0 ? '+' : ''}
                    {stat.change}%
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {loadingStats ? (
                  <span className="inline-block w-12 h-7 bg-gray-200 rounded animate-pulse" />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Admin Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Herramientas de Administración
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
              >
                <Link
                  href={action.href}
                  className="block bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Resumen del Sistema
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-sm">Usuarios activos</p>
                <p className="text-2xl font-bold">
                  {loadingStats ? '—' : stats?.overview.activeUsers || 0}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-sm">Suspendidos</p>
                <p className="text-2xl font-bold">
                  {loadingStats ? '—' : stats?.overview.suspendedUsers || 0}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white/70 text-sm">Esta semana</p>
                <p className="text-2xl font-bold">
                  {loadingStats ? '—' : stats?.overview.usersThisWeek || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
