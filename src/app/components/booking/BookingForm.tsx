'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Calendar,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  LogIn,
  ArrowRight,
  ArrowLeft,
  Clock,
  XCircle,
  CreditCard,
  MapPin,
  Briefcase,
  Scale,
  Ruler
} from 'lucide-react'
import Link from 'next/link'
import PaymentStep from './PaymentStep'
import CalendlyStyleCalendar from './CalendlyStyleCalendar'

interface Procedure {
  id: string
  name: string
  category: string
  categoryLabel: string
}

interface BookingFormProps {
  procedures: Procedure[]
  preSelectedProcedure?: string
}

interface ExistingBooking {
  id: string
  date: string
  timeSlot: string
  procedureName: string
  paymentDeadline: string
}

const CONSULTATION_PRICE = 50

const DOCUMENT_TYPES = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'Carnet de Extranjería' },
  { value: 'PASSPORT', label: 'Pasaporte' },
]

const REFERRAL_SOURCES = [
  'Google',
  'Facebook',
  'Instagram',
  'TikTok',
  'YouTube',
  'Recomendación de un amigo/familiar',
  'Recomendación de otro doctor',
  'Publicidad en la calle',
  'Otro',
]

const PERU_CITIES = [
  'Lima',
  'Arequipa',
  'Trujillo',
  'Chiclayo',
  'Piura',
  'Cusco',
  'Iquitos',
  'Huancayo',
  'Tacna',
  'Pucallpa',
  'Chimbote',
  'Ica',
  'Ayacucho',
  'Cajamarca',
  'Otra ciudad',
]

