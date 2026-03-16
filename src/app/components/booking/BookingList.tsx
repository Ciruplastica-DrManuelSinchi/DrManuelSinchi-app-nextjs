'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, FileText, AlertTriangle, CheckCircle, XCircle, Hourglass } from 'lucide-react'

interface Booking {
  id: string
  procedureName: string
  procedureCategory: string
  date: string
  timeSlot: string
  message?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
  createdAt: string
}

interface BookingListProps {
  bookings: Booking[]
  onCancelBooking?: (id: string) => Promise<void>
}

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Hourglass,
  },
  CONFIRMED: {
    label: 'Confirmada',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  CANCELLED: {
    label: 'Cancelada',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
  },
  COMPLETED: {
    label: 'Completada',
    color: 'bg-blue-100 text-blue-800',
    icon: CheckCircle,
  },
}

export default function BookingList({ bookings, onCancelBooking }: BookingListProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!onCancelBooking) return
    setCancellingId(id)
    try {
      await onCancelBooking(id)
    } finally {
      setCancellingId(null)
      setShowCancelModal(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No tienes reservas
        </h3>
        <p className="text-gray-500 text-sm">
          Agenda tu primera consulta para comenzar
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const status = statusConfig[booking.status]
          const StatusIcon = status.icon
          const canCancel = ['PENDING', 'CONFIRMED'].includes(booking.status) && isUpcoming(booking.date)

          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-soft hover:shadow-medium transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-dark">
                      {booking.procedureName}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
                    <p className="mt-2 text-sm text-gray-500 flex items-start gap-1.5">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{booking.message}</span>
                    </p>
                  )}
                </div>

                {canCancel && onCancelBooking && (
                  <button
                    onClick={() => setShowCancelModal(booking.id)}
                    disabled={cancellingId === booking.id}
                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Modal de confirmación */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowCancelModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-elevation-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-center text-dark mb-2">
                ¿Cancelar reserva?
              </h3>
              <p className="text-center text-gray-600 text-sm mb-6">
                Esta acción no se puede deshacer. ¿Estás seguro de que deseas cancelar esta cita?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  No, mantener
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
    </>
  )
}
