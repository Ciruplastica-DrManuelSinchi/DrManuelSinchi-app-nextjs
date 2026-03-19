'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  AlertCircle,
  Lock,
  Calendar as CalendarIcon,
} from 'lucide-react'
import { isBlockedDate, getMonthName } from '@/lib/holidays'

interface SlotStatus {
  timeSlot: string
  type: 'booked' | 'awaiting_payment'
  isCurrentUser: boolean
  expiresAt?: string | null
}

interface CalendlyStyleCalendarProps {
  onSelectDateTime: (date: string, timeSlot: string) => void
  selectedDate?: string
  selectedTimeSlot?: string
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

export default function CalendlyStyleCalendar({
  onSelectDateTime,
  selectedDate,
  selectedTimeSlot,
}: CalendlyStyleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    selectedDate ? new Date(selectedDate) : null
  )
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [occupiedSlots, setOccupiedSlots] = useState<SlotStatus[]>([])
  const [error, setError] = useState('')

  // Sincronizar con props externas
  useEffect(() => {
    if (selectedDate) {
      setInternalSelectedDate(new Date(selectedDate))
    }
  }, [selectedDate])

  // Calcular días del mes
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const startingDay = firstDayOfMonth.getDay()

    const days: { date: Date; isCurrentMonth: boolean; isToday: boolean }[] = []

