'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
  Calendar,
  FileDown,
  Filter,
  Stethoscope,
  DollarSign,
  CheckCircle,
  CalendarClock,
  Scissors,
} from 'lucide-react'
import { generateStatsPDF } from '@/lib/pdf-generator'
import { generateStatsExcel } from '@/lib/excel-generator'
import { FileSpreadsheet } from 'lucide-react'

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
  surgeon?: {
    bookings: {
      total: number
      thisMonth: number
      growth: number
      confirmed: number
      completed: number
      cancelled: number
      pending: number
      confirmationRate: number
      upcoming: number
    }
    revenue: {
      total: number
      thisMonth: number
      growth: number
      transactions: number
    }
    topProcedures: Array<{
      name: string
      category: string
      count: number
    }>
    recentBookings: Array<{
      id: string
      procedureName: string
      date: string
      timeSlot: string
      status: string
      user: {
        name: string | null
        email: string
      }
    }>
  }
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exportPdfLoading, setExportPdfLoading] = useState(false)
  const [exportExcelLoading, setExportExcelLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)

      const res = await fetch(`/api/admin/stats?${params}`)
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

  const handleExportPDF = () => {
    if (!stats) return
    setExportPdfLoading(true)
    try {
      const dateRange = dateFrom && dateTo
        ? { from: new Date(dateFrom), to: new Date(dateTo) }
        : undefined
      generateStatsPDF(stats, dateRange)
    } catch {
      setError('Error al generar PDF')
    } finally {
      setExportPdfLoading(false)
    }
  }

  const handleExportExcel = async () => {
    if (!stats) return
    setExportExcelLoading(true)
    try {
      const dateRange = dateFrom && dateTo
        ? { from: new Date(dateFrom), to: new Date(dateTo) }
        : undefined
      await generateStatsExcel(stats, dateRange)
    } catch {
      setError('Error al generar Excel')
    } finally {
      setExportExcelLoading(false)
    }
  }

  const handleApplyFilters = () => {
    fetchStats()
  }

  const handleClearFilters = () => {
    setDateFrom('')
    setDateTo('')
    fetchStats()
  }

  useEffect(() => {
    fetchStats()
  }, [])

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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters || dateFrom || dateTo
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button
              onClick={handleExportExcel}
              disabled={exportExcelLoading || !stats}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet className={`w-4 h-4 ${exportExcelLoading ? 'animate-pulse' : ''}`} />
              Excel
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exportPdfLoading || !stats}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className={`w-4 h-4 ${exportPdfLoading ? 'animate-pulse' : ''}`} />
              PDF
            </button>
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4"
        >
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <button
              onClick={handleApplyFilters}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Aplicar
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              Limpiar
            </button>
          </div>
          {(dateFrom || dateTo) && (
            <p className="mt-3 text-sm text-gray-500">
              Mostrando estadísticas{' '}
              {dateFrom && `desde ${new Date(dateFrom).toLocaleDateString('es-PE')}`}
              {dateFrom && dateTo && ' '}
              {dateTo && `hasta ${new Date(dateTo).toLocaleDateString('es-PE')}`}
            </p>
          )}
        </motion.div>
      )}

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
          {/* Métricas del Cirujano */}
          {stats.surgeon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                Métricas de Consulta
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Citas del mes */}
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 shadow-sm text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        stats.surgeon.bookings.growth >= 0
                          ? 'bg-green-400/30 text-green-100'
                          : 'bg-red-400/30 text-red-100'
                      }`}
                    >
                      {stats.surgeon.bookings.growth >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {stats.surgeon.bookings.growth >= 0 ? '+' : ''}
                      {stats.surgeon.bookings.growth}%
                    </span>
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    {stats.surgeon.bookings.thisMonth}
                  </p>
                  <p className="text-sm text-white/80">Citas este mes</p>
                  <p className="text-xs text-white/60 mt-1">
                    {stats.surgeon.bookings.total} total
                  </p>
                </div>

                {/* Tasa de confirmación */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 shadow-sm text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    {stats.surgeon.bookings.confirmationRate}%
                  </p>
                  <p className="text-sm text-white/80">Tasa de confirmación</p>
                  <p className="text-xs text-white/60 mt-1">
                    {stats.surgeon.bookings.confirmed + stats.surgeon.bookings.completed} confirmadas
                  </p>
                </div>

                {/* Próximas citas */}
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-5 shadow-sm text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      <CalendarClock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    {stats.surgeon.bookings.upcoming}
                  </p>
                  <p className="text-sm text-white/80">Próximos 7 días</p>
                  <p className="text-xs text-white/60 mt-1">
                    {stats.surgeon.bookings.pending} pendientes
                  </p>
                </div>

                {/* Ingresos */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 shadow-sm text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    {stats.surgeon.revenue.growth !== 0 && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          stats.surgeon.revenue.growth >= 0
                            ? 'bg-green-400/30 text-green-100'
                            : 'bg-red-400/30 text-red-100'
                        }`}
                      >
                        {stats.surgeon.revenue.growth >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {stats.surgeon.revenue.growth >= 0 ? '+' : ''}
                        {stats.surgeon.revenue.growth}%
                      </span>
                    )}
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    S/ {stats.surgeon.revenue.thisMonth.toLocaleString()}
                  </p>
                  <p className="text-sm text-white/80">Ingresos del mes</p>
                  <p className="text-xs text-white/60 mt-1">
                    {stats.surgeon.revenue.transactions} transacciones
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Procedimientos más solicitados y citas recientes */}
          {stats.surgeon && (stats.surgeon.topProcedures.length > 0 || stats.surgeon.recentBookings.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid lg:grid-cols-2 gap-6 mb-8"
            >
              {/* Procedimientos más solicitados */}
              {stats.surgeon.topProcedures.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Procedimientos más solicitados
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      {stats.surgeon.topProcedures.map((proc, index) => (
                        <div key={proc.name} className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-amber-100 text-amber-700' :
                            index === 1 ? 'bg-gray-200 text-gray-600' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{proc.name}</p>
                            <p className="text-xs text-gray-500">{proc.category}</p>
                          </div>
                          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {proc.count} citas
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Citas recientes */}
              {stats.surgeon.recentBookings.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Citas recientes
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {stats.surgeon.recentBookings.map((booking) => (
                      <Link
                        key={booking.id}
                        href="/admin/bookings"
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {booking.procedureName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.user.name || booking.user.email}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString('es-PE', {
                              day: '2-digit',
                              month: 'short',
                            })}
                          </p>
                          <p className="text-xs text-gray-400">{booking.timeSlot}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <Link
                      href="/admin/bookings"
                      className="text-sm text-primary hover:underline"
                    >
                      Ver todas las citas
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