export default function BookingForm({ procedures, preSelectedProcedure }: BookingFormProps) {
  const router = useRouter()
  const { status } = useSession()
  const [step, setStep] = useState(1)

  // Paso 1: Datos personales
  const [personalData, setPersonalData] = useState({
    birthDate: '',
    documentType: 'DNI',
    documentNumber: '',
    address: '',
    city: '',
    occupation: '',
  })

  // Paso 2: Datos de la cita
  const [appointmentData, setAppointmentData] = useState({
    procedureId: preSelectedProcedure || '',
    date: '',
    timeSlot: '',
    weight: '',
    height: '',
    referralSource: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Estado para la reserva creada
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [paymentDeadline, setPaymentDeadline] = useState<Date | null>(null)

  // Estado para reserva pendiente existente
  const [existingPendingBooking, setExistingPendingBooking] = useState<ExistingBooking | null>(null)
  const [isCancellingBooking, setIsCancellingBooking] = useState(false)

  const selectedProcedure = procedures.find(p => p.id === appointmentData.procedureId)
  const isAuthenticated = status === 'authenticated'

  // Restaurar datos del formulario desde sessionStorage al volver del login
  useEffect(() => {
    const savedBooking = sessionStorage.getItem('pendingBooking')
    if (savedBooking && isAuthenticated) {
      try {
        const parsed = JSON.parse(savedBooking)
        if (parsed.personalData) setPersonalData(parsed.personalData)
        if (parsed.appointmentData) setAppointmentData(parsed.appointmentData)
        if (parsed.step) setStep(parsed.step)
      } catch {
        // Ignorar errores de parsing
      }
    }
  }, [isAuthenticated])

  // Guardar datos del formulario en sessionStorage antes de redirigir
  const saveFormData = () => {
    sessionStorage.setItem('pendingBooking', JSON.stringify({ personalData, appointmentData, step }))
  }

  // Crear la reserva con estado AWAITING_PAYMENT
  const createBooking = useCallback(async () => {
    if (!selectedProcedure || !appointmentData.date || !appointmentData.timeSlot) return null

    setIsLoading(true)
    setError('')
    setExistingPendingBooking(null)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Datos personales
          birthDate: personalData.birthDate || undefined,
          documentType: personalData.documentType || undefined,
          documentNumber: personalData.documentNumber || undefined,
          address: personalData.address || undefined,
          city: personalData.city || undefined,
          occupation: personalData.occupation || undefined,
          // Datos de la cita
          procedureId: appointmentData.procedureId,
          procedureName: selectedProcedure.name,
          procedureCategory: selectedProcedure.category,
          date: appointmentData.date,
          timeSlot: appointmentData.timeSlot,
          weight: appointmentData.weight ? parseFloat(appointmentData.weight) : undefined,
          height: appointmentData.height ? parseFloat(appointmentData.height) : undefined,
          referralSource: appointmentData.referralSource || undefined,
          message: appointmentData.message || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Si hay una reserva pendiente existente, mostrar opciones
        if (data.existingBooking) {
          setExistingPendingBooking(data.existingBooking)
        } else {
          setError(data.error || 'Error al crear reserva')
        }
        return null
      }

      setBookingId(data.booking.id)
      setPaymentDeadline(new Date(data.paymentDeadline || data.booking.paymentDeadline))
      return data.booking
    } catch {
      setError('Error de conexión')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [selectedProcedure, personalData, appointmentData])

  // Cancelar reserva pendiente existente
  const cancelExistingBooking = async () => {
    if (!existingPendingBooking) return

    setIsCancellingBooking(true)
    setError('')

    try {
      const response = await fetch(`/api/bookings/${existingPendingBooking.id}/cancel`, {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al cancelar reserva')
        return
      }

      // Limpiar y permitir crear nueva reserva
      setExistingPendingBooking(null)
      // Intentar crear la nueva reserva automáticamente
      const booking = await createBooking()
      if (booking) {
        setStep(3)
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setIsCancellingBooking(false)
    }
  }

  // Continuar con el pago de la reserva existente
  const continueWithExistingBooking = () => {
    if (!existingPendingBooking) return

    setBookingId(existingPendingBooking.id)
    setPaymentDeadline(new Date(existingPendingBooking.paymentDeadline))
    setAppointmentData(prev => ({
      ...prev,
      date: existingPendingBooking.date.split('T')[0],
      timeSlot: existingPendingBooking.timeSlot,
    }))
    setExistingPendingBooking(null)
    setStep(3)
  }

  // Manejar selección de fecha y hora desde el calendario
  const handleDateTimeSelect = (date: string, timeSlot: string) => {
    setAppointmentData(prev => ({ ...prev, date, timeSlot }))
    setError('')
  }

  // Manejar expiración del deadline de pago
  const handlePaymentExpired = useCallback(async () => {
    setError('Tu tiempo de reserva ha expirado. Por favor, selecciona un nuevo horario.')
    setBookingId(null)
    setPaymentDeadline(null)
    setStep(1)
  }, [])

  // Validar paso 1
  const validateStep1 = () => {
    if (!personalData.birthDate) {
      setError('Por favor ingresa tu fecha de nacimiento')
      return false
    }
    if (!personalData.documentNumber) {
      setError('Por favor ingresa tu número de documento')
      return false
    }
    if (!personalData.address) {
      setError('Por favor ingresa tu dirección')
      return false
    }
    if (!personalData.city) {
      setError('Por favor selecciona tu ciudad')
      return false
    }
    return true
  }

  // Validar paso 2
  const validateStep2 = () => {
    if (!appointmentData.procedureId) {
      setError('Por favor selecciona un procedimiento')
      return false
    }
    if (!appointmentData.date || !appointmentData.timeSlot) {
      setError('Por favor selecciona fecha y hora')
      return false
    }
    return true
  }

  const handleStep1Continue = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateStep1()) return
    setStep(2)
  }

  const handleStep2Continue = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateStep2()) return

    // Si no está autenticado, mostrar prompt de login
    if (!isAuthenticated) {
      saveFormData()
      setShowLoginPrompt(true)
      return
    }

    // Crear la reserva con estado AWAITING_PAYMENT
    const booking = await createBooking()
    if (!booking) {
      return // Error ya manejado en createBooking
    }

    // Avanzar al paso de pago
    setStep(3)
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    }
  }

  const handlePaymentComplete = async (paymentMethod: string, paymentReference?: string) => {
    if (!bookingId) {
      setError('No hay reserva para completar')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/bookings/${bookingId}/complete-payment`, {
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

      // Limpiar datos guardados
      sessionStorage.removeItem('pendingBooking')
      setSuccess(true)
    } catch {
      setError('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }

  // Modal de reserva pendiente existente
  if (existingPendingBooking) {
    const existingDate = new Date(existingPendingBooking.date)
    const deadline = new Date(existingPendingBooking.paymentDeadline)
    const now = new Date()
    const minutesLeft = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / 1000 / 60))

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-dark mb-3">
          Ya tienes una reserva pendiente
        </h2>
        <p className="text-gray-600 mb-4">
          Tienes una reserva pendiente de pago que debes completar o cancelar antes de crear otra.
        </p>

        {/* Detalles de la reserva existente */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-dark mb-2">{existingPendingBooking.procedureName}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Fecha:</span>{' '}
              {existingDate.toLocaleDateString('es-PE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p>
              <span className="font-medium">Hora:</span> {existingPendingBooking.timeSlot}
            </p>
            <p className={`font-medium ${minutesLeft < 5 ? 'text-red-600' : 'text-amber-600'}`}>
              Tiempo restante para pagar: {minutesLeft} minutos
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            onClick={continueWithExistingBooking}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Continuar con el pago
          </button>
          <button
            onClick={cancelExistingBooking}
            disabled={isCancellingBooking}
            className="btn-secondary flex items-center justify-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
          >
            {isCancellingBooking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            Cancelar y crear nueva
          </button>
        </div>

        <button
          onClick={() => setExistingPendingBooking(null)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Volver al formulario
        </button>
      </motion.div>
    )
  }

  // Modal de login
  if (showLoginPrompt) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-dark mb-3">
          Inicia sesión para continuar
        </h2>
        <p className="text-gray-600 mb-6">
          Para confirmar tu reserva necesitas iniciar sesión o crear una cuenta.
          <br />
          <span className="text-sm text-gray-500">Tus datos de reserva se guardarán.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login?callbackUrl=/reservar"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Iniciar Sesión
          </Link>
          <Link
            href="/register?callbackUrl=/reservar"
            className="btn-secondary inline-flex items-center justify-center"
          >
            Crear Cuenta
          </Link>
        </div>
        <button
          onClick={() => setShowLoginPrompt(false)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Volver al formulario
        </button>
      </motion.div>
    )
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-dark mb-3">
          ¡Reserva Registrada!
        </h2>
        <p className="text-gray-600 mb-2">
          Tu cita para <strong>{selectedProcedure?.name}</strong> ha sido registrada.
        </p>
        <p className="text-gray-600 mb-6">
          Fecha: <strong>{new Date(appointmentData.date).toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> a las <strong>{appointmentData.timeSlot}</strong>
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            Tu pago será verificado y te contactaremos para confirmar tu cita en menos de 24 horas.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Ver mis reservas
          </button>
          <button
            onClick={() => {
              setSuccess(false)
              setStep(1)
              setBookingId(null)
              setPaymentDeadline(null)
              setPersonalData({ birthDate: '', documentType: 'DNI', documentNumber: '', address: '', city: '', occupation: '' })
              setAppointmentData({ procedureId: '', date: '', timeSlot: '', weight: '', height: '', referralSource: '', message: '' })
            }}
            className="btn-secondary"
          >
            Hacer otra reserva
          </button>
        </div>
      </motion.div>
    )
  }

  // Step indicators - 3 pasos
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {/* Paso 1 */}
      <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step > 1 ? 'bg-primary text-white' : step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {step > 1 ? <CheckCircle className="w-5 h-5" /> : <User className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium hidden sm:block">Datos</span>
      </div>

      <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />

      {/* Paso 2 */}
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step > 2 ? 'bg-primary text-white' : step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {step > 2 ? <CheckCircle className="w-5 h-5" /> : <Calendar className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium hidden sm:block">Cita</span>
      </div>

      <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />

      {/* Paso 3 */}
      <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          <CreditCard className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium hidden sm:block">Pago</span>
      </div>
    </div>
  )

  return (
    <div>
      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        {/* PASO 1: Datos Personales */}
        {step === 1 && (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleStep1Continue}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-dark">Datos Personales</h3>
                <p className="text-sm text-gray-500">Información requerida para tu cita</p>
              </div>
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

            {/* Fecha de nacimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                value={personalData.birthDate}
                onChange={(e) => setPersonalData({ ...personalData, birthDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              />
            </div>

            {/* Documento */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo doc. *
                </label>
                <select
                  value={personalData.documentType}
                  onChange={(e) => setPersonalData({ ...personalData, documentType: e.target.value })}
                  className="w-full px-3 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                >
                  {DOCUMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de documento *
                </label>
                <input
                  type="text"
                  value={personalData.documentNumber}
                  onChange={(e) => setPersonalData({ ...personalData, documentNumber: e.target.value })}
                  placeholder={personalData.documentType === 'DNI' ? '12345678' : 'Número'}
                  maxLength={personalData.documentType === 'DNI' ? 8 : 20}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Dirección *
              </label>
              <input
                type="text"
                value={personalData.address}
                onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
                placeholder="Av. Principal 123, Distrito"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <select
                value={personalData.city}
                onChange={(e) => setPersonalData({ ...personalData, city: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              >
                <option value="">Selecciona tu ciudad</option>
                {PERU_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Ocupación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Ocupación <span className="text-gray-400">(opcional)</span>
              </label>
              <input
                type="text"
                value={personalData.occupation}
                onChange={(e) => setPersonalData({ ...personalData, occupation: e.target.value })}
                placeholder="Ej: Ingeniero, Estudiante, Ama de casa..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Continue Button */}
            <motion.button
              type="submit"
              className="w-full btn-primary btn-shine py-4 text-base flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.form>
        )}

        {/* PASO 2: Datos de la Cita */}
        {step === 2 && (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleStep2Continue}
            className="space-y-5"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <button
                type="button"
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-dark">Datos de la Cita</h3>
                <p className="text-sm text-gray-500">Selecciona procedimiento, fecha y hora</p>
              </div>
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

            {/* Procedimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Procedimiento de interés *
              </label>
              <select
                value={appointmentData.procedureId}
                onChange={(e) => setAppointmentData({ ...appointmentData, procedureId: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              >
                <option value="">Selecciona un procedimiento</option>
                {Object.entries(
                  procedures.reduce((acc, p) => {
                    if (!acc[p.categoryLabel]) acc[p.categoryLabel] = []
                    acc[p.categoryLabel].push(p)
                    return acc
                  }, {} as Record<string, Procedure[]>)
                ).map(([category, procs]) => (
                  <optgroup key={category} label={category}>
                    {procs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Calendario estilo Calendly */}
            <div>
              <CalendlyStyleCalendar
                onSelectDateTime={handleDateTimeSelect}
                selectedDate={appointmentData.date}
                selectedTimeSlot={appointmentData.timeSlot}
              />
            </div>

            {/* Resumen de selección */}
            {appointmentData.date && appointmentData.timeSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-green-800 font-medium">Fecha y hora seleccionada</p>
                    <p className="text-green-700">
                      {new Date(appointmentData.date).toLocaleDateString('es-PE', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}{' '}
                      a las <strong>{appointmentData.timeSlot}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Peso y Talla */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Scale className="w-4 h-4 inline mr-1" />
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  value={appointmentData.weight}
                  onChange={(e) => setAppointmentData({ ...appointmentData, weight: e.target.value })}
                  placeholder="70"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Talla (cm)
                </label>
                <input
                  type="number"
                  step="1"
                  min="100"
                  max="250"
                  value={appointmentData.height}
                  onChange={(e) => setAppointmentData({ ...appointmentData, height: e.target.value })}
                  placeholder="170"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* ¿Cómo se enteró de nosotros? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo se enteró de nosotros?
              </label>
              <select
                value={appointmentData.referralSource}
                onChange={(e) => setAppointmentData({ ...appointmentData, referralSource: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">Selecciona una opción</option>
                {REFERRAL_SOURCES.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Mensaje adicional <span className="text-gray-400">(opcional)</span>
              </label>
              <textarea
                value={appointmentData.message}
                onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                rows={3}
                placeholder="Cuéntanos más sobre lo que buscas..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            {/* Price Preview */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Costo de la consulta</p>
                <p className="text-xs text-gray-500">Evaluación personalizada</p>
              </div>
              <p className="text-2xl font-bold text-primary">S/. {CONSULTATION_PRICE}</p>
            </div>

            {/* Continue Button */}
            <motion.button
              type="submit"
              disabled={!appointmentData.procedureId || !appointmentData.date || !appointmentData.timeSlot || isLoading}
              className="w-full btn-primary btn-shine py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reservando horario...
                </>
              ) : (
                <>
                  Continuar al Pago
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        )}

        {/* PASO 3: Pago */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <PaymentStep
              procedureName={selectedProcedure?.name || ''}
              amount={CONSULTATION_PRICE}
              date={appointmentData.date}
              timeSlot={appointmentData.timeSlot}
              bookingId={bookingId || ''}
              onBack={handleBack}
              onComplete={handlePaymentComplete}
              isLoading={isLoading}
              holdExpiresAt={paymentDeadline}
              onHoldExpired={handlePaymentExpired}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
