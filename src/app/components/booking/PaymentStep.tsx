'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone,
  MessageCircle,
  ChevronLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  AlertTriangle,
  Building2,
  Copy,
} from 'lucide-react'
import Image from 'next/image'

// Parse "YYYY-MM-DD" as a local date (not UTC midnight)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

interface PaymentStepProps {
  procedureName: string
  amount: number
  date: string
  timeSlot: string
  bookingId: string
  onBack: () => void
  onComplete: (paymentMethod: string, paymentReference?: string) => void
  isLoading: boolean
  holdExpiresAt?: Date | null
  onHoldExpired?: () => void
}

const WHATSAPP_NUMBER = '961360074'
const CONSULTATION_PRICE = 50

// Datos bancarios (el admin puede actualizar estos valores)
const BANK_INFO = {
  yapeNumber: '961360074',
  yapeName: 'Manuel Sinchi',
  bankName: 'BCP',
  accountNumber: 'XXXX-XXXX-XXXX-XXXX', // ponytail: placeholder, el admin debe actualizar
  cci: 'XXX-XXX-XXXXXXXXXX-XX',
  accountHolder: 'Manuel Sinchi Castañeda',
}

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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="font-medium text-red-800">Tiempo agotado</p>
          <p className="text-sm text-red-600">Tu reserva temporal ha expirado</p>
        </div>
      </motion.div>
    )
  }

  if (!timeLeft) return null

  const isLowTime = timeLeft.minutes < 5
  const bgColor = isLowTime ? 'bg-amber-50' : 'bg-blue-50'
  const borderColor = isLowTime ? 'border-amber-200' : 'border-blue-200'
  const textColor = isLowTime ? 'text-amber-800' : 'text-blue-800'
  const subTextColor = isLowTime ? 'text-amber-600' : 'text-blue-600'
  const iconBg = isLowTime ? 'bg-amber-100' : 'bg-blue-100'
  const iconColor = isLowTime ? 'text-amber-600' : 'text-blue-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${bgColor} border ${borderColor} rounded-xl p-4 flex items-center gap-3`}
    >
      <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
        <Clock className={`w-5 h-5 ${iconColor} ${isLowTime ? 'animate-pulse' : ''}`} />
      </div>
      <div className="flex-1">
        <p className={`font-medium ${textColor}`}>Tiempo para completar el pago</p>
        <p className={`text-sm ${subTextColor}`}>
          Tu horario está reservado temporalmente
        </p>
      </div>
      <div className={`text-2xl font-bold ${textColor} tabular-nums`}>
        {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </motion.div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1 hover:bg-gray-200 rounded transition-colors"
      title="Copiar"
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  )
}

