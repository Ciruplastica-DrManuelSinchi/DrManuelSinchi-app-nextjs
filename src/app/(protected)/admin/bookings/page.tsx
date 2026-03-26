'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Hourglass,
  MoreVertical,
  Eye,
  Trash2,
  Check,
  X,
  CreditCard,
  TimerOff,
  FileDown,
  FileSpreadsheet,
  MapPin,
  Video,
} from 'lucide-react'
import { generateBookingsPDF } from '@/lib/pdf-generator'
import { generateBookingsExcel } from '@/lib/excel-generator'

interface BookingUser {
  id: string
  name: string | null
  email: string
  phone: string | null
}

interface Booking {
  id: string
  procedureName: string
  procedureCategory: string
  modalidad: 'PRESENCIAL' | 'VIRTUAL'
  date: string
  timeSlot: string
  message?: string
  status: 'AWAITING_PAYMENT' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'EXPIRED'
  createdAt: string
  user: BookingUser
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface Stats {
  awaitingPayment: number
  pending: number
  confirmed: number
  completed: number
  cancelled: number
  expired: number
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Hourglass }> = {
  AWAITING_PAYMENT: {
    label: 'Pendiente de pago',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: CreditCard,
  },
  PENDING: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Hourglass,
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
  COMPLETED: {
    label: 'Completada',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: CheckCircle,
  },
  EXPIRED: {
    label: 'Expirada',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: TimerOff,
  },
}

const defaultStatus = {
  label: 'Desconocido',
  color: 'bg-gray-100 text-gray-800 border-gray-200',
  icon: Hourglass,
}

export default function AdminBookingsPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [stats, setStats] = useState<Stats>({
    awaitingPayment: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    expired: 0,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [exportPdfLoading, setExportPdfLoading] = useState(false)
  const [exportExcelLoading, setExportExcelLoading] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Verificar autorización
  useEffect(() => {
    if (authStatus === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
    }
  }, [authStatus, session, router])

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)

      const response = await fetch(`/api/admin/bookings?${params}`)
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
        setPagination(data.pagination)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, statusFilter, dateFrom, dateTo])

  useEffect(() => {
    if (authStatus === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchBookings()
    }
  }, [authStatus, session, fetchBookings])

  // Buscar con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authStatus === 'authenticated' && session?.user?.role === 'ADMIN') {
        fetchBookings()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [search, authStatus, session, fetchBookings])

  const updateBookingStatus = async (id: string, newStatus: string) => {
    setUpdating(id)
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: newStatus as Booking['status'] } : b))
        )
        // Actualizar stats
        fetchBookings()
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    } finally {
      setUpdating(null)
      setActiveMenu(null)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva permanentemente?')) return

    setUpdating(id)
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBookings(prev => prev.filter(b => b.id !== id))
        fetchBookings()
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }

  const handleExportPDF = async () => {
    setExportPdfLoading(true)
    try {
      // Fetch all bookings without pagination for PDF
      const params = new URLSearchParams({ limit: '1000' })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)

      const response = await fetch(`/api/admin/bookings?${params}`)
      if (response.ok) {
        const data = await response.json()
        const dateRange = dateFrom && dateTo
          ? { from: new Date(dateFrom), to: new Date(dateTo) }
          : undefined
        generateBookingsPDF(data.bookings, dateRange)
      }
    } catch (error) {
      console.error('Error exporting PDF:', error)
    } finally {
      setExportPdfLoading(false)
    }
  }

  const handleExportExcel = async () => {
    setExportExcelLoading(true)
    try {
      // Fetch all bookings without pagination for Excel
      const params = new URLSearchParams({ limit: '1000' })
      if (search) params.append('search', search)
      if (statusFilter) params.append('status', statusFilter)
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)

      const response = await fetch(`/api/admin/bookings?${params}`)
      if (response.ok) {
        const data = await response.json()
        const dateRange = dateFrom && dateTo
          ? { from: new Date(dateFrom), to: new Date(dateTo) }
          : undefined
        await generateBookingsExcel(data.bookings, dateRange)
      }
    } catch (error) {
      console.error('Error exporting Excel:', error)
    } finally {
      setExportExcelLoading(false)
    }
  }

  if (authStatus === 'loading' || (authStatus === 'authenticated' && session?.user?.role !== 'ADMIN')) {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container-custom">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-dark mb-2">
            Gestión de Reservas
          </h1>
          <p className="text-gray-600">
            Administra las citas y consultas de los pacientes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            disabled={exportExcelLoading || bookings.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className={`w-4 h-4 ${exportExcelLoading ? 'animate-pulse' : ''}`} />
            Excel
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exportPdfLoading || bookings.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown className={`w-4 h-4 ${exportPdfLoading ? 'animate-pulse' : ''}`} />
            PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-100 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-700">{stats.awaitingPayment}</p>
              <p className="text-xs text-orange-600">Por pagar</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-yellow-50 border border-yellow-100 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Hourglass className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
              <p className="text-xs text-yellow-600">Pendientes</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-100 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">{stats.confirmed}</p>
              <p className="text-xs text-green-600">Confirmadas</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{stats.completed}</p>
              <p className="text-xs text-blue-600">Completadas</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-50 border border-red-100 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
              <p className="text-xs text-red-600">Canceladas</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-gray-50 border border-gray-200 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <TimerOff className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700">{stats.expired}</p>
              <p className="text-xs text-gray-600">Expiradas</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por paciente o procedimiento..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setPagination(prev => ({ ...prev, page: 1 }))
              }}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              <option value="">Todos los estados</option>
              <option value="AWAITING_PAYMENT">Por pagar</option>
              <option value="PENDING">Pendientes</option>
              <option value="CONFIRMED">Confirmadas</option>
              <option value="COMPLETED">Completadas</option>
              <option value="CANCELLED">Canceladas</option>
              <option value="EXPIRED">Expiradas</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors ${
              showFilters || dateFrom || dateTo
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Fechas
          </button>
        </div>

        {/* Date Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-end gap-4"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            {(dateFrom || dateTo) && (
              <button
                type="button"
                onClick={() => {
                  setDateFrom('')
                  setDateTo('')
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
                className="px-4 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                Limpiar fechas
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando reservas...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron reservas</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Paciente
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Procedimiento
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Modalidad
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Fecha y Hora
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => {
                  const status = statusConfig[booking.status] || defaultStatus
                  const StatusIcon = status.icon

                  return (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-dark">
                              {booking.user.name || 'Sin nombre'}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {booking.user.email}
                            </p>
                            {booking.user.phone && (
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {booking.user.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-dark">{booking.procedureName}</p>
                        <p className="text-xs text-gray-500">{booking.procedureCategory}</p>
                      </td>
                      <td className="px-6 py-4">
                        {booking.modalidad === 'VIRTUAL' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            <Video className="w-3 h-3" />
                            Virtual
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                            <MapPin className="w-3 h-3" />
                            Presencial
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{booking.timeSlot}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2 relative">
                          {/* Botón para confirmar pago manualmente (AWAITING_PAYMENT -> CONFIRMED) */}
                          {booking.status === 'AWAITING_PAYMENT' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                                disabled={updating === booking.id}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Confirmar pago"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'EXPIRED')}
                                disabled={updating === booking.id}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Marcar como expirada"
                              >
                                <TimerOff className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {/* Botón para PENDING (cancelar reservas legacy) */}
                          {booking.status === 'PENDING' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                              disabled={updating === booking.id}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Cancelar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          {/* Botón para CONFIRMED */}
                          {booking.status === 'CONFIRMED' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                                disabled={updating === booking.id}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Marcar como completada"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'CANCELLED')}
                                disabled={updating === booking.id}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Cancelar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setActiveMenu(activeMenu === booking.id ? null : booking.id)}
                            className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu */}
                          <AnimatePresence>
                            {activeMenu === booking.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                              >
                                <button
                                  onClick={() => {
                                    setActiveMenu(null)
                                    setSelectedBooking(booking)
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <Eye className="w-4 h-4" />
                                  Ver detalles
                                </button>
                                <button
                                  onClick={() => deleteBooking(booking.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Eliminar
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Mostrando {(pagination.page - 1) * pagination.limit + 1} a{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} de {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-dark">Detalles de Reserva</h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-center">
                  {(() => {
                    const status = statusConfig[selectedBooking.status] || defaultStatus
                    const StatusIcon = status.icon
                    return (
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                    )
                  })()}
                </div>

                {/* Patient Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Información del Paciente
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">
                          {selectedBooking.user.name || 'Sin nombre'}
                        </p>
                        <p className="text-xs text-gray-500">Nombre del paciente</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">{selectedBooking.user.email}</p>
                        <p className="text-xs text-gray-500">Correo electrónico</p>
                      </div>
                    </div>
                    {selectedBooking.user.phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                          <Phone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-dark">{selectedBooking.user.phone}</p>
                          <p className="text-xs text-gray-500">Teléfono</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Procedure Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Información del Procedimiento
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Procedimiento</p>
                      <p className="font-medium text-dark">{selectedBooking.procedureName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Categoría</p>
                      <p className="text-sm text-gray-600">{selectedBooking.procedureCategory}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Modalidad</p>
                      {selectedBooking.modalidad === 'VIRTUAL' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          <Video className="w-3 h-3" />
                          Virtual
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          <MapPin className="w-3 h-3" />
                          Presencial
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Fecha y Hora
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">{formatDate(selectedBooking.date)}</p>
                        <p className="text-xs text-gray-500">Fecha</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">{selectedBooking.timeSlot}</p>
                        <p className="text-xs text-gray-500">Hora</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedBooking.message && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                      Mensaje del Paciente
                    </h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedBooking.message}
                    </p>
                  </div>
                )}

                {/* Created At */}
                <div className="text-center text-xs text-gray-400">
                  Reserva creada el {new Date(selectedBooking.createdAt).toLocaleString('es-PE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Lima',
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