    // Días del mes anterior
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Días del mes actual
    const today = new Date()
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        isCurrentMonth: true,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      })
    }

    // Días del próximo mes para completar la grilla
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return days
  }, [currentMonth])

  // Cargar slots ocupados cuando se selecciona una fecha
  const fetchSlotAvailability = useCallback(async (date: Date) => {
    setIsLoadingSlots(true)
    setError('')

    try {
      const dateStr = date.toISOString().split('T')[0]
      const response = await fetch(`/api/bookings/availability?date=${dateStr}`)

      if (!response.ok) {
        throw new Error('Error al cargar disponibilidad')
      }

      const data = await response.json()
      setOccupiedSlots(data.occupiedSlots || [])
    } catch {
      setError('No se pudo cargar la disponibilidad')
    } finally {
      setIsLoadingSlots(false)
    }
  }, [])

  // Cargar disponibilidad al seleccionar fecha
  useEffect(() => {
    if (internalSelectedDate) {
      fetchSlotAvailability(internalSelectedDate)
    }
  }, [internalSelectedDate, fetchSlotAvailability])

  // Navegar meses
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      // No permitir ir a meses pasados
      const today = new Date()
      if (newMonth < new Date(today.getFullYear(), today.getMonth(), 1)) {
        return prev
      }
      return newMonth
    })
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      // Limitar a 3 meses adelante
      const maxDate = new Date()
      maxDate.setMonth(maxDate.getMonth() + 3)
      if (newMonth > maxDate) {
        return prev
      }
      return newMonth
    })
  }

  // Verificar si una fecha es seleccionable
  const isDateSelectable = (date: Date): { selectable: boolean; reason?: string } => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // No permitir fechas pasadas o de hoy
    if (date <= today) {
      return { selectable: false, reason: 'No disponible' }
    }

    // Verificar si está bloqueada (domingo o feriado)
    const blockCheck = isBlockedDate(date)
    if (blockCheck.blocked) {
      return { selectable: false, reason: blockCheck.reason }
    }

    // Verificar límite de 3 meses
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    if (date > maxDate) {
      return { selectable: false, reason: 'Fuera del rango de reserva' }
    }

    return { selectable: true }
  }

  // Seleccionar fecha
  const handleDateSelect = (date: Date) => {
    const { selectable } = isDateSelectable(date)
    if (!selectable) return

    setInternalSelectedDate(date)
  }

  // Obtener estado de un slot de tiempo
  const getSlotStatus = (timeSlot: string): {
    status: 'available' | 'booked' | 'awaiting_payment' | 'user_reservation'
    reason?: string
  } => {
    const slot = occupiedSlots.find(s => s.timeSlot === timeSlot)

    if (!slot) {
      return { status: 'available' }
    }

    // Si es del usuario actual y está esperando pago
    if (slot.isCurrentUser && slot.type === 'awaiting_payment') {
      return { status: 'user_reservation', reason: 'Tu reserva pendiente de pago' }
    }

    // Si está reservado (PENDING o CONFIRMED)
    if (slot.type === 'booked') {
      return { status: 'booked', reason: 'Hora reservada' }
    }

    // Si otro usuario está en proceso de pago
    if (slot.type === 'awaiting_payment') {
      return { status: 'awaiting_payment', reason: 'Hora reservada temporalmente' }
    }

    return { status: 'available' }
  }

  // Seleccionar slot de tiempo
  const handleTimeSlotSelect = (timeSlot: string) => {
    const slotStatus = getSlotStatus(timeSlot)
    if (slotStatus.status === 'booked' || slotStatus.status === 'awaiting_payment') {
      return
    }

    if (internalSelectedDate) {
      const dateStr = internalSelectedDate.toISOString().split('T')[0]
      onSelectDateTime(dateStr, timeSlot)
    }
  }

  // Verificar si el mes anterior está habilitado
  const isPrevMonthEnabled = useMemo(() => {
    const today = new Date()
    const currentMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    return currentMonthStart > thisMonthStart
  }, [currentMonth])

  // Verificar si el próximo mes está habilitado
  const isNextMonthEnabled = useMemo(() => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    const nextMonthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    return nextMonthStart <= maxDate
  }, [currentMonth])

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Header estilo Calendly */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 text-white">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">Selecciona fecha y hora</h3>
            <p className="text-sm text-white/80">Consulta presencial en clínica</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Navegación del mes */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={!isPrevMonthEnabled}
            className={`p-2 rounded-full transition-all ${
              isPrevMonthEnabled
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h4 className="text-lg font-semibold text-dark">
            {getMonthName(currentMonth.getMonth())} {currentMonth.getFullYear()}
          </h4>
          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!isNextMonthEnabled}
            className={`p-2 rounded-full transition-all ${
              isNextMonthEnabled
                ? 'hover:bg-gray-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, index) => (
            <div
              key={day}
              className={`text-center text-xs font-medium py-2 ${
                index === 0 ? 'text-red-400' : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grilla de días */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayInfo, index) => {
            const { selectable, reason } = isDateSelectable(dayInfo.date)
            const isSelected =
              internalSelectedDate?.toDateString() === dayInfo.date.toDateString()
            const isSun = dayInfo.date.getDay() === 0

            return (
              <div key={index} className="relative group">
                <button
                  type="button"
                  onClick={() => handleDateSelect(dayInfo.date)}
                  disabled={!dayInfo.isCurrentMonth || !selectable}
                  className={`
                    w-full aspect-square rounded-full flex items-center justify-center text-sm transition-all relative
                    ${!dayInfo.isCurrentMonth ? 'text-gray-300' : ''}
                    ${dayInfo.isToday && !isSelected ? 'ring-2 ring-primary/30' : ''}
                    ${
                      isSelected
                        ? 'bg-primary text-white font-semibold shadow-lg scale-110'
                        : selectable && dayInfo.isCurrentMonth
                        ? 'hover:bg-primary/10 text-gray-700 hover:text-primary cursor-pointer'
                        : 'cursor-not-allowed'
                    }
                    ${isSun && dayInfo.isCurrentMonth && !isSelected ? 'text-red-400' : ''}
                    ${!selectable && dayInfo.isCurrentMonth && !isSelected ? 'text-gray-300 bg-gray-50' : ''}
                  `}
                >
                  {dayInfo.date.getDate()}
                  {!selectable && dayInfo.isCurrentMonth && (
                    <Lock className="w-2.5 h-2.5 absolute top-0.5 right-0.5 text-gray-400" />
                  )}
                </button>

                {/* Tooltip */}
                {!selectable && dayInfo.isCurrentMonth && reason && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {reason}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Leyenda */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center">
              <Lock className="w-2 h-2 text-gray-400" />
            </div>
            <span>No disponible</span>
          </div>
        </div>
      </div>

      {/* Selector de horarios */}
      <AnimatePresence>
        {internalSelectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-dark">
                  Horarios para el{' '}
                  {internalSelectedDate.toLocaleDateString('es-PE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </h4>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {isLoadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  <span className="ml-2 text-gray-500">Cargando horarios...</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const slotStatus = getSlotStatus(slot)
                      const isSelectedSlot = selectedTimeSlot === slot
                      const isUnavailable =
                        slotStatus.status === 'booked' || slotStatus.status === 'awaiting_payment'
                      const isUserReservation = slotStatus.status === 'user_reservation'

                      return (
                        <div key={slot} className="relative group">
                          <motion.button
                            type="button"
                            onClick={() => handleTimeSlotSelect(slot)}
                            disabled={isUnavailable}
                            className={`
                              w-full py-3 px-2 rounded-xl text-sm font-medium transition-all relative
                              ${
                                isSelectedSlot
                                  ? 'bg-primary text-white shadow-lg'
                                  : isUnavailable
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : isUserReservation
                                  ? 'bg-amber-50 text-amber-700 border-2 border-amber-300 hover:bg-amber-100'
                                  : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary border border-gray-200 hover:border-primary'
                              }
                            `}
                            whileHover={!isUnavailable ? { scale: 1.05 } : {}}
                            whileTap={!isUnavailable ? { scale: 0.95 } : {}}
                          >
                            {slot}
                            {isUnavailable && (
                              <Lock className="w-3 h-3 absolute top-1 right-1 text-gray-400" />
                            )}
                          </motion.button>

                          {/* Tooltip para slots no disponibles */}
                          {(isUnavailable || isUserReservation) && slotStatus.reason && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {slotStatus.reason}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Leyenda de horarios */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span>Seleccionado</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-gray-50 border border-gray-200" />
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-gray-100 flex items-center justify-center">
                        <Lock className="w-2 h-2 text-gray-400" />
                      </div>
                      <span>Hora reservada</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
