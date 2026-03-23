'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard,
  Smartphone,
  MessageCircle,
  ChevronLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react'

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

type PaymentMethod = 'card' | 'yape' | 'whatsapp' | null

const WHATSAPP_NUMBER = '961360074'
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

    // Calcular inmediatamente
    setTimeLeft(calculateTimeLeft())

    // Actualizar cada segundo
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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState('')
  const [holdExpired, setHoldExpired] = useState(false)
  const [isDev, setIsDev] = useState(false)

  // Verificar modo desarrollo en el cliente
  useEffect(() => {
    setIsDev(IS_DEVELOPMENT || window.location.hostname === 'localhost')
  }, [])

  // Generar código corto de reserva (últimos 6 caracteres del ID)
  const bookingCode = bookingId.slice(-6).toUpperCase()

  const handleHoldExpired = useCallback(() => {
    setHoldExpired(true)
    setError('Tu tiempo de reserva ha expirado. Por favor, selecciona un nuevo horario.')
    if (onHoldExpired) {
      setTimeout(() => onHoldExpired(), 3000)
    }
  }, [onHoldExpired])

  // Función genérica para iniciar pago con Culqi
  const initCulqiPayment = async (enableYape: boolean) => {
    if (holdExpired) {
      setError('Tu tiempo de reserva ha expirado')
      return
    }

    setPaymentLoading(true)
    setError('')

    try {
      // Load Culqi.js if not loaded
      if (!(window as unknown as { Culqi?: CulqiType }).Culqi) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.culqi.com/js/v4'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Error al cargar Culqi'))
          document.body.appendChild(script)
        })
      }

      // Wait a bit for Culqi to initialize
      await new Promise(resolve => setTimeout(resolve, 500))

      // Configure Culqi
      const Culqi = (window as unknown as { Culqi: CulqiType }).Culqi
      Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || 'pk_test_90667d0a57d45c48'

      Culqi.settings({
        title: 'Ciruplástica',
        currency: 'PEN',
        amount: amount * 100, // Culqi uses cents
        order: `consulta-${Date.now()}`,
      })

      Culqi.options({
        lang: 'es',
        installments: false,
        paymentMethods: {
          tarjeta: !enableYape, // Solo tarjeta si no es Yape
          yape: enableYape,     // Solo Yape si enableYape es true
          bancaMovil: false,
          agente: false,
          billetera: false,
          cuotealo: false,
        },
      })

      // Set up global callback
      const paymentMethod = enableYape ? 'yape' : 'card'
      ;(window as unknown as { culqi: () => void }).culqi = async () => {
        const culqiInstance = (window as unknown as { Culqi: CulqiType }).Culqi
        if (culqiInstance.token) {
          try {
            const response = await fetch('/api/payments/culqi', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                token: culqiInstance.token.id,
                amount: amount * 100,
                description: `Consulta: ${procedureName}`,
              }),
            })

            const data = await response.json()

            if (response.ok) {
              onComplete(paymentMethod, data.chargeId)
            } else {
              setError(data.error || 'Error al procesar el pago')
              setPaymentLoading(false)
            }
          } catch {
            setError('Error de conexión al procesar el pago')
            setPaymentLoading(false)
          }
        } else {
          setError('No se pudo obtener el token de pago')
          setPaymentLoading(false)
        }
      }

      Culqi.open()
    } catch {
      setError('Error al iniciar el proceso de pago')
      setPaymentLoading(false)
    }
  }

  const handleCardPayment = () => initCulqiPayment(false)
  const handleYapePayment = () => initCulqiPayment(true)

  // WhatsApp ahora es para consultas, no para pagos
  const handleWhatsAppContact = () => {
    const formattedDate = parseLocalDate(date).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const message = encodeURIComponent(
`Hola, tengo una consulta sobre mi reserva de cita.

*CÓDIGO DE RESERVA:* ${bookingCode}
*Procedimiento:* ${procedureName}
*Fecha:* ${formattedDate}
*Hora:* ${timeSlot}

Mi consulta es:`
    )
    window.open(`https://wa.me/51${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <div className="space-y-6">
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
          <h3 className="font-semibold text-dark">Método de Pago</h3>
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
          <p>
            <span className="font-medium">Fecha:</span>{' '}
            {parseLocalDate(date).toLocaleDateString('es-PE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p>
            <span className="font-medium">Hora:</span> {timeSlot}
          </p>
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

      {/* Payment Methods - disabled if hold expired */}
      <div className={`space-y-3 ${holdExpired ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Card Payment */}
        <motion.button
          type="button"
          onClick={() => setSelectedMethod(selectedMethod === 'card' ? null : 'card')}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === 'card'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileTap={{ scale: 0.98 }}
          disabled={holdExpired}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-dark">Tarjeta de Crédito/Débito</p>
              <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedMethod === 'card' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedMethod === 'card' && (
                <CheckCircle className="w-full h-full text-white" />
              )}
            </div>
          </div>
        </motion.button>

        {/* Expanded Card */}
        <AnimatePresence>
          {selectedMethod === 'card' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  Serás redirigido a la pasarela segura de Culqi para completar tu pago.
                </p>
                <button
                  type="button"
                  onClick={handleCardPayment}
                  disabled={paymentLoading || holdExpired}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {paymentLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    'Pagar con Tarjeta'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Yape - Validación automática */}
        <motion.button
          type="button"
          onClick={() => setSelectedMethod(selectedMethod === 'yape' ? null : 'yape')}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === 'yape'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileTap={{ scale: 0.98 }}
          disabled={holdExpired}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-dark">Yape</p>
              <p className="text-sm text-gray-500">Pago rápido y validación automática</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedMethod === 'yape' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedMethod === 'yape' && (
                <CheckCircle className="w-full h-full text-white" />
              )}
            </div>
          </div>
        </motion.button>

        {/* Expanded Yape */}
        <AnimatePresence>
          {selectedMethod === 'yape' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-purple-800">Validación automática</p>
                    <p className="text-sm text-purple-600">Tu pago se verifica al instante</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Ingresa tu número de celular y aprueba el pago desde tu app de Yape.
                  No necesitas enviar comprobantes.
                </p>
                <button
                  type="button"
                  onClick={handleYapePayment}
                  disabled={paymentLoading || holdExpired}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {paymentLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    'Pagar con Yape'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp - Canal de consultas */}
        <div className="border-t border-gray-100 pt-3 mt-3">
          <p className="text-xs text-gray-500 text-center mb-3">¿Tienes dudas antes de pagar?</p>
          <button
            type="button"
            onClick={handleWhatsAppContact}
            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-dark">Contactar por WhatsApp</p>
                <p className="text-sm text-gray-500">Resuelve tus dudas antes de reservar</p>
              </div>
            </div>
          </button>
        </div>

        {/* MODO DESARROLLO: Botón de pago simulado */}
        {isDev && (
          <div className="border-t-2 border-dashed border-orange-300 pt-4 mt-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Modo Desarrollo</span>
              </div>
              <p className="text-xs text-orange-700 mb-3">
                Este botón solo aparece en desarrollo. Simula un pago exitoso sin procesar dinero real.
              </p>
              <button
                type="button"
                onClick={() => {
                  setPaymentLoading(true)
                  // Simular delay de procesamiento
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

      {/* Info */}
      <p className="text-xs text-center text-gray-500">
        Tu pago se valida automáticamente y recibirás confirmación inmediata de tu cita.
      </p>
    </div>
  )
}

// Culqi types
interface CulqiType {
  publicKey: string
  settings: (config: {
    title: string
    currency: string
    amount: number
    order: string
  }) => void
  options: (config: {
    lang: string
    installments: boolean
    paymentMethods: {
      tarjeta: boolean
      yape: boolean
      bancaMovil: boolean
      agente: boolean
      billetera: boolean
      cuotealo: boolean
    }
  }) => void
  open: () => void
  close: () => void
  token: {
    id: string
    email: string
  } | null
  error?: {
    user_message: string
    merchant_message: string
  }
}
