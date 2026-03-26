'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Search,
  Filter,
  X,
  CreditCard,
  CalendarCheck,
  CheckCircle,
  XCircle,
  TimerOff,
  CalendarPlus,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  LayoutList,
  LayoutGrid,
  Plus,
  RefreshCw,
  Tag,
  TrendingUp,
  Trash2,
} from 'lucide-react'
import PaymentModal from '@/app/components/booking/PaymentModal'
import { toast } from 'sonner'

interface Booking {
  id: string
  procedureName: string
  procedureCategory: string
  date: string
  timeSlot: string
  message?: string
  status: 'AWAITING_PAYMENT' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'EXPIRED'
  paymentDeadline?: string
  createdAt: string
}

type StatusFilter = 'ALL' | Booking['status']
type SortOption = 'NEWEST' | 'OLDEST' | 'UPCOMING' | 'PAST'
type ViewMode = 'LIST' | 'TIMELINE'

const ITEMS_PER_PAGE = 10

const statusConfig: Record<
  Booking['status'],
  { label: string; color: string; bg: string; icon: React.ElementType; dot: string }
> = {
  AWAITING_PAYMENT: {
    label: 'Por pagar',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    icon: CreditCard,
    dot: 'bg-orange-400',
  },
  PENDING: {
    label: 'Pendiente',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50 border-yellow-200',
    icon: CalendarCheck,
    dot: 'bg-yellow-400',
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
    icon: CalendarCheck,
    dot: 'bg-green-500',
  },
  CANCELLED: {
    label: 'Cancelada',
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
    icon: XCircle,
    dot: 'bg-red-400',
  },
  COMPLETED: {
    label: 'Completada',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    icon: CheckCircle,
    dot: 'bg-blue-500',
  },
  EXPIRED: {
    label: 'Expirada',
    color: 'text-gray-600',
    bg: 'bg-gray-50 border-gray-200',
    icon: TimerOff,
    dot: 'bg-gray-400',
  },
}

// PENDING quitado de los tabs de filtro
const filterTabs: { key: StatusFilter; label: string }[] = [
  { key: 'ALL', label: 'Todas' },
  { key: 'AWAITING_PAYMENT', label: 'Por pagar' },
  { key: 'CONFIRMED', label: 'Confirmadas' },
  { key: 'COMPLETED', label: 'Completadas' },
  { key: 'CANCELLED', label: 'Canceladas' },
  { key: 'EXPIRED', label: 'Expiradas' },
]

