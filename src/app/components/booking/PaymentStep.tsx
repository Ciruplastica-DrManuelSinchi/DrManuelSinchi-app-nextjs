'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  CreditCard,
  Smartphone,
  MessageCircle,
  ChevronLeft,
  Loader2,
  CheckCircle,
  Copy,
  AlertCircle,
} from 'lucide-react'

interface PaymentStepProps {
  procedureName: string
  amount: number
  date: string
  timeSlot: string
  onBack: () => void
  onComplete: (paymentMethod: string, paymentReference?: string) => void
  isLoading: boolean
}

type PaymentMethod = 'culqi' | 'yape' | 'whatsapp' | null

const YAPE_NUMBER = '961360074'
const CONSULTATION_PRICE = 50

export default function PaymentStep({
  procedureName,
  amount = CONSULTATION_PRICE,
  date,
  timeSlot,
  onBack,
  onComplete,
  isLoading,
}: PaymentStepProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [copied, setCopied] = useState(false)
  const [culqiLoading, setCulqiLoading] = useState(false)
  const [error, setError] = useState('')

  const copyYapeNumber = () => {
    navigator.clipboard.writeText(YAPE_NUMBER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCulqiPayment = async () => {
    setCulqiLoading(true)
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
          tarjeta: true,
          yape: false,
          bancaMovil: false,
          agente: false,
          billetera: false,
          cuotealo: false,
        },
      })

      // Set up global callback
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
              onComplete('culqi', data.chargeId)
            } else {
              setError(data.error || 'Error al procesar el pago')
              setCulqiLoading(false)
            }
          } catch {
            setError('Error de conexión al procesar el pago')
            setCulqiLoading(false)
          }
        } else {
          setError('No se pudo obtener el token de pago')
          setCulqiLoading(false)
        }
      }

      Culqi.open()
    } catch {
      setError('Error al iniciar el proceso de pago')
      setCulqiLoading(false)
    }
  }

  const handleYapeConfirm = () => {
    onComplete('yape', `Yape a ${YAPE_NUMBER}`)
  }

  const handleWhatsAppPayment = () => {
    const formattedDate = new Date(date).toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    const message = encodeURIComponent(
      `Hola, me gustaría reservar una consulta de ${procedureName} para el ${formattedDate} a las ${timeSlot}. ¿Me pueden ayudar con el proceso de pago?`
    )
    window.open(`https://wa.me/51${YAPE_NUMBER}?text=${message}`, '_blank')
    onComplete('whatsapp', 'Contacto por WhatsApp')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
        <button
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

      {/* Payment Methods */}
      <div className="space-y-3">
        {/* Culqi - Card Payment */}
        <motion.button
          onClick={() => setSelectedMethod(selectedMethod === 'culqi' ? null : 'culqi')}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === 'culqi'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileTap={{ scale: 0.98 }}
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
              selectedMethod === 'culqi' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedMethod === 'culqi' && (
                <CheckCircle className="w-full h-full text-white" />
              )}
            </div>
          </div>
        </motion.button>

        {/* Expanded Culqi */}
        <AnimatePresence>
          {selectedMethod === 'culqi' && (
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
                  onClick={handleCulqiPayment}
                  disabled={culqiLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {culqiLoading ? (
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

        {/* Yape */}
        <motion.button
          onClick={() => setSelectedMethod(selectedMethod === 'yape' ? null : 'yape')}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === 'yape'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-dark">Yape</p>
              <p className="text-sm text-gray-500">Pago rápido con Yape</p>
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
                <div className="flex flex-col items-center mb-4">
                  {/* QR Code placeholder - replace with actual QR */}
                  <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center mb-3 border-2 border-purple-200">
                    <Image
                      src="/images/yape-qr.png"
                      alt="QR Yape"
                      width={150}
                      height={150}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = '<span class="text-gray-400 text-sm text-center">QR no disponible<br/>Usa el número</span>'
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">O yapea al número:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-purple-700">{YAPE_NUMBER}</span>
                    <button
                      onClick={copyYapeNumber}
                      className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Copiar número"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-purple-600" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mb-4">
                  Después de yapear, haz clic en &quot;Confirmar Pago&quot; para continuar.
                </p>
                <button
                  onClick={handleYapeConfirm}
                  disabled={isLoading}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    'Confirmar Pago con Yape'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp - Contacto directo */}
        <motion.button
          onClick={() => setSelectedMethod(selectedMethod === 'whatsapp' ? null : 'whatsapp')}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedMethod === 'whatsapp'
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-dark">Pagar por WhatsApp</p>
              <p className="text-sm text-gray-500">Coordina tu pago directamente con nosotros</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedMethod === 'whatsapp' ? 'border-primary bg-primary' : 'border-gray-300'
            }`}>
              {selectedMethod === 'whatsapp' && (
                <CheckCircle className="w-full h-full text-white" />
              )}
            </div>
          </div>
        </motion.button>

        {/* Expanded WhatsApp */}
        <AnimatePresence>
          {selectedMethod === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-4">
                  Si prefieres coordinar el pago directamente con nosotros,
                  contáctanos por WhatsApp y te guiaremos en el proceso.
                </p>
                <button
                  onClick={handleWhatsAppPayment}
                  disabled={isLoading}
                  className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <p className="text-xs text-center text-gray-500">
        Tu pago será verificado y recibirás confirmación de tu cita en menos de 24 horas.
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