// Verificar si estamos en modo desarrollo
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export default function PaymentStep({
  procedureName,
  amount = CONSULTATION_PRICE,
  date,
  timeSlot,
  bookingId,
  onBack,
  onComplete,
  isLoading,
  holdExpiresAt,
  onHoldExpired,
}: PaymentStepProps) {
  const [selectedTab, setSelectedTab] = useState<'yape' | 'transfer'>('yape')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState('')
  const [holdExpired, setHoldExpired] = useState(false)
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    setIsDev(IS_DEVELOPMENT || window.location.hostname === 'localhost')
  }, [])

  const bookingCode = bookingId.slice(-6).toUpperCase()

  const handleHoldExpired = useCallback(() => {
    setHoldExpired(true)
    setError('Tu tiempo de reserva ha expirado. Por favor, selecciona un nuevo horario.')
    if (onHoldExpired) {
      setTimeout(() => onHoldExpired(), 3000)
    }
  }, [onHoldExpired])

  const formattedDate = parseLocalDate(date).toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // "Ya pagué" → registra el pago como pendiente de verificación y abre WhatsApp
  const handleConfirmPayment = async () => {
    if (holdExpired) {
      setError('Tu tiempo de reserva ha expirado')
      return
    }

    setPaymentLoading(true)
    setError('')

    try {
      // Registrar en la plataforma como pendiente de verificación
      const paymentMethod = selectedTab === 'yape' ? 'yape' : 'whatsapp'
      onComplete(paymentMethod, `MANUAL-${Date.now()}`)
    } finally {
      setPaymentLoading(false)
    }

    // Abrir WhatsApp con el mensaje de confirmación
    const message = encodeURIComponent(
`Hola, ya realicé el pago de mi consulta.

*CÓDIGO DE RESERVA:* ${bookingCode}
*Procedimiento:* ${procedureName}
*Fecha:* ${formattedDate}
*Hora:* ${timeSlot}
*Monto:* S/. ${amount}.00
*Método:* ${selectedTab === 'yape' ? 'Yape' : 'Transferencia bancaria'}

Por favor, verificar mi pago. ¡Gracias!`
    )
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={isLoading}
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h3 className="font-semibold text-dark">Realizar Pago</h3>
          <p className="text-sm text-gray-500">Consulta: {procedureName}</p>
        </div>
      </div>

      {/* Countdown Timer */}
      {holdExpiresAt && !holdExpired && (
        <CountdownTimer
          expiresAt={holdExpiresAt}
          onExpired={handleHoldExpired}
        />
      )}

      {/* Reservation Details */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium text-dark">Detalles de tu cita</span>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Código:</span> {bookingCode}</p>
          <p><span className="font-medium">Fecha:</span> {formattedDate}</p>
          <p><span className="font-medium">Hora:</span> {timeSlot}</p>
        </div>
      </div>

      {/* Amount */}
      <div className="bg-primary/5 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-600 mb-1">Monto a pagar</p>
        <p className="text-3xl font-bold text-primary">S/. {amount}.00</p>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Payment Methods Tabs */}
      <div className={holdExpired ? 'opacity-50 pointer-events-none' : ''}>
        <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
          <button
            type="button"
            onClick={() => setSelectedTab('yape')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'yape'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Yape
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('transfer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              selectedTab === 'transfer'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Transferencia
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Yape Tab */}
          {selectedTab === 'yape' && (
            <motion.div
              key="yape"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-purple-50 rounded-xl p-5 space-y-4"
            >
              <div className="text-center">
                <h4 className="font-semibold text-purple-800 mb-1">Paga con Yape</h4>
                <p className="text-sm text-purple-600">Escanea el código QR o yapea al número</p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="w-48 h-48 relative">
                    <Image
                      src="/images/yape-qr.png"
                      alt="Código QR de Yape"
                      fill
                      className="object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Número de Yape */}
              <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Número de Yape</p>
                  <p className="font-bold text-purple-800 text-lg">{BANK_INFO.yapeNumber}</p>
                  <p className="text-xs text-gray-500">{BANK_INFO.yapeName}</p>
                </div>
                <CopyButton text={BANK_INFO.yapeNumber} />
              </div>

              <div className="bg-purple-100/50 rounded-lg p-3 text-xs text-purple-700">
                <p className="font-medium mb-1">Importante:</p>
                <p>Monto exacto: <strong>S/. {amount}.00</strong></p>
              </div>
            </motion.div>
          )}

          {/* Transfer Tab */}
          {selectedTab === 'transfer' && (
            <motion.div
              key="transfer"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-blue-50 rounded-xl p-5 space-y-4"
            >
              <div className="text-center">
                <h4 className="font-semibold text-blue-800 mb-1">Transferencia Bancaria</h4>
                <p className="text-sm text-blue-600">Realiza una transferencia a la siguiente cuenta</p>
              </div>

              <div className="bg-white rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Banco</p>
                    <p className="font-medium text-gray-800">{BANK_INFO.bankName}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">N° de cuenta</p>
                    <p className="font-mono font-medium text-gray-800">{BANK_INFO.accountNumber}</p>
                  </div>
                  <CopyButton text={BANK_INFO.accountNumber} />
                </div>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">CCI (interbancario)</p>
                    <p className="font-mono font-medium text-gray-800">{BANK_INFO.cci}</p>
                  </div>
                  <CopyButton text={BANK_INFO.cci} />
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500">Titular</p>
                  <p className="font-medium text-gray-800">{BANK_INFO.accountHolder}</p>
                </div>
              </div>

              <div className="bg-blue-100/50 rounded-lg p-3 text-xs text-blue-700">
                <p className="font-medium mb-1">Importante:</p>
                <p>Monto exacto: <strong>S/. {amount}.00</strong></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón principal: Ya pagué */}
        <motion.button
          type="button"
          onClick={handleConfirmPayment}
          disabled={paymentLoading || holdExpired || isLoading}
          className="w-full mt-5 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base shadow-lg shadow-green-600/20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {paymentLoading || isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Registrando pago...
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              Sí, ya pagué. ¡Verifícalo!
            </>
          )}
        </motion.button>

        <p className="text-xs text-center text-gray-500 mt-2">
          Se abrirá WhatsApp para notificar tu pago. Un administrador verificará y confirmará tu cita.
        </p>

        {/* MODO DESARROLLO: Botón de pago simulado */}
        {isDev && (
          <div className="border-t-2 border-dashed border-orange-300 pt-4 mt-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Modo Desarrollo</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPaymentLoading(true)
                  setTimeout(() => {
                    onComplete('simulated', `SIM-${Date.now()}`)
                    setPaymentLoading(false)
                  }, 1500)
                }}
                disabled={paymentLoading || holdExpired}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Simulando pago...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Simular Pago Exitoso (Dev)
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
