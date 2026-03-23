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
import { useTranslations } from 'next-intl'
import PaymentStep from './PaymentStep'
import CalendlyStyleCalendar from './CalendlyStyleCalendar'

// Parse "YYYY-MM-DD" as a local date (not UTC midnight)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

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
]

export default function BookingForm({ procedures, preSelectedProcedure }: BookingFormProps) {
  const t = useTranslations('booking')
  const router = useRouter()
  const { status } = useSession()
  const [step, setStep] = useState(1)

  const DOCUMENT_TYPES = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: t('documentTypes.CE') },
    { value: 'PASSPORT', label: t('documentTypes.PASSPORT') },
  ]

  const REFERRAL_SOURCES = [
    'Google',
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    t('referralSources.friendRecommendation'),
    t('referralSources.doctorRecommendation'),
    t('referralSources.streetAdvertising'),
    t('referralSources.other'),
  ]

  const OTHER_CITY = 'Otra ciudad'

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
          birthDate: personalData.birthDate || undefined,
          documentType: personalData.documentType || undefined,
          documentNumber: personalData.documentNumber || undefined,
          address: personalData.address || undefined,
          city: personalData.city || undefined,
          occupation: personalData.occupation || undefined,
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
        if (data.existingBooking) {
          setExistingPendingBooking(data.existingBooking)
        } else {
          setError(data.error || t('errors.createError'))
        }
        return null
      }

      setBookingId(data.booking.id)
      setPaymentDeadline(new Date(data.paymentDeadline || data.booking.paymentDeadline))
      return data.booking
    } catch {
      setError(t('errors.connectionError'))
      return null
    } finally {
      setIsLoading(false)
    }
  }, [selectedProcedure, personalData, appointmentData, t])

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
        setError(data.error || t('errors.cancelError'))
        return
      }

      setExistingPendingBooking(null)
      const booking = await createBooking()
      if (booking) {
        setStep(3)
      }
    } catch {
      setError(t('errors.connectionError'))
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

  const handleDateTimeSelect = (date: string, timeSlot: string) => {
    setAppointmentData(prev => ({ ...prev, date, timeSlot }))
    setError('')
  }

  const handlePaymentExpired = useCallback(async () => {
    setError(t('errors.paymentExpired'))
    setBookingId(null)
    setPaymentDeadline(null)
    setStep(1)
  }, [t])

  // Validar paso 1
  const validateStep1 = () => {
    if (!personalData.birthDate) {
      setError(t('errors.birthDate'))
      return false
    }
    if (!personalData.documentNumber) {
      setError(t('errors.documentNumber'))
      return false
    }
    if (!personalData.address) {
      setError(t('errors.address'))
      return false
    }
    if (!personalData.city) {
      setError(t('errors.city'))
      return false
    }
    return true
  }

  // Validar paso 2
  const validateStep2 = () => {
    if (!appointmentData.procedureId) {
      setError(t('errors.procedure'))
      return false
    }
    if (!appointmentData.date || !appointmentData.timeSlot) {
      setError(t('errors.dateTime'))
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

    if (!isAuthenticated) {
      saveFormData()
      setShowLoginPrompt(true)
      return
    }

    const booking = await createBooking()
    if (!booking) {
      return
    }

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
      setError(t('errors.noBooking'))
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
        setError(data.error || t('errors.paymentError'))
        return
      }

      sessionStorage.removeItem('pendingBooking')
      setSuccess(true)
    } catch {
      setError(t('errors.connectionError'))
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
          {t('existingBooking.title')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('existingBooking.description')}
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left max-w-md mx-auto">
          <h3 className="font-semibold text-dark mb-2">{existingPendingBooking.procedureName}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">{t('existingBooking.date')}:</span>{' '}
              {existingDate.toLocaleDateString('es-PE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p>
              <span className="font-medium">{t('existingBooking.time')}:</span> {existingPendingBooking.timeSlot}
            </p>
            <p className={`font-medium ${minutesLeft < 5 ? 'text-red-600' : 'text-amber-600'}`}>
              {t('existingBooking.timeLeft', { minutes: minutesLeft })}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button
            onClick={continueWithExistingBooking}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            {t('existingBooking.continuePayment')}
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
            {t('existingBooking.cancelNew')}
          </button>
        </div>

        <button
          onClick={() => setExistingPendingBooking(null)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {t('existingBooking.backToForm')}
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
          {t('loginPrompt.title')}
        </h2>
        <p className="text-gray-600 mb-6">
          {t('loginPrompt.description')}
          <br />
          <span className="text-sm text-gray-500">{t('loginPrompt.savedData')}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login?callbackUrl=/reservar"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {t('loginPrompt.signIn')}
          </Link>
          <Link
            href="/register?callbackUrl=/reservar"
            className="btn-secondary inline-flex items-center justify-center"
          >
            {t('loginPrompt.createAccount')}
          </Link>
        </div>
        <button
          onClick={() => setShowLoginPrompt(false)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {t('loginPrompt.backToForm')}
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
          {t('success.title')}
        </h2>
        <p className="text-gray-600 mb-2">
          {t('success.yourAppointmentFor')} <strong>{selectedProcedure?.name}</strong> {t('success.hasBeenRegistered')}
        </p>
        <p className="text-gray-600 mb-6">
          {t('success.date')}: <strong>{parseLocalDate(appointmentData.date).toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> {t('success.at')} <strong>{appointmentData.timeSlot}</strong>
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            {t('success.verificationNotice')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            {t('success.viewBookings')}
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
            {t('success.makeAnother')}
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
        <span className="text-sm font-medium hidden sm:block">{t('steps.data')}</span>
      </div>

      <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />

      {/* Paso 2 */}
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step > 2 ? 'bg-primary text-white' : step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          {step > 2 ? <CheckCircle className="w-5 h-5" /> : <Calendar className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium hidden sm:block">{t('steps.appointment')}</span>
      </div>

      <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />

      {/* Paso 3 */}
      <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          step === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          <CreditCard className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium hidden sm:block">{t('steps.payment')}</span>
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
                <h3 className="font-semibold text-dark">{t('step1.title')}</h3>
                <p className="text-sm text-gray-500">{t('step1.subtitle')}</p>
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
                {t('step1.birthDate')}
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
                  {t('step1.docType')}
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
                  {t('step1.docNumber')}
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
                {t('step1.address')}
              </label>
              <input
                type="text"
                value={personalData.address}
                onChange={(e) => setPersonalData({ ...personalData, address: e.target.value })}
                placeholder={t('step1.addressPlaceholder')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('step1.city')}
              </label>
              <select
                value={personalData.city}
                onChange={(e) => setPersonalData({ ...personalData, city: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              >
                <option value="">{t('step1.selectCity')}</option>
                {PERU_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
                <option value={OTHER_CITY}>{t('step1.otherCity')}</option>
              </select>
            </div>

            {/* Ocupación */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                {t('step1.occupation')} <span className="text-gray-400">{t('step1.occupationOptional')}</span>
              </label>
              <input
                type="text"
                value={personalData.occupation}
                onChange={(e) => setPersonalData({ ...personalData, occupation: e.target.value })}
                placeholder={t('step1.occupationPlaceholder')}
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
              {t('step1.continue')}
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
                <h3 className="font-semibold text-dark">{t('step2.title')}</h3>
                <p className="text-sm text-gray-500">{t('step2.subtitle')}</p>
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
                {t('step2.procedure')}
              </label>
              <select
                value={appointmentData.procedureId}
                onChange={(e) => setAppointmentData({ ...appointmentData, procedureId: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                required
              >
                <option value="">{t('step2.selectProcedure')}</option>
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
                    <p className="text-sm text-green-800 font-medium">{t('step2.dateSelected')}</p>
                    <p className="text-green-700">
                      {parseLocalDate(appointmentData.date).toLocaleDateString('es-PE', {
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
                  {t('step2.weight')}
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
                  {t('step2.height')}
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
                {t('step2.referralSource')}
              </label>
              <select
                value={appointmentData.referralSource}
                onChange={(e) => setAppointmentData({ ...appointmentData, referralSource: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              >
                <option value="">{t('step2.selectOption')}</option>
                {REFERRAL_SOURCES.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                {t('step2.message')} <span className="text-gray-400">{t('step2.messageOptional')}</span>
              </label>
              <textarea
                value={appointmentData.message}
                onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                rows={3}
                placeholder={t('step2.messagePlaceholder')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              />
            </div>

            {/* Price Preview */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{t('step2.consultationCost')}</p>
                <p className="text-xs text-gray-500">{t('step2.personalizedEvaluation')}</p>
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
                  {t('step2.bookingSlot')}
                </>
              ) : (
                <>
                  {t('step2.continueToPayment')}
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
