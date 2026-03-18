'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
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

interface BookingStats {
  pending: number
  confirmed: number
  total: number
}

export default function AdminPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/bookings?limit=100'),
        ])

        const statsData = await statsRes.json()
        const bookingsData = await bookingsRes.json()

        if (statsRes.ok) {
          setStats(statsData)
        }

        if (bookingsRes.ok) {
          const bookings = bookingsData.bookings || []
          setBookingStats({
            pending: bookings.filter((b: { status: string }) => b.status === 'PENDING').length,
            confirmed: bookings.filter((b: { status: string }) => b.status === 'CONFIRMED').length,
            total: bookings.length,
          })
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  const statsCards = [
    {
      label: 'Usuarios Totales',
      value: loadingStats ? '—' : stats?.overview.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: stats?.overview.userGrowth || 0,
      href: '/admin/users',
    },
    {
      label: 'Nuevos Este Mes',
      value: loadingStats ? '—' : stats?.overview.usersThisMonth || 0,
      icon: UserCheck,
      color: 'bg-green-500',
      change: null,
      href: '/admin/users',
    },
    {
      label: 'Reservas Pendientes',
      value: loadingStats ? '—' : bookingStats?.pending || 0,
      icon: Clock,
      color: 'bg-amber-500',
      change: null,
      href: '/admin/bookings',
    },
    {
      label: 'Reservas Confirmadas',
      value: loadingStats ? '—' : bookingStats?.confirmed || 0,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      change: null,
      href: '/admin/bookings',
    },
  ]

  const quickActions = [
    {
      label: 'Ver reservas pendientes',
      href: '/admin/bookings?status=PENDING',
      icon: AlertCircle,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Gestionar usuarios',
      href: '/admin/users',
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Agregar procedimiento',
      href: '/admin/procedures',
      icon: Calendar,
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-dark">
          Bienvenido, {session?.user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          Panel de administración - Ciruplástica
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`${stat.color} w-11 h-11 rounded-xl flex items-center justify-center`}
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
            </Link>
          )
        })}
      </motion.div>

      {/* Quick Actions & Summary */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-dark mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`${action.color} p-4 rounded-xl flex items-center gap-3 hover:opacity-80 transition-opacity`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* System Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white"
        >
          <h2 className="text-lg font-semibold mb-4">Resumen</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Usuarios activos</span>
              <span className="font-bold">
                {loadingStats ? '—' : stats?.overview.activeUsers || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Tasa verificación</span>
              <span className="font-bold">
                {loadingStats ? '—' : `${stats?.overview.verificationRate || 0}%`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Esta semana</span>
              <span className="font-bold">
                {loadingStats ? '—' : stats?.overview.usersThisWeek || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Suspendidos</span>
              <span className="font-bold">
                {loadingStats ? '—' : stats?.overview.suspendedUsers || 0}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
