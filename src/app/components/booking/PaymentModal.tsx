'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Smartphone,
  Clock,
  Calendar,
  AlertTriangle,
  Loader2,
  CheckCircle,
  Building2,
  Copy,
  MessageCircle,
} from 'lucide-react'
import Image from 'next/image'

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
const WHATSAPP_NUMBER = '961360074'

const BANK_INFO = {
  yapeNumber: '961360074',
  yapeName: 'Manuel Sinchi',
  bankName: 'BCP',
  accountNumber: 'XXXX-XXXX-XXXX-XXXX',
  cci: 'XXX-XXX-XXXXXXXXXX-XX',
  accountHolder: 'Manuel Sinchi Castañeda',
}

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

      return {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      if (remaining === null) clearInterval(timer)
      else setTimeLeft(remaining)
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="p-1 hover:bg-gray-200 rounded transition-colors"
    >
      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

export default function PaymentModal({ isOpen, onClose, booking, onPaymentComplete }: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [expired, setExpired] = useState(false)
  const [selectedTab, setSelectedTab] = useState<'yape' | 'transfer'>('yape')

  useEffect(() => {
    if (isOpen) { setError(''); setSuccess(false); setExpired(false) }
  }, [isOpen])

  const handleExpired = useCallback(() => {
    setExpired(true)
    setError('Tu tiempo de reserva ha expirado. Por favor, crea una nueva reserva.')
  }, [])

  const bookingCode = booking.id.slice(-6).toUpperCase()

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-PE', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

  const handleConfirmPayment = async () => {
    if (expired) { setError('Tu tiempo de reserva ha expirado'); return }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/bookings/${booking.id}/complete-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: selectedTab === 'yape' ? 'yape' : 'whatsapp',
          paymentReference: `MANUAL-${Date.now()}`,
          paymentAmount: CONSULTATION_PRICE,
        }),
      })

      const data = await response.json()
      if (!response.ok) { setError(data.error || 'Error al procesar el pago'); return }

      setSuccess(true)

      // Abrir WhatsApp
      const message = encodeURIComponent(
`Hola, ya realicé el pago de mi consulta.

*CÓDIGO DE RESERVA:* ${bookingCode}
*Procedimiento:* ${booking.procedureName}
*Fecha:* ${formatDate(booking.date)}
*Hora:* ${booking.timeSlot}
*Monto:* S/. ${CONSULTATION_PRICE}.00
*Método:* ${selectedTab === 'yape' ? 'Yape' : 'Transferencia bancaria'}

Por favor, verificar mi pago. ¡Gracias!`
      )
      window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank')

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
          className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Completar Pago</h2>
                <p className="text-white/80 text-sm">Consulta médica</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {success ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Pago Registrado!</h3>
                <p className="text-gray-600">Un administrador verificará tu pago y confirmará tu cita.</p>
              </motion.div>
            ) : (
              <>
                {booking.paymentDeadline && !expired && (
                  <CountdownTimer expiresAt={new Date(booking.paymentDeadline)} onExpired={handleExpired} />
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

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className={expired ? 'opacity-50 pointer-events-none' : ''}>
                  {/* Tabs */}
                  <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
                    <button type="button" onClick={() => setSelectedTab('yape')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTab === 'yape' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500'
                      }`}>
                      <Smartphone className="w-4 h-4" /> Yape
                    </button>
                    <button type="button" onClick={() => setSelectedTab('transfer')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTab === 'transfer' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'
                      }`}>
                      <Building2 className="w-4 h-4" /> Transferencia
                    </button>
                  </div>

                  {selectedTab === 'yape' ? (
                    <div className="bg-purple-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-center">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                          <div className="w-36 h-36 relative">
                            <Image src="/images/yape-qr.png" alt="QR Yape" fill className="object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Yapea al</p>
                          <p className="font-bold text-purple-800">{BANK_INFO.yapeNumber}</p>
                        </div>
                        <CopyButton text={BANK_INFO.yapeNumber} />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-xl p-4 space-y-3">
                      <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
                        <div><span className="text-gray-500">Banco:</span> <span className="font-medium">{BANK_INFO.bankName}</span></div>
                        <div className="flex items-center justify-between">
                          <div><span className="text-gray-500">Cuenta:</span> <span className="font-mono font-medium">{BANK_INFO.accountNumber}</span></div>
                          <CopyButton text={BANK_INFO.accountNumber} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div><span className="text-gray-500">CCI:</span> <span className="font-mono font-medium">{BANK_INFO.cci}</span></div>
                          <CopyButton text={BANK_INFO.cci} />
                        </div>
                        <div><span className="text-gray-500">Titular:</span> <span className="font-medium">{BANK_INFO.accountHolder}</span></div>
                      </div>
                    </div>
                  )}

                  {/* Confirm Button */}
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isLoading || expired}
                    className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Registrando...</>
                    ) : (
                      <><MessageCircle className="w-5 h-5" /> Sí, ya pagué. ¡Verifícalo!</>
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Se abrirá WhatsApp para notificar tu pago.
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
