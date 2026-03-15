'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  BarChart3,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
  Shield,
  Clock,
  Calendar,
} from 'lucide-react'

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
  distributions: {
    role: { patients: number; admins: number }
    status: { active: number; pending: number; suspended: number }
  }
  recentUsers: Array<{
    id: string
    name: string | null
    email: string
    createdAt: string
    status: string
    role: string
  }>
}

const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { color: string; label: string }> = {
    ACTIVE: { color: 'bg-green-100 text-green-700', label: 'Activo' },
    PENDING_VERIFICATION: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendiente' },
    SUSPENDED: { color: 'bg-red-100 text-red-700', label: 'Suspendido' },
  }
  const { color, label } = config[status] || { color: 'bg-gray-100 text-gray-700', label: status }
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/stats')
      const data = await res.json()

      if (res.ok) {
        setStats(data)
      } else {
        setError(data.error || 'Error al cargar estadísticas')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container-custom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-800">
                Estadísticas
              </h1>
              <p className="text-gray-500 text-sm">
                Analíticas del sistema
              </p>
            </div>
          </div>
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {stats && (
        <>
          {/* Overview Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    stats.overview.userGrowth >= 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stats.overview.userGrowth >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stats.overview.userGrowth >= 0 ? '+' : ''}
                  {stats.overview.userGrowth}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {stats.overview.totalUsers}
              </p>
              <p className="text-sm text-gray-500">Usuarios totales</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-green-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {stats.overview.usersThisMonth}
              </p>
              <p className="text-sm text-gray-500">Nuevos este mes</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-purple-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {stats.overview.verificationRate}%
              </p>
              <p className="text-sm text-gray-500">Tasa de verificación</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-accent w-10 h-10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {stats.overview.usersThisWeek}
              </p>
              <p className="text-sm text-gray-500">Nuevos esta semana</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Distribution Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 grid sm:grid-cols-2 gap-6"
            >
              {/* Role Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Distribución por Rol
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Pacientes</span>
                      <span className="font-medium">
                        {stats.distributions.role.patients}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            stats.overview.totalUsers > 0
                              ? (stats.distributions.role.patients /
                                  stats.overview.totalUsers) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Administradores
                      </span>
                      <span className="font-medium">
                        {stats.distributions.role.admins}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            stats.overview.totalUsers > 0
                              ? (stats.distributions.role.admins /
                                  stats.overview.totalUsers) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Distribución por Estado
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-green-500" />
                        Activos
                      </span>
                      <span className="font-medium">
                        {stats.distributions.status.active}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            stats.overview.totalUsers > 0
                              ? (stats.distributions.status.active /
                                  stats.overview.totalUsers) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-yellow-500" />
                        Pendientes
                      </span>
                      <span className="font-medium">
                        {stats.distributions.status.pending}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            stats.overview.totalUsers > 0
                              ? (stats.distributions.status.pending /
                                  stats.overview.totalUsers) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-1">
                        <UserX className="w-3 h-3 text-red-500" />
                        Suspendidos
                      </span>
                      <span className="font-medium">
                        {stats.distributions.status.suspended}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            stats.overview.totalUsers > 0
                              ? (stats.distributions.status.suspended /
                                  stats.overview.totalUsers) *
                                100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Usuarios Recientes
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {stats.recentUsers.map((user) => (
                  <Link
                    key={user.id}
                    href={`/admin/users/${user.id}`}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        {(user.name || user.email)[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {user.name || 'Sin nombre'}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={user.status} />
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <Link
                  href="/admin/users"
                  className="text-sm text-primary hover:underline"
                >
                  Ver todos los usuarios
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}
