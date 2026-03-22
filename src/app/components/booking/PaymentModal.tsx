'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CreditCard,
  Smartphone,
  Clock,
  Calendar,
  AlertTriangle,
  Loader2,
  CheckCircle,
  Shield,
} from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  booking: {
    id: string
    procedureName: string
    date: string
    timeSlot: string
    paymentDeadline?: string
  }
  onPaymentComplete: () => void
}

const CONSULTATION_PRICE = 50

// Componente de countdown
function CountdownTimer({
  expiresAt,
  onExpired
}: {
  expiresAt: Date
  onExpired: () => void
}) {
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number } | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference <= 0) {
        setIsExpired(true)
        onExpired()
        return null
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      return { minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      if (remaining === null) {
        clearInterval(timer)
      } else {
        setTimeLeft(remaining)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [expiresAt, onExpired])

  if (isExpired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <div>
          <p className="font-medium text-red-800 text-sm">Tiempo agotado</p>
          <p className="text-xs text-red-600">Tu reserva ha expirado</p>
        </div>
      </div>
    )
  }

  if (!timeLeft) return null

  const isLowTime = timeLeft.minutes < 5

  return (
    <div className={`rounded-xl p-3 flex items-center justify-between ${
      isLowTime ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'
    }`}>
      <div className="flex items-center gap-2">
        <Clock className={`w-5 h-5 ${isLowTime ? 'text-amber-600 animate-pulse' : 'text-blue-600'}`} />
        <span className={`text-sm font-medium ${isLowTime ? 'text-amber-800' : 'text-blue-800'}`}>
          Tiempo restante
        </span>
      </div>
      <div className={`text-xl font-bold tabular-nums ${isLowTime ? 'text-amber-800' : 'text-blue-800'}`}>
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  )
}

export default function PaymentModal({ isOpen, onClose, booking, onPaymentComplete }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [expired, setExpired] = useState(false)
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost')
  }, [])

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('')
      setSuccess(false)
      setExpired(false)
    }
  }, [isOpen])

  const handleExpired = useCallback(() => {
    setExpired(true)
    setError('Tu tiempo de reserva ha expirado. Por favor, crea una nueva reserva.')
  }, [])

  const handlePayment = async (paymentMethod: string, paymentReference?: string) => {
    if (expired) {
      setError('Tu tiempo de reserva ha expirado')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/bookings/${booking.id}/complete-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          paymentReference,
          paymentAmount: CONSULTATION_PRICE,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al procesar el pago')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        onPaymentComplete()
        onClose()
      }, 2000)
    } catch {
      setError('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSimulatedPayment = () => {
    setIsLoading(true)
    setTimeout(() => {
      handlePayment('simulated', `SIM-${Date.now()}`)
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Completar Pago</h2>
                <p className="text-white/80 text-sm">Consulta médica</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Success State */}
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Pago Completado!
                </h3>
                <p className="text-gray-600">
                  Tu cita ha sido confirmada exitosamente.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Countdown */}
                {booking.paymentDeadline && !expired && (
                  <CountdownTimer
                    expiresAt={new Date(booking.paymentDeadline)}
                    onExpired={handleExpired}
                  />
                )}

                {/* Booking Details */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <h3 className="font-semibold text-gray-800">{booking.procedureName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{booking.timeSlot}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="bg-primary/5 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Total a pagar</p>
                  <p className="text-3xl font-bold text-primary">S/. {CONSULTATION_PRICE}.00</p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Payment Buttons */}
                <div className={`space-y-3 ${expired ? 'opacity-50 pointer-events-none' : ''}`}>
                  {/* Card Payment */}
                  <button
                    onClick={() => handlePayment('card', `CARD-${Date.now()}`)}
                    disabled={isLoading || expired}
                    className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all disabled:opacity-50"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">Tarjeta de Crédito/Débito</p>
                      <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                    </div>
                  </button>

                  {/* Yape */}
                  <button
                    onClick={() => handlePayment('yape', `YAPE-${Date.now()}`)}
                    disabled={isLoading || expired}
                    className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all disabled:opacity-50"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">Yape</p>
                      <p className="text-sm text-gray-500">Pago rápido desde tu celular</p>
                    </div>
                  </button>

                  {/* Simulated Payment (Dev only) */}
                  {isDev && (
                    <div className="border-t-2 border-dashed border-orange-300 pt-4">
                      <button
                        onClick={handleSimulatedPayment}
                        disabled={isLoading || expired}
                        className="w-full flex items-center justify-center gap-2 p-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Simular Pago (Dev)
                          </>
                        )}
                      </button>
                      <p className="text-xs text-orange-600 text-center mt-2">
                        Solo visible en desarrollo
                      </p>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
                  <Shield className="w-4 h-4" />
                  <span>Pago 100% seguro y encriptado</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
