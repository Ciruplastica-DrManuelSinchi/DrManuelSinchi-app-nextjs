'use client'

import { useState, useEffect } from 'react'
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
} from 'lucide-react'
import Image from 'next/image'

interface Category {
  id: string
  name: string
  slug: string
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
  order: number
  isActive: boolean
  category: Category
  createdAt: string
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<RealCase[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Filtros
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingCase, setEditingCase] = useState<RealCase | null>(null)
  const [formData, setFormData] = useState({
    procedureName: '',
    procedureSlug: '',
    categoryId: '',
    patientInfo: '',
    description: '',
    beforeImage: '',
    afterImage: '',
    order: 0,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  // Menú de acciones
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  // Cargar categorías
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      if (res.ok) {
        setCategories(data.categories)
      }
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  // Cargar casos
  const fetchCases = async () => {
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
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchCases()
  }, [filterCategory, filterStatus])

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingCase(null)
    setFormData({
      procedureName: '',
      procedureSlug: '',
      categoryId: categories[0]?.id || '',
      patientInfo: '',
      description: '',
      beforeImage: '',
      afterImage: '',
      order: cases.length + 1,
      isActive: true,
    })
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEdit = (realCase: RealCase) => {
    setEditingCase(realCase)
    setFormData({
      procedureName: realCase.procedureName,
      procedureSlug: realCase.procedureSlug,
      categoryId: realCase.categoryId,
      patientInfo: realCase.patientInfo,
      description: realCase.description,
      beforeImage: realCase.beforeImage,
      afterImage: realCase.afterImage,
      order: realCase.order,
      isActive: realCase.isActive,
    })
    setShowModal(true)
    setActionMenuOpen(null)
  }

  // Generar slug desde nombre
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
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

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
          {cases.map((realCase) => (
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-dark">{realCase.procedureName}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          realCase.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {realCase.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{realCase.patientInfo}</p>
                    <p className="text-xs text-primary mt-1">{realCase.category.name}</p>
                  </div>

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Procedimiento *
                    </label>
                    <input
                      type="text"
                      value={formData.procedureName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          procedureName: e.target.value,
                          procedureSlug: editingCase ? formData.procedureSlug : generateSlug(e.target.value),
                        })
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.procedureSlug}
                      onChange={(e) => setFormData({ ...formData, procedureSlug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    >
                      <option value="">Seleccionar...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
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
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen Antes (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.beforeImage}
                      onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                      placeholder="/images/before-after/..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Imagen Después (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.afterImage}
                      onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                      placeholder="/images/before-after/..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Activo</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
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
