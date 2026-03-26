'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Scissors,
  UserCheck,
  HelpCircle,
  MapPin,
  Video,
  Globe,
  Trash2,
  Plus,
  CalendarX,
  Clock,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ShieldAlert,
  X,
} from 'lucide-react'

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────
type BlockReason = 'OPERACION' | 'PACIENTE_PREVIO' | 'OTRO'
type Modalidad = 'PRESENCIAL' | 'VIRTUAL' | null

interface BlockedSlot {
  id: string
  date: string
  timeSlot: string | null
  reason: BlockReason
  modalidad: Modalidad
  notes: string | null
  createdAt: string
  createdBy: { name: string | null; email: string }
}

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DAYS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const SLOTS_PRESENCIAL = [
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]
const SLOTS_VIRTUAL = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
]

const REASON_CONFIG: Record<BlockReason, {
  label: string
  description: string
  icon: React.FC<{ className?: string }>
  color: string
  bg: string
  border: string
}> = {
  OPERACION: {
    label: 'Cirugía / Procedimiento',
    description: 'Bloquear para realizar una operación o procedimiento quirúrgico',
    icon: Scissors,
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  PACIENTE_PREVIO: {
    label: 'Paciente Recurrente',
    description: 'Espacio reservado para paciente que requiere seguimiento especial',
    icon: UserCheck,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  OTRO: {
    label: 'Otro Motivo',
    description: 'Bloquear por cualquier otro motivo personal o administrativo',
    icon: HelpCircle,
    color: 'text-gray-700',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
}

function toLocalDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function parseLocalDate(s: string) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDisplayDate(s: string) {
  const d = parseLocalDate(s)
  return d.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────
export default function BlockedSlotsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Auth guard
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') router.push('/dashboard')
  }, [status, session, router])

  // ── Calendar state ──
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // ── Block data from server ──
  const [blocks, setBlocks] = useState<BlockedSlot[]>([])
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(false)

  // ── Form state ──
  const [isFullDay, setIsFullDay] = useState(false)
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [selectedReason, setSelectedReason] = useState<BlockReason>('OPERACION')
  const [selectedModalidad, setSelectedModalidad] = useState<'PRESENCIAL' | 'VIRTUAL' | 'AMBAS'>('AMBAS')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // ── Deletion state ──
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // ── Load blocks from server ──
  const loadBlocks = useCallback(async () => {
    setIsLoadingBlocks(true)
    try {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()
      const from = toLocalDateStr(new Date(year, month - 1, 1))
      const to = toLocalDateStr(new Date(year, month + 2, 0))
      const res = await fetch(`/api/admin/blocked-slots?from=${from}&to=${to}`)
      if (res.ok) {
        const data = await res.json()
        setBlocks(data.blocks || [])
      }
    } finally {
      setIsLoadingBlocks(false)
    }
  }, [currentMonth])

  useEffect(() => { loadBlocks() }, [loadBlocks])

  // ── Derived: blocks by date ──
  const blocksByDate = useMemo(() => {
    const map: Record<string, BlockedSlot[]> = {}
    for (const b of blocks) {
      const key = b.date.split('T')[0]
      if (!map[key]) map[key] = []
      map[key].push(b)
    }
    return map
  }, [blocks])

  // ── Calendar grid ──
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    const days: { date: Date; isCurrentMonth: boolean }[] = []

    for (let i = first.getDay() - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, new Date(year, month, 0).getDate() - i), isCurrentMonth: false })
    }
    for (let d = 1; d <= last.getDate(); d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true })
    }
    while (days.length < 42) {
      days.push({ date: new Date(year, month + 1, days.length - last.getDate() - first.getDay() + 1), isCurrentMonth: false })
    }
    return days
  }, [currentMonth])

  // ── Slots for form ──
  const availableSlots = selectedModalidad === 'VIRTUAL'
    ? SLOTS_VIRTUAL
    : selectedModalidad === 'PRESENCIAL'
      ? SLOTS_PRESENCIAL
      : [...SLOTS_PRESENCIAL, ...SLOTS_VIRTUAL].sort()

  // ── Handle slot toggle ──
  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    )
  }

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate) return
    if (!isFullDay && selectedSlots.length === 0) {
      setSubmitError('Selecciona al menos un horario o activa el bloqueo de día completo')
      return
    }
    setIsSubmitting(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/admin/blocked-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          timeSlots: isFullDay ? [] : selectedSlots,
          reason: selectedReason,
          modalidad: selectedModalidad === 'AMBAS' ? null : selectedModalidad,
          notes: notes.trim() || undefined,
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setSubmitError(data.error || 'Error al guardar el bloqueo')
        return
      }
      setSubmitSuccess(true)
      setSelectedSlots([])
      setNotes('')
      setIsFullDay(false)
      await loadBlocks()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch {
      setSubmitError('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Delete ──
  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await fetch(`/api/admin/blocked-slots/${id}`, { method: 'DELETE' })
      setBlocks(prev => prev.filter(b => b.id !== id))
      setConfirmDeleteId(null)
    } finally {
      setDeletingId(null)
    }
  }

  // ── Day status for calendar ──
  const getDayStatus = (dateStr: string): 'full' | 'partial' | 'none' => {
    const dayBlocks = blocksByDate[dateStr]
    if (!dayBlocks || dayBlocks.length === 0) return 'none'
    if (dayBlocks.some(b => b.timeSlot === null)) return 'full'
    return 'partial'
  }

  const getDayReasonColor = (dateStr: string): string => {
    const dayBlocks = blocksByDate[dateStr]
    if (!dayBlocks || dayBlocks.length === 0) return ''
    const firstReason = dayBlocks[0].reason
    if (firstReason === 'OPERACION') return 'bg-red-400'
    if (firstReason === 'PACIENTE_PREVIO') return 'bg-blue-400'
    return 'bg-gray-400'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // ── Upcoming blocks (sorted, upcoming first) ──
  const upcomingBlocks = useMemo(() => {
    const todayStr = toLocalDateStr(today)
    return blocks
      .filter(b => b.date.split('T')[0] >= todayStr)
      .sort((a, b) => {
        const dateComp = a.date.localeCompare(b.date)
        if (dateComp !== 0) return dateComp
        if (!a.timeSlot) return -1
        if (!b.timeSlot) return 1
        return a.timeSlot.localeCompare(b.timeSlot)
      })
  }, [blocks])

  if (status === 'loading') return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100 px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark">Gestión de Bloqueos</h1>
              <p className="text-gray-500 text-sm">Administra los horarios y días no disponibles para los pacientes</p>
            </div>
          </div>
          {/* Stats chips */}
          <div className="sm:ml-auto flex flex-wrap gap-2">
            {[
              { label: 'Bloqueos hoy', value: blocksByDate[toLocalDateStr(new Date())]?.length ?? 0, color: 'bg-red-100 text-red-800' },
              { label: 'Esta semana', value: upcomingBlocks.filter(b => {
                const d = parseLocalDate(b.date.split('T')[0])
                const week = new Date(); week.setDate(week.getDate() + 7)
                return d <= week
              }).length, color: 'bg-orange-100 text-orange-800' },
              { label: 'Total activos', value: upcomingBlocks.length, color: 'bg-primary/10 text-primary' },
            ].map(chip => (
              <span key={chip.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${chip.color}`}>
                <span className="text-base font-bold">{chip.value}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* ══════════════════════════════════
            LEFT: Calendar
        ══════════════════════════════════ */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            {/* Calendar header */}
            <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 p-6 text-white">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() - 1, 1))}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold">
                  {MONTHS_ES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() + 1, 1))}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-white/80">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span>Cirugía bloqueada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span>Paciente recurrente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-400" />
                  <span>Otro motivo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-white/30 flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-white/80 rounded" />
                    <div className="w-0.5 h-2 bg-white/80 rounded absolute" />
                  </div>
                  <span>Día completo</span>
                </div>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAYS_ES.map((d, i) => (
                <div
                  key={d}
                  className={`text-center text-xs font-semibold py-3 ${i === 0 ? 'text-red-400' : 'text-gray-500'}`}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 p-4 gap-1.5">
              {calendarDays.map((dayInfo, idx) => {
                const dateStr = toLocalDateStr(dayInfo.date)
                const status = getDayStatus(dateStr)
                const isSelected = selectedDate === dateStr
                const isPast = dayInfo.date < today
                const isToday = dayInfo.date.getTime() === today.getTime()
                const dayBlocks = blocksByDate[dateStr] || []

                return (
                  <motion.button
                    key={idx}
                    type="button"
                    whileHover={dayInfo.isCurrentMonth ? { scale: 1.05 } : {}}
                    whileTap={dayInfo.isCurrentMonth ? { scale: 0.95 } : {}}
                    onClick={() => dayInfo.isCurrentMonth && setSelectedDate(dateStr)}
                    className={`
                      relative aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5
                      transition-all duration-150 text-sm font-medium
                      ${!dayInfo.isCurrentMonth ? 'opacity-20 cursor-default' : 'cursor-pointer'}
                      ${isSelected
                        ? 'bg-primary text-white shadow-lg ring-2 ring-primary/30 ring-offset-1'
                        : status === 'full' && dayInfo.isCurrentMonth
                          ? 'bg-red-50 border-2 border-red-200 text-red-700'
                          : status === 'partial' && dayInfo.isCurrentMonth
                            ? 'bg-orange-50 border border-orange-200 text-orange-700'
                            : isPast && dayInfo.isCurrentMonth
                              ? 'text-gray-400 bg-gray-50'
                              : dayInfo.isCurrentMonth
                                ? 'hover:bg-primary/5 hover:text-primary text-gray-700 border border-transparent hover:border-primary/20'
                                : 'text-gray-300'
                      }
                      ${isToday && !isSelected ? 'ring-2 ring-primary/40' : ''}
                    `}
                    title={status !== 'none' ? `${dayBlocks.length} bloqueo(s)` : undefined}
                  >
                    <span className="leading-none">{dayInfo.date.getDate()}</span>

                    {/* Status indicator dot */}
                    {status !== 'none' && dayInfo.isCurrentMonth && !isSelected && (
                      <span className={`w-1.5 h-1.5 rounded-full ${getDayReasonColor(dateStr)}`} />
                    )}

                    {/* Full day cross mark */}
                    {status === 'full' && dayInfo.isCurrentMonth && !isSelected && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: 'repeating-linear-gradient(-45deg, #ef4444 0, #ef4444 1px, transparent 0, transparent 50%)',
                            backgroundSize: '6px 6px',
                          }}
                        />
                      </div>
                    )}

                    {/* Block count badge */}
                    {dayBlocks.length > 1 && dayInfo.isCurrentMonth && !isSelected && (
                      <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                        {dayBlocks.length}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Selected day blocks list */}
          <AnimatePresence>
            {selectedDate && blocksByDate[selectedDate] && blocksByDate[selectedDate].length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-3xl shadow-card p-5"
              >
                <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Bloqueos del {formatDisplayDate(selectedDate)}
                </h3>
                <div className="space-y-2">
                  {blocksByDate[selectedDate].map(block => {
                    const rc = REASON_CONFIG[block.reason]
                    const Icon = rc.icon
                    return (
                      <motion.div
                        key={block.id}
                        layout
                        className={`flex items-center gap-3 p-3 rounded-2xl border ${rc.bg} ${rc.border}`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-white/70 ${rc.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${rc.color}`}>{rc.label}</span>
                            {block.timeSlot ? (
                              <span className="text-xs bg-white/80 border border-current/20 rounded-full px-2 py-0.5 font-mono">
                                {block.timeSlot}
                              </span>
                            ) : (
                              <span className="text-xs bg-white/80 rounded-full px-2 py-0.5 font-semibold uppercase tracking-wide">
                                Día completo
                              </span>
                            )}
                            {block.modalidad && (
                              <span className="text-xs text-gray-500">
                                ({block.modalidad === 'PRESENCIAL' ? 'Presencial' : 'Virtual'})
                              </span>
                            )}
                          </div>
                          {block.notes && (
                            <p className="text-xs text-gray-600 mt-0.5 truncate">{block.notes}</p>
                          )}
                        </div>
                        {confirmDeleteId === block.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(block.id)}
                              disabled={deletingId === block.id}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                            >
                              {deletingId === block.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Eliminar'}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(block.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-white/70"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════
            RIGHT: Form + Upcoming list
        ══════════════════════════════════ */}
        <div className="xl:col-span-2 space-y-4">

          {/* ── Add block form ── */}
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-dark">Agregar bloqueo</h3>
                  <p className="text-xs text-gray-500">
                    {selectedDate ? formatDisplayDate(selectedDate) : 'Selecciona un día en el calendario'}
                  </p>
                </div>
              </div>
            </div>

            {!selectedDate ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <CalendarX className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-gray-500 font-medium">Selecciona un día</p>
                <p className="text-sm text-gray-400 mt-1">Haz clic en cualquier fecha del calendario</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-5">

                {/* Full day toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => { setIsFullDay(p => !p); setSelectedSlots([]) }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                      isFullDay
                        ? 'border-red-300 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className={`w-5 h-5 ${isFullDay ? 'text-red-600' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <p className="font-semibold text-sm">Bloquear día completo</p>
                        <p className="text-xs text-gray-500">Ningún horario estará disponible</p>
                      </div>
                    </div>
                    {isFullDay
                      ? <ToggleRight className="w-7 h-7 text-red-600" />
                      : <ToggleLeft className="w-7 h-7 text-gray-400" />
                    }
                  </button>
                </div>

                {/* Time slots (only if not full day) */}
                <AnimatePresence>
                  {!isFullDay && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* Modalidad first (affects which slots show) */}
                      <div className="mb-3">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Modalidad a bloquear
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {([
                            { value: 'PRESENCIAL', label: 'Presencial', Icon: MapPin, cls: 'text-purple-700 border-purple-200 bg-purple-50' },
                            { value: 'VIRTUAL', label: 'Virtual', Icon: Video, cls: 'text-blue-700 border-blue-200 bg-blue-50' },
                            { value: 'AMBAS', label: 'Ambas', Icon: Globe, cls: 'text-gray-700 border-gray-200 bg-gray-50' },
                          ] as const).map(({ value, label, Icon, cls }) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => { setSelectedModalidad(value); setSelectedSlots([]) }}
                              className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                                selectedModalidad === value ? cls + ' ring-2 ring-offset-1 ring-current/30' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Slot grid */}
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Seleccionar horarios
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => toggleSlot(slot)}
                            className={`py-2.5 rounded-xl text-sm font-mono font-medium border-2 transition-all ${
                              selectedSlots.includes(slot)
                                ? 'bg-primary text-white border-primary shadow-md scale-[1.02]'
                                : 'border-gray-200 text-gray-600 hover:border-primary/40 hover:bg-primary/5'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      {selectedSlots.length > 0 && (
                        <p className="text-xs text-primary mt-2 font-medium">
                          {selectedSlots.length} horario{selectedSlots.length !== 1 ? 's' : ''} seleccionado{selectedSlots.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Reason selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Motivo del bloqueo
                  </label>
                  <div className="space-y-2">
                    {(Object.entries(REASON_CONFIG) as [BlockReason, typeof REASON_CONFIG[BlockReason]][]).map(([key, cfg]) => {
                      const Icon = cfg.icon
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedReason(key)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                            selectedReason === key
                              ? `${cfg.bg} ${cfg.border} ring-2 ring-offset-1 ring-current/20`
                              : 'border-gray-100 hover:border-gray-200 bg-white'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            selectedReason === key ? 'bg-white/80' : 'bg-gray-100'
                          } ${cfg.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${selectedReason === key ? cfg.color : 'text-gray-700'}`}>
                              {cfg.label}
                            </p>
                            <p className="text-xs text-gray-400">{cfg.description}</p>
                          </div>
                          {selectedReason === key && (
                            <CheckCircle className={`w-5 h-5 ml-auto flex-shrink-0 ${cfg.color}`} />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Notas internas (opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    maxLength={200}
                    rows={2}
                    placeholder="Ej: Cirugía de rinoplastia con paciente González"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                  <p className="text-xs text-gray-400 text-right mt-0.5">{notes.length}/200</p>
                </div>

                {/* Error / Success */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </motion.div>
                  )}
                  {submitSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Bloqueo guardado correctamente</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Confirmar bloqueo</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Upcoming blocks list ── */}
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-dark text-sm">Próximos bloqueos</h3>
              </div>
              {isLoadingBlocks && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
              {upcomingBlocks.length > 0 && (
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {upcomingBlocks.length}
                </span>
              )}
            </div>

            {upcomingBlocks.length === 0 ? (
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-3">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <p className="text-gray-500 font-medium text-sm">Sin bloqueos próximos</p>
                <p className="text-xs text-gray-400 mt-1">Todos los horarios están disponibles</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-[420px] overflow-y-auto">
                {upcomingBlocks.map(block => {
                  const rc = REASON_CONFIG[block.reason]
                  const Icon = rc.icon
                  const dateStr = block.date.split('T')[0]
                  const isToday = dateStr === toLocalDateStr(new Date())
                  return (
                    <motion.div
                      key={block.id}
                      layout
                      className="px-5 py-3.5 flex items-center gap-3 group hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${rc.bg} ${rc.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-gray-700">
                            {isToday ? 'Hoy' : parseLocalDate(dateStr).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' })}
                          </span>
                          {block.timeSlot ? (
                            <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded-md text-gray-600">
                              {block.timeSlot}
                            </span>
                          ) : (
                            <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-semibold">
                              Día completo
                            </span>
                          )}
                          {block.modalidad && (
                            <span className="text-xs text-gray-400">
                              {block.modalidad === 'PRESENCIAL' ? '· Presencial' : '· Virtual'}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-medium ${rc.color} mt-0.5`}>{rc.label}</p>
                        {block.notes && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">{block.notes}</p>
                        )}
                      </div>
                      {confirmDeleteId === block.id ? (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => handleDelete(block.id)}
                            disabled={deletingId === block.id}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600"
                          >
                            {deletingId === block.id ? <Loader2 className="w-3 h-3 animate-spin" /> : '¿Sí?'}
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)} className="p-1 text-gray-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(block.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
