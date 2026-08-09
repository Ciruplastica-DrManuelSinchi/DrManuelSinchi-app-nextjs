'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Star,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  MessageSquareQuote,
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  source: string
  procedure: string | null
  order: number
  isActive: boolean
  createdAt: string
}

const SOURCE_OPTIONS = [
  { value: 'google', label: 'Google' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
]

const SOURCE_COLORS: Record<string, string> = {
  google: 'bg-blue-100 text-blue-700',
  whatsapp: 'bg-green-100 text-green-700',
  facebook: 'bg-indigo-100 text-indigo-700',
  instagram: 'bg-pink-100 text-pink-700',
}

function StarRating({
  rating,
  size = 'sm',
  interactive = false,
  onChange,
}: {
  rating: number
  size?: 'sm' | 'md'
  interactive?: boolean
  onChange?: (rating: number) => void
}) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
        >
          <Star
            className={`${sizeClass} ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    text: '',
    rating: 5,
    source: 'google',
    procedure: '',
    order: 0,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  // Menu de acciones
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  // Cargar testimonios
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/testimonials')
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setTestimonials(data.testimonials)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingTestimonial(null)
    setFormData({
      name: '',
      text: '',
      rating: 5,
      source: 'google',
      procedure: '',
      order: testimonials.length + 1,
      isActive: true,
    })
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
      rating: testimonial.rating,
      source: testimonial.source,
      procedure: testimonial.procedure || '',
      order: testimonial.order,
      isActive: testimonial.isActive,
    })
    setShowModal(true)
    setActionMenuOpen(null)
  }

  // Guardar testimonio
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial.id}`
        : '/api/admin/testimonials'
      const method = editingTestimonial ? 'PATCH' : 'POST'

      const payload = {
        ...formData,
        procedure: formData.procedure || null,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(editingTestimonial ? 'Testimonio actualizado' : 'Testimonio creado')
      setShowModal(false)
      fetchTestimonials()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  // Reordenar con flechas
  const handleReorder = async (testimonial: Testimonial, direction: 'up' | 'down') => {
    const idx = testimonials.findIndex((t) => t.id === testimonial.id)
    const adjacentIdx = direction === 'up' ? idx - 1 : idx + 1
    if (adjacentIdx < 0 || adjacentIdx >= testimonials.length) return

    const adjacent = testimonials[adjacentIdx]

    try {
      await Promise.all([
        fetch(`/api/admin/testimonials/${testimonial.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: adjacent.order }),
        }),
        fetch(`/api/admin/testimonials/${adjacent.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: testimonial.order }),
        }),
      ])
      fetchTestimonials()
    } catch {
      setError('Error al reordenar')
    }
  }

  // Cambiar estado activo/inactivo
  const handleToggleActive = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !testimonial.isActive }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchTestimonials()
      setSuccess(`Testimonio ${testimonial.isActive ? 'desactivado' : 'activado'}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
    setActionMenuOpen(null)
  }

  // Eliminar testimonio
  const handleDelete = async (testimonial: Testimonial) => {
    if (
      !confirm(
        `¿Eliminar el testimonio de "${testimonial.name}"? Esta acción no se puede deshacer.`
      )
    )
      return

    try {
      const res = await fetch(`/api/admin/testimonials/${testimonial.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      fetchTestimonials()
      setSuccess('Testimonio eliminado')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
    }
    setActionMenuOpen(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Testimonios</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestionar opiniones y reseñas de pacientes
          </p>
        </div>
        <button onClick={handleCreate} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Testimonio
        </button>
      </div>

      {/* Alertas */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 flex-1">{error}</p>
            <button onClick={() => setError(null)}>
              <X className="w-5 h-5 text-red-500" />
            </button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-700">{success}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de testimonios */}
      {loading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-100">
          <MessageSquareQuote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay testimonios</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-dark truncate">
                        {testimonial.name}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          testimonial.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {testimonial.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={testimonial.rating} />
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          SOURCE_COLORS[testimonial.source] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {SOURCE_OPTIONS.find((s) => s.value === testimonial.source)?.label ||
                          testimonial.source}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {testimonial.procedure && (
                      <p className="text-xs text-primary mt-2">{testimonial.procedure}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Botones reordenar */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleReorder(testimonial, 'up')}
                        disabled={idx === 0}
                        title="Subir"
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleReorder(testimonial, 'down')}
                        disabled={idx === testimonials.length - 1}
                        title="Bajar"
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>

                    {/* Menu de acciones */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActionMenuOpen(
                            actionMenuOpen === testimonial.id ? null : testimonial.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                      <AnimatePresence>
                        {actionMenuOpen === testimonial.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                          >
                            <button
                              onClick={() => handleEdit(testimonial)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" /> Editar
                            </button>
                            <button
                              onClick={() => handleToggleActive(testimonial)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              {testimonial.isActive ? (
                                <>
                                  <XCircle className="w-4 h-4" /> Desactivar
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" /> Activar
                                </>
                              )}
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => handleDelete(testimonial)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Eliminar
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de creacion/edicion */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-dark mb-4">
                {editingTestimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre del paciente"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                </div>

                {/* Texto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texto *
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Testimonio del paciente..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    rows={4}
                    required
                  />
                </div>

                {/* Calificacion */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calificación *
                  </label>
                  <StarRating
                    rating={formData.rating}
                    size="md"
                    interactive
                    onChange={(rating) => setFormData({ ...formData, rating })}
                  />
                </div>

                {/* Fuente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuente *
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  >
                    {SOURCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Procedimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Procedimiento
                  </label>
                  <input
                    type="text"
                    value={formData.procedure}
                    onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                    placeholder="Ej: Rinoplastía, Liposucción (opcional)"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                {/* Orden */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                    }
                    min={0}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                {/* Activo */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">
                    Activo (visible en la web)
                  </span>
                </label>

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingTestimonial ? 'Guardar' : 'Crear'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
