'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Calendar, Clock, FileText, Loader2, CheckCircle, AlertCircle, LogIn } from 'lucide-react'
import Link from 'next/link'

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

const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

export default function BookingForm({ procedures, preSelectedProcedure }: BookingFormProps) {
  const router = useRouter()
  const { status } = useSession()
  const [formData, setFormData] = useState({
    procedureId: preSelectedProcedure || '',
    date: '',
    timeSlot: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const selectedProcedure = procedures.find(p => p.id === formData.procedureId)
  const isAuthenticated = status === 'authenticated'

  // Restaurar datos del formulario desde sessionStorage al volver del login
  useEffect(() => {
    const savedBooking = sessionStorage.getItem('pendingBooking')
    if (savedBooking && isAuthenticated) {
      try {
        const parsed = JSON.parse(savedBooking)
        setFormData(parsed)
      } catch {
        // Ignorar errores de parsing
      }
    }
  }, [isAuthenticated])

  // Obtener fecha mínima (mañana)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Obtener fecha máxima (3 meses)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  // Guardar datos del formulario en sessionStorage antes de redirigir
  const saveFormData = () => {
    sessionStorage.setItem('pendingBooking', JSON.stringify(formData))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedProcedure) {
      setError('Por favor selecciona un procedimiento')
      return
    }

    // Si no está autenticado, mostrar prompt de login
    if (!isAuthenticated) {
      saveFormData()
      setShowLoginPrompt(true)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          procedureId: formData.procedureId,
          procedureName: selectedProcedure.name,
          procedureCategory: selectedProcedure.category,
          date: formData.date,
          timeSlot: formData.timeSlot,
          message: formData.message || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al crear reserva')
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
          ¡Reserva Confirmada!
        </h2>
        <p className="text-gray-600 mb-2">
          Tu cita para <strong>{selectedProcedure?.name}</strong> ha sido registrada.
        </p>
        <p className="text-gray-600 mb-6">
          Fecha: <strong>{new Date(formData.date).toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> a las <strong>{formData.timeSlot}</strong>
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Te contactaremos pronto para confirmar los detalles de tu consulta.
        </p>
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
              setFormData({ procedureId: '', date: '', timeSlot: '', message: '' })
            }}
            className="btn-secondary"
          >
            Hacer otra reserva
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          value={formData.procedureId}
          onChange={(e) => setFormData({ ...formData, procedureId: e.target.value })}
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

      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 inline mr-2" />
          Fecha preferida *
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          min={getMinDate()}
          max={getMaxDate()}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Puedes reservar con hasta 3 meses de anticipación
        </p>
      </div>

      {/* Horario */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="w-4 h-4 inline mr-2" />
          Horario preferido *
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setFormData({ ...formData, timeSlot: slot })}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                formData.timeSlot === slot
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Mensaje adicional <span className="text-gray-400">(opcional)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          placeholder="Cuéntanos más sobre lo que buscas o cualquier consulta previa..."
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isLoading || !formData.procedureId || !formData.date || !formData.timeSlot}
        className="w-full btn-primary btn-shine py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Reservando...
          </span>
        ) : (
          'Confirmar Reserva'
        )}
      </motion.button>

      <p className="text-xs text-center text-gray-500">
        Al reservar aceptas nuestros términos y condiciones. Te contactaremos para confirmar tu cita.
      </p>
    </form>
  )
}
