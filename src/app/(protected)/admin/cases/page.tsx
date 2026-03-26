'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Image as ImageIcon,
  Filter,
  ArrowUp,
  ArrowDown,
  Upload,
} from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  slug: string
}

interface Procedure {
  id: string
  name: string
  slug: string
  categoryId: string
  category: Category
}

interface RealCase {
  id: string
  procedureName: string
  procedureSlug: string
  categoryId: string
  patientInfo: string
  description: string
  beforeImage: string
  afterImage: string
  orientation: string
  order: number
  isActive: boolean
  category: Category
  createdAt: string
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<RealCase[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Filtros
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Upload state
  const [isUploadingBefore, setIsUploadingBefore] = useState(false)
  const [isUploadingAfter, setIsUploadingAfter] = useState(false)
  const beforeImageRef = useRef<HTMLInputElement>(null)
  const afterImageRef = useRef<HTMLInputElement>(null)

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingCase, setEditingCase] = useState<RealCase | null>(null)
  const [formData, setFormData] = useState({
    procedureId: '',   // solo local, no se envía a la API
    procedureName: '',
    procedureSlug: '',
    categoryId: '',
    patientInfo: '',
    description: '',
    beforeImage: '',
    afterImage: '',
    orientation: 'portrait',
    order: 0,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  // Menú de acciones
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  // Cargar categorías y procedimientos
  const fetchInitialData = async () => {
    try {
      const [catRes, procRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/procedures'),
      ])
      const catData = await catRes.json()
      const procData = await procRes.json()
      if (catRes.ok) setCategories(catData.categories)
      if (procRes.ok) setProcedures(procData.procedures)
    } catch (err) {
      console.error('Error loading initial data:', err)
    }
  }

  // Cargar casos
  const fetchCases = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterCategory) params.set('categoryId', filterCategory)
      if (filterStatus) params.set('isActive', filterStatus)