const sortOptions: { key: SortOption; label: string }[] = [
  { key: 'NEWEST', label: 'Más recientes primero' },
  { key: 'OLDEST', label: 'Más antiguas primero' },
  { key: 'UPCOMING', label: 'Próximas primero' },
  { key: 'PAST', label: 'Pasadas primero' },
]

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, type: 'spring' as const, stiffness: 300, damping: 28 },
  }),
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  index,
}: {
  label: string
  value: number
  icon: React.ElementType
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 300, damping: 28 }}
      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3"
    >
      <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800 leading-none">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const from = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const to = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

  // Build page numbers with ellipsis
  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100"
    >
      <p className="text-sm text-gray-500 order-2 sm:order-1">
        Mostrando <span className="font-medium text-gray-700">{from}–{to}</span> de{' '}
        <span className="font-medium text-gray-700">{totalItems}</span> reservas
      </p>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Prev */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page numbers */}
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-9 text-center text-gray-400 text-sm">
              ···
            </span>
          ) : (
            <motion.button
              key={page}
              whileTap={{ scale: 0.92 }}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                page === currentPage
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              {page}
            </motion.button>
          )
        )}

        {/* Next */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({
  booking,
  index,
  viewMode,
  onCancel,
  onPay,
  onDelete,
}: {
  booking: Booking
  index: number
  viewMode: ViewMode
  onCancel: (id: string) => void
  onPay: (booking: Booking) => void
  onDelete: (id: string) => void
}) {
  const config = statusConfig[booking.status]
  const StatusIcon = config.icon
  const isUpcoming = new Date(booking.date) > new Date()
  const canCancel = booking.status === 'CONFIRMED' && isUpcoming
  const canDelete = booking.status === 'CANCELLED' || booking.status === 'EXPIRED'
  const canPay =
    booking.status === 'AWAITING_PAYMENT' &&
    booking.paymentDeadline &&
    new Date(booking.paymentDeadline) > new Date()

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })

  const formatShortDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })

  const getGoogleCalendarLink = () => {
    const bookingDate = new Date(booking.date)
    const [hours, minutes] = booking.timeSlot.split(':').map(Number)

    // Lima es UTC-5 sin horario de verano. Convertir hora local Lima → UTC absoluto
    // Date.UTC maneja automáticamente el desbordamiento de día (ej: 20:00 Lima = 01:00+1d UTC)
    const startUTC = new Date(Date.UTC(
      bookingDate.getUTCFullYear(),
      bookingDate.getUTCMonth(),
      bookingDate.getUTCDate(),
      hours + 5,
      minutes,
      0
    ))
    const endUTC = new Date(startUTC.getTime() + 30 * 60 * 1000)

    const fmtUTC = (d: Date) => {
      const y = d.getUTCFullYear()
      const mo = String(d.getUTCMonth() + 1).padStart(2, '0')
      const da = String(d.getUTCDate()).padStart(2, '0')
      const h = String(d.getUTCHours()).padStart(2, '0')
      const mi = String(d.getUTCMinutes()).padStart(2, '0')
      return `${y}${mo}${da}T${h}${mi}00Z`
    }

    // Construcción manual de URL para evitar que URLSearchParams codifique el "/" en dates
    const text = encodeURIComponent(`Consulta: ${booking.procedureName} - Dr. Manuel Sinchi`)
    const details = encodeURIComponent(`Procedimiento: ${booking.procedureName}\nCategoría: ${booking.procedureCategory}${booking.message ? `\nNotas: ${booking.message}` : ''}\n\nCiruplástica - Dr. Manuel Sinchi\nTel: +51 961 360 074`)
    const location = encodeURIComponent('Av. Javier Prado Este 499, San Isidro, Lima, Perú')
    const dates = `${fmtUTC(startUTC)}/${fmtUTC(endUTC)}`

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`
  }

  // ── TIMELINE VIEW ──────────────────────────────────────────────────────────
  if (viewMode === 'TIMELINE') {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, x: -10, transition: { duration: 0.15 } }}
        layout
        className="flex gap-4"
      >
        <div className="flex flex-col items-center">
          <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${config.dot}`} />
          <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
        </div>

        <div className="pb-6 flex-1">
          <p className="text-xs text-gray-400 mb-1.5">{formatShortDate(booking.date)}</p>
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                {booking.procedureName}
              </h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} flex-shrink-0`}
              >
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {booking.timeSlot}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {booking.procedureCategory}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
              {canPay && (
                <button
                  onClick={() => onPay(booking)}
                  className="text-xs bg-orange-500 text-white px-2.5 py-1 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-1"
                >
                  <CreditCard className="w-3 h-3" />
                  Pagar
                </button>
              )}
              {booking.status === 'CONFIRMED' && isUpcoming && (
                <a
                  href={getGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <CalendarPlus className="w-3 h-3" />
                  Calendario
                </a>
              )}
              {canCancel && (
                <button
                  onClick={() => onCancel(booking.id)}
                  className="text-xs text-red-600 font-medium hover:underline ml-auto"
                >
                  Cancelar
                </button>
              )}
              {canDelete && (
                <button
                  onClick={() => onDelete(booking.id)}
                  className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1 ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
      layout
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Status + badge */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {config.label}
            </span>
            {isUpcoming && !['CANCELLED', 'EXPIRED'].includes(booking.status) && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                <TrendingUp className="w-3 h-3" />
                Próxima
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-primary transition-colors truncate">
            {booking.procedureName}
          </h3>
          <p className="text-xs text-gray-400 mb-3">{booking.procedureCategory}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formatDate(booking.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              {booking.timeSlot}
            </span>
          </div>

          {booking.message && (
            <p className="mt-2 text-sm text-gray-400 flex items-start gap-1.5">
              <FileText className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2 italic">{booking.message}</span>
            </p>
          )}

          {booking.status === 'AWAITING_PAYMENT' && booking.paymentDeadline && (
            <p className="mt-2 text-xs text-orange-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Pago vence:{' '}
              {new Date(booking.paymentDeadline).toLocaleTimeString('es-PE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
          {canPay && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onPay(booking)}
              className="flex items-center gap-1.5 text-sm bg-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              Completar pago
            </motion.button>
          )}
          {booking.status === 'CONFIRMED' && isUpcoming && (
            <motion.a
              whileHover={{ scale: 1.03 }}
              href={getGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary border border-primary/30 px-3 py-1.5 rounded-xl font-medium hover:bg-primary/5 transition-colors"
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar</span> Calendario
            </motion.a>
          )}
          {canCancel && (
            <button
              onClick={() => onCancel(booking.id)}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
            >
              Cancelar
            </button>
          )}
          {canDelete && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onDelete(booking.id)}
              className="flex items-center gap-1.5 text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-xl font-medium hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MisReservasPage() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Filters
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('NEWEST')
  const [viewMode, setViewMode] = useState<ViewMode>('LIST')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  // Modals
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false)
  const [deletingAll, setDeletingAll] = useState(false)
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null)

  const fetchBookings = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (session?.user) fetchBookings()
  }, [session])

  const handleCancel = async (id: string) => {
    setCancellingId(id)
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cancel: true }),
      })
      if (response.ok) {
        setBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: 'CANCELLED' as const } : b))
        )
        toast.success('Reserva cancelada', {
          description: 'Tu cita ha sido cancelada correctamente.',
        })
      } else {
        toast.error('No se pudo cancelar', {
          description: 'Inténtalo de nuevo o contacta soporte.',
        })
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
      toast.error('Error de conexión', {
        description: 'No se pudo completar la operación.',
      })
    } finally {
      setCancellingId(null)
      setShowCancelModal(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setBookings(prev => prev.filter(b => b.id !== id))
        setCurrentPage(prev => {
          const newTotal = bookings.length - 1
          const newMaxPage = Math.max(1, Math.ceil(newTotal / ITEMS_PER_PAGE))
          return Math.min(prev, newMaxPage)
        })
        toast.success('Reserva eliminada', {
          description: 'La reserva fue eliminada de tu historial.',
        })
      } else {
        toast.error('No se pudo eliminar', {
          description: 'Inténtalo de nuevo o contacta soporte.',
        })
      }
    } catch (error) {
      console.error('Error deleting booking:', error)
      toast.error('Error de conexión', {
        description: 'No se pudo completar la operación.',
      })
    } finally {
      setDeletingId(null)
      setShowDeleteModal(null)
    }
  }

  const handleDeleteAll = async () => {
    setDeletingAll(true)
    const toDelete = filteredBookings.filter(
      b => b.status === 'CANCELLED' || b.status === 'EXPIRED'
    )
    const label = statusFilter === 'EXPIRED' ? 'expiradas' : 'canceladas'
    try {
      const results = await Promise.allSettled(
        toDelete.map(b => fetch(`/api/bookings/${b.id}`, { method: 'DELETE' }))
      )
      const succeeded = results.filter(
        (r): r is PromiseFulfilledResult<Response> =>
          r.status === 'fulfilled' && r.value.ok
      )
      const deletedIds = new Set(
        toDelete
          .filter((_, i) => results[i].status === 'fulfilled' && (results[i] as PromiseFulfilledResult<Response>).value.ok)
          .map(b => b.id)
      )
      setBookings(prev => prev.filter(b => !deletedIds.has(b.id)))
      setCurrentPage(1)
      if (succeeded.length === toDelete.length) {
        toast.success(
          `${succeeded.length} reserva${succeeded.length !== 1 ? 's' : ''} ${label}${succeeded.length !== 1 ? 's' : ''} eliminada${succeeded.length !== 1 ? 's' : ''}`,
          { description: 'Tu historial ha sido limpiado.' }
        )
      } else {
        toast.warning(
          `${succeeded.length} de ${toDelete.length} reservas eliminadas`,
          { description: 'Algunas reservas no pudieron eliminarse.' }
        )
      }
    } catch (error) {
      console.error('Error deleting all bookings:', error)
      toast.error('Error al eliminar', {
        description: 'No se pudo completar la operación.',
      })
    } finally {
      setDeletingAll(false)
      setShowDeleteAllModal(false)
    }
  }

  // Stats (PENDING omitted since it's deprecated)
  const stats = useMemo(
    () => ({
      total: bookings.length,
      awaitingPayment: bookings.filter(b => b.status === 'AWAITING_PAYMENT').length,
      confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
      completed: bookings.filter(b => b.status === 'COMPLETED').length,
      cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
    }),
    [bookings]
  )

  // Filtered & sorted bookings
  const filteredBookings = useMemo(() => {
    let result = [...bookings]

    if (statusFilter !== 'ALL') {
      result = result.filter(b => b.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        b =>
          b.procedureName.toLowerCase().includes(q) ||
          b.procedureCategory.toLowerCase().includes(q)
      )
    }
    if (dateFrom) {
      result = result.filter(b => new Date(b.date) >= new Date(dateFrom))
    }
    if (dateTo) {
      result = result.filter(b => new Date(b.date) <= new Date(dateTo + 'T23:59:59'))
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'NEWEST':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'OLDEST':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'UPCOMING':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'PAST':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        default:
          return 0
      }
    })

    return result
  }, [bookings, statusFilter, searchQuery, sortBy, dateFrom, dateTo])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilter, searchQuery, sortBy, dateFrom, dateTo])

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / ITEMS_PER_PAGE))
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const hasActiveFilters = searchQuery || dateFrom || dateTo || statusFilter !== 'ALL'

  const clearFilters = () => {
    setSearchQuery('')
    setDateFrom('')
    setDateTo('')
    setStatusFilter('ALL')
  }

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="container-custom flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-gray-500">Cargando reservas...</p>
        </div>
      </div>
    )
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="container-custom pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 pt-2"
      >
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary leading-tight">
              Mis Reservas
            </h1>
            <p className="text-sm text-gray-500">
              {bookings.length} reserva{bookings.length !== 1 ? 's' : ''} en total
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
            onClick={() => fetchBookings(true)}
            disabled={refreshing}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          <Link
            href="/reservar"
            className="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva reserva</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats — PENDING quitado */}
      {bookings.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          <StatCard label="Total" value={stats.total} icon={Calendar} color="bg-gray-500" index={0} />
          <StatCard label="Por pagar" value={stats.awaitingPayment} icon={CreditCard} color="bg-orange-500" index={1} />
          <StatCard label="Confirmadas" value={stats.confirmed} icon={CalendarCheck} color="bg-green-500" index={2} />
          <StatCard label="Completadas" value={stats.completed} icon={CheckCircle} color="bg-blue-500" index={3} />
          <StatCard label="Canceladas" value={stats.cancelled} icon={XCircle} color="bg-red-400" index={4} />
        </div>
      )}

      {/* Search + Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por procedimiento..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Date filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters || dateFrom || dateTo
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Fechas</span>
            {(dateFrom || dateTo) && (
              <span className="ml-1 bg-white/30 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">
                {sortOptions.find(s => s.key === sortBy)?.label.split(' ')[0]}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden"
                >
                  {sortOptions.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => { setSortBy(opt.key); setShowSortDropdown(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                        sortBy === opt.key ? 'text-primary font-medium bg-primary/5' : 'text-gray-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View toggle */}
          <div className="hidden sm:flex items-center bg-gray-100 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('LIST')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'LIST' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Vista lista"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('TIMELINE')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'TIMELINE' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Vista cronológica"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Date range (collapsible) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Desde</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Hasta</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                {(dateFrom || dateTo) && (
                  <div className="flex items-end">
                    <button
                      onClick={() => { setDateFrom(''); setDateTo('') }}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                    >
                      Limpiar fechas
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Status tabs — PENDING no incluido */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide"
      >
        {filterTabs.map(tab => {
          const count =
            tab.key === 'ALL'
              ? bookings.length
              : bookings.filter(b => b.status === tab.key).length
          const isActive = statusFilter === tab.key
          return (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStatusFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              )}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Active filters banner */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5">
              <p className="text-sm text-primary font-medium">
                {filteredBookings.length} resultado{filteredBookings.length !== 1 ? 's' : ''} encontrado
                {filteredBookings.length !== 1 ? 's' : ''}
              </p>
              <button
                onClick={clearFilters}
                className="text-sm text-primary/70 hover:text-primary font-medium flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Eliminar todo — visible en filtro Canceladas o Expiradas con resultados */}
      <AnimatePresence>
        {(statusFilter === 'CANCELLED' || statusFilter === 'EXPIRED') && filteredBookings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-sm text-red-700 font-medium">
                {filteredBookings.length}{' '}
                reserva{filteredBookings.length !== 1 ? 's' : ''}{' '}
                {statusFilter === 'EXPIRED'
                  ? `expirada${filteredBookings.length !== 1 ? 's' : ''}`
                  : `cancelada${filteredBookings.length !== 1 ? 's' : ''}`}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDeleteAllModal(true)}
                className="flex items-center gap-1.5 text-sm text-red-600 font-medium border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Eliminar todas
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking list */}
      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-2xl border border-gray-100"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No tienes reservas</h3>
          <p className="text-gray-500 text-sm mb-6">Agenda tu primera consulta con el Dr. Sinchi</p>
          <Link href="/reservar" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Agendar Cita
          </Link>
        </motion.div>
      ) : filteredBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-2xl border border-gray-100"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Sin resultados</h3>
          <p className="text-gray-500 text-sm mb-4">
            No hay reservas que coincidan con los filtros aplicados
          </p>
          <button
            onClick={clearFilters}
            className="text-primary font-medium text-sm hover:underline flex items-center gap-1 mx-auto"
          >
            <X className="w-4 h-4" />
            Limpiar filtros
          </button>
        </motion.div>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`page-${currentPage}-${statusFilter}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={viewMode === 'LIST' ? 'space-y-3' : 'pl-2'}
            >
              {paginatedBookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  viewMode={viewMode}
                  onCancel={id => setShowCancelModal(id)}
                  onPay={setPaymentBooking}
                  onDelete={id => setShowDeleteModal(id)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredBookings.length}
            onPageChange={page => {
              setCurrentPage(page)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </>
      )}

      {/* ── Cancel modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCancelModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                ¿Cancelar reserva?
              </h3>
              <p className="text-center text-gray-500 text-sm mb-6">
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas cancelar esta cita?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Mantener
                </button>
                <button
                  onClick={() => handleCancel(showCancelModal)}
                  disabled={cancellingId === showCancelModal}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {cancellingId === showCancelModal ? 'Cancelando...' : 'Sí, cancelar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                ¿Eliminar reserva?
              </h3>
              <p className="text-center text-gray-500 text-sm mb-6">
                Se eliminará permanentemente de tu historial. Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Conservar
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  disabled={deletingId === showDeleteModal}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deletingId === showDeleteModal ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    'Sí, eliminar'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Delete ALL modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDeleteAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !deletingAll && setShowDeleteAllModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                ¿Eliminar todas las {statusFilter === 'EXPIRED' ? 'expiradas' : 'canceladas'}?
              </h3>
              <p className="text-center text-gray-500 text-sm mb-1">
                Se eliminarán permanentemente{' '}
                <span className="font-semibold text-gray-700">
                  {filteredBookings.length} reserva{filteredBookings.length !== 1 ? 's' : ''}
                </span>{' '}
                de tu historial.
              </p>
              <p className="text-center text-gray-400 text-xs mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteAllModal(false)}
                  disabled={deletingAll}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Conservar
                </button>
                <button
                  onClick={handleDeleteAll}
                  disabled={deletingAll}
                  className="flex-1 py-2.5 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deletingAll ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    'Sí, eliminar todas'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment modal */}
      {paymentBooking && (
        <PaymentModal
          isOpen={!!paymentBooking}
          onClose={() => setPaymentBooking(null)}
          booking={{
            id: paymentBooking.id,
            procedureName: paymentBooking.procedureName,
            date: paymentBooking.date,
            timeSlot: paymentBooking.timeSlot,
            paymentDeadline: paymentBooking.paymentDeadline,
          }}
          onPaymentComplete={() => {
            setPaymentBooking(null)
            fetchBookings(true)
          }}
        />
      )}

      {/* Click-away for sort dropdown */}
      {showSortDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
      )}
    </div>
  )
}