      const res = await fetch(`/api/admin/cases?${params.toString()}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setCases(data.cases)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }, [filterCategory, filterStatus])

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    fetchCases()
  }, [fetchCases])

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingCase(null)
    setFormData({
      procedureId: '',
      procedureName: '',
      procedureSlug: '',
      categoryId: '',
      patientInfo: '',
      description: '',
      beforeImage: '',
      afterImage: '',
      orientation: 'portrait',
      order: cases.length + 1,
      isActive: true,
    })
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEdit = (realCase: RealCase) => {
    setEditingCase(realCase)
    const matchingProcedure = procedures.find(p => p.slug === realCase.procedureSlug)
    setFormData({
      procedureId: matchingProcedure?.id || '',
      procedureName: realCase.procedureName,
      procedureSlug: realCase.procedureSlug,
      categoryId: realCase.categoryId,
      patientInfo: realCase.patientInfo,
      description: realCase.description,
      beforeImage: realCase.beforeImage,
      afterImage: realCase.afterImage,
      orientation: realCase.orientation,
      order: realCase.order,
      isActive: realCase.isActive,
    })
    setShowModal(true)
    setActionMenuOpen(null)
  }

  // Upload de imagen
  const handleImageUpload = async (file: File, field: 'beforeImage' | 'afterImage') => {
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5MB')
      return
    }

    if (field === 'beforeImage') setIsUploadingBefore(true)
    else setIsUploadingAfter(true)

    try {
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('folder', 'cases')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      const data = await response.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, [field]: data.url }))
      } else {
        alert(data.error || 'Error al subir imagen')
      }
    } catch {
      alert('Error al subir imagen')
    } finally {
      if (field === 'beforeImage') {
        setIsUploadingBefore(false)
        if (beforeImageRef.current) beforeImageRef.current.value = ''
      } else {
        setIsUploadingAfter(false)
        if (afterImageRef.current) afterImageRef.current.value = ''
      }
    }
  }

  // Guardar caso
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const url = editingCase
        ? `/api/admin/cases/${editingCase.id}`
        : '/api/admin/cases'
      const method = editingCase ? 'PATCH' : 'POST'

      // Excluir procedureId (solo local)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { procedureId, ...payload } = formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(editingCase ? 'Caso actualizado' : 'Caso creado')
      setShowModal(false)
      fetchCases()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  // Reordenar con ↑↓
  const handleReorder = async (caseItem: RealCase, direction: 'up' | 'down') => {
    const idx = cases.findIndex(c => c.id === caseItem.id)
    const adjacentIdx = direction === 'up' ? idx - 1 : idx + 1
    if (adjacentIdx < 0 || adjacentIdx >= cases.length) return

    const adjacent = cases[adjacentIdx]

    try {
      await Promise.all([
        fetch(`/api/admin/cases/${caseItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: adjacent.order }),
        }),
        fetch(`/api/admin/cases/${adjacent.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: caseItem.order }),
        }),
      ])
      fetchCases()
    } catch {
      setError('Error al reordenar')
    }
  }

  // Cambiar estado activo/inactivo
  const handleToggleActive = async (realCase: RealCase) => {
    try {
      const res = await fetch(`/api/admin/cases/${realCase.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !realCase.isActive }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchCases()
      setSuccess(`Caso ${realCase.isActive ? 'desactivado' : 'activado'}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
    setActionMenuOpen(null)
  }

  // Eliminar caso
  const handleDelete = async (realCase: RealCase) => {
    if (!confirm(`¿Eliminar este caso de ${realCase.procedureName}? Esta acción no se puede deshacer.`)) return

    try {
      const res = await fetch(`/api/admin/cases/${realCase.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      fetchCases()
      setSuccess('Caso eliminado')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
    }
    setActionMenuOpen(null)
  }

  // Procedimiento seleccionado actualmente
  const selectedProcedure = procedures.find(p => p.id === formData.procedureId)

  // Procedimientos agrupados por categoría para <optgroup>
  const proceduresByCategory = categories.reduce<Record<string, Procedure[]>>((acc, cat) => {
    acc[cat.id] = procedures.filter(p => p.categoryId === cat.id && p.isActive !== false)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Casos Reales</h1>
          <p className="text-gray-500 text-sm mt-1">
            Galería de antes y después
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Caso
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-center">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
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

      {/* Grid de casos */}
      {loading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : cases.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-100">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay casos</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((realCase, idx) => (
            <motion.div
              key={realCase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Imágenes antes/después */}
              <div className="grid grid-cols-2 h-32">
                <div className="relative bg-gray-100">
                  {realCase.beforeImage ? (
                    <Image
                      src={realCase.beforeImage}
                      alt="Antes"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    Antes
                  </span>
                </div>
                <div className="relative bg-gray-100">
                  {realCase.afterImage ? (
                    <Image
                      src={realCase.afterImage}
                      alt="Después"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    Después
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-dark truncate">{realCase.procedureName}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                          realCase.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {realCase.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 truncate">{realCase.patientInfo}</p>
                    <p className="text-xs text-primary mt-1">
                      {realCase.category.name} · {realCase.orientation === 'landscape' ? 'Horizontal' : 'Vertical'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Botones reordenar */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleReorder(realCase, 'up')}
                        disabled={idx === 0}
                        title="Subir"
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleReorder(realCase, 'down')}
                        disabled={idx === cases.length - 1}
                        title="Bajar"
                        className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>

                    {/* Menú de acciones */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActionMenuOpen(actionMenuOpen === realCase.id ? null : realCase.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                      <AnimatePresence>
                        {actionMenuOpen === realCase.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                          >
                            <button
                              onClick={() => handleEdit(realCase)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" /> Editar
                            </button>
                            <button
                              onClick={() => handleToggleActive(realCase)}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              {realCase.isActive ? (
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
                              onClick={() => handleDelete(realCase)}
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

      {/* Modal de creación/edición */}
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
                {editingCase ? 'Editar Caso' : 'Nuevo Caso'}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">

                {/* Procedimiento */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Procedimiento *
                  </label>
                  <select
                    value={formData.procedureId}
                    onChange={(e) => {
                      const proc = procedures.find(p => p.id === e.target.value)
                      setFormData({
                        ...formData,
                        procedureId: e.target.value,
                        procedureName: proc?.name || '',
                        procedureSlug: proc?.slug || '',
                        categoryId: proc?.categoryId || '',
                      })
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  >
                    <option value="">Seleccionar procedimiento...</option>
                    {categories.map((cat) => {
                      const procs = proceduresByCategory[cat.id] || []
                      if (procs.length === 0) return null
                      return (
                        <optgroup key={cat.id} label={cat.name}>
                          {procs.map((proc) => (
                            <option key={proc.id} value={proc.id}>
                              {proc.name}
                            </option>
                          ))}
                        </optgroup>
                      )
                    })}
                  </select>
                  {selectedProcedure && (
                    <p className="text-xs text-gray-500 mt-1">
                      Categoría: {selectedProcedure.category.name}
                    </p>
                  )}
                </div>

                {/* Info Paciente */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Info Paciente *
                  </label>
                  <input
                    type="text"
                    value={formData.patientInfo}
                    onChange={(e) => setFormData({ ...formData, patientInfo: e.target.value })}
                    placeholder="Paciente femenina, 28 años"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    rows={2}
                    required
                  />
                </div>

                {/* Imágenes */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Imagen Antes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen Antes
                    </label>
                    {formData.beforeImage ? (
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <div className="relative h-28">
                          <Image
                            src={formData.beforeImage}
                            alt="Antes"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex gap-1.5 p-1.5">
                          <label className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              ref={beforeImageRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, 'beforeImage')
                              }}
                              className="hidden"
                            />
                            {isUploadingBefore
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <Upload className="w-3.5 h-3.5" />
                            }
                            Cambiar
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, beforeImage: '' }))}
                            className="px-2 text-red-500 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                        <input
                          ref={beforeImageRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, 'beforeImage')
                          }}
                          className="hidden"
                        />
                        {isUploadingBefore ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500 font-medium">Subir imagen</span>
                            <span className="text-xs text-gray-400">5MB · JPG/PNG/WebP</span>
                          </>
                        )}
                      </label>
                    )}
                  </div>

                  {/* Imagen Después */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen Después
                    </label>
                    {formData.afterImage ? (
                      <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <div className="relative h-28">
                          <Image
                            src={formData.afterImage}
                            alt="Después"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex gap-1.5 p-1.5">
                          <label className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              ref={afterImageRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, 'afterImage')
                              }}
                              className="hidden"
                            />
                            {isUploadingAfter
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <Upload className="w-3.5 h-3.5" />
                            }
                            Cambiar
                          </label>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, afterImage: '' }))}
                            className="px-2 text-red-500 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                        <input
                          ref={afterImageRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file, 'afterImage')
                          }}
                          className="hidden"
                        />
                        {isUploadingAfter ? (
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500 font-medium">Subir imagen</span>
                            <span className="text-xs text-gray-400">5MB · JPG/PNG/WebP</span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                {/* Orientación */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orientación de las fotos
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="orientation"
                        value="portrait"
                        checked={formData.orientation === 'portrait'}
                        onChange={() => setFormData({ ...formData, orientation: 'portrait' })}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Vertical (retrato)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="orientation"
                        value="landscape"
                        checked={formData.orientation === 'landscape'}
                        onChange={() => setFormData({ ...formData, orientation: 'landscape' })}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Horizontal (paisaje)</span>
                    </label>
                  </div>
                </div>

                {/* Activo */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">Publicar caso (visible en la web)</span>
                  </label>
                </div>

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
                    disabled={saving || isUploadingBefore || isUploadingAfter}
                    className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingCase ? 'Guardar' : 'Crear'}
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
