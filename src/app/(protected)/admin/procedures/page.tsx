'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  Loader2,
  Stethoscope,
  Image as ImageIcon,
  Youtube,
  Crop,
} from 'lucide-react'
import Image from 'next/image'
import { ImageCropper } from '@/app/components/ui/image-cropper'

interface Category {
  id: string
  name: string
  slug: string
}

interface VideoItem {
  title: string
  youtubeId: string
}

interface Procedure {
  id: string
  name: string
  slug: string
  order: number
  isActive: boolean
  infoImage: string | null
  videos: VideoItem[] | null
  category: Category
  createdAt: string
}

export default function AdminProceduresPage() {
  const [procedures, setProcedures] = useState<Procedure[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Filtros
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingProcedure, setEditingProcedure] = useState<Procedure | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    categoryId: '',
    order: 0,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  // Media modal
  const [showMediaModal, setShowMediaModal] = useState(false)
  const [mediaProcedure, setMediaProcedure] = useState<Procedure | null>(null)
  const [mediaInfoImage, setMediaInfoImage] = useState('')
  const [mediaVideos, setMediaVideos] = useState<VideoItem[]>([])
  const [savingMedia, setSavingMedia] = useState(false)
  const [isUploadingInfo, setIsUploadingInfo] = useState(false)
  const [cropperOpen, setCropperOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const infoImageRef = useRef<HTMLInputElement>(null)

  // Menú de acciones
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  // Cargar datos
  const fetchProcedures = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (categoryFilter) params.set('categoryId', categoryFilter)
      if (statusFilter) params.set('isActive', statusFilter)

      const res = await fetch(`/api/admin/procedures?${params}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setProcedures(data.procedures)
      setCategories(data.categories)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }, [search, categoryFilter, statusFilter])

  useEffect(() => {
    fetchProcedures()
  }, [fetchProcedures])

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingProcedure(null)
    setFormData({
      name: '',
      slug: '',
      categoryId: categories[0]?.id || '',
      order: 0,
      isActive: true,
    })
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEdit = (procedure: Procedure) => {
    setEditingProcedure(procedure)
    setFormData({
      name: procedure.name,
      slug: procedure.slug,
      categoryId: procedure.category.id,
      order: procedure.order,
      isActive: procedure.isActive,
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

  // Guardar procedimiento
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const url = editingProcedure
        ? `/api/admin/procedures/${editingProcedure.id}`
        : '/api/admin/procedures'
      const method = editingProcedure ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(editingProcedure ? 'Procedimiento actualizado' : 'Procedimiento creado')
      setShowModal(false)
      fetchProcedures()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  // Cambiar estado activo/inactivo
  const handleToggleActive = async (procedure: Procedure) => {
    try {
      const res = await fetch(`/api/admin/procedures/${procedure.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !procedure.isActive }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchProcedures()
      setSuccess(`Procedimiento ${procedure.isActive ? 'desactivado' : 'activado'}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
    setActionMenuOpen(null)
  }

  // Eliminar procedimiento
  const handleDelete = async (procedure: Procedure) => {
    if (!confirm(`¿Eliminar "${procedure.name}"? Esta acción no se puede deshacer.`)) return

    try {
      const res = await fetch(`/api/admin/procedures/${procedure.id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchProcedures()
      setSuccess('Procedimiento eliminado')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar')
    }
    setActionMenuOpen(null)
  }

  // ── Media modal handlers ──
  const handleOpenMedia = (procedure: Procedure) => {
    setMediaProcedure(procedure)
    setMediaInfoImage(procedure.infoImage || '')
    setMediaVideos(procedure.videos && Array.isArray(procedure.videos) ? procedure.videos : [])
    setShowMediaModal(true)
    setActionMenuOpen(null)
  }

  const handleMediaImageSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { alert('Max 10MB'); return }
    const url = URL.createObjectURL(file)
    setImageToCrop(url)
    setCropperOpen(true)
    if (infoImageRef.current) infoImageRef.current.value = ''
  }

  const handleMediaCropped = async (croppedFile: File) => {
    setIsUploadingInfo(true)
    try {
      const fd = new FormData()
      fd.append('file', croppedFile)
      fd.append('folder', 'procedures')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) setMediaInfoImage(data.url)
      else alert(data.error || 'Error al subir')
    } catch { alert('Error al subir imagen') }
    finally {
      setIsUploadingInfo(false)
      if (imageToCrop) { URL.revokeObjectURL(imageToCrop); setImageToCrop(null) }
    }
  }

  const handleAddVideo = () => {
    setMediaVideos([...mediaVideos, { title: '', youtubeId: '' }])
  }

  const handleRemoveVideo = (idx: number) => {
    setMediaVideos(mediaVideos.filter((_, i) => i !== idx))
  }

  const handleSaveMedia = async () => {
    if (!mediaProcedure) return
    setSavingMedia(true)
    setError(null)
    try {
      const validVideos = mediaVideos.filter(v => v.youtubeId.trim())
      const res = await fetch(`/api/admin/procedures/${mediaProcedure.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          infoImage: mediaInfoImage || null,
          videos: validVideos.length > 0 ? validVideos : null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess('Contenido actualizado')
      setShowMediaModal(false)
      fetchProcedures()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally { setSavingMedia(false) }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Procedimientos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona los procedimientos disponibles para reservas
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Procedimiento
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

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar procedimiento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            <p className="text-gray-500 mt-2">Cargando...</p>
          </div>
        ) : procedures.length === 0 ? (
          <div className="p-12 text-center">
            <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron procedimientos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Procedimiento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Orden
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {procedures.map((procedure) => (
                  <tr key={procedure.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-dark">{procedure.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-gray-500">{procedure.slug}</span>
                          {procedure.infoImage && (
                            <span title="Tiene imagen" className="text-green-500"><ImageIcon className="w-3.5 h-3.5" /></span>
                          )}
                          {procedure.videos && Array.isArray(procedure.videos) && procedure.videos.length > 0 && (
                            <span title={`${procedure.videos.length} video(s)`} className="text-red-500"><Youtube className="w-3.5 h-3.5" /></span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {procedure.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          procedure.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {procedure.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Activo
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Inactivo
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{procedure.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActionMenuOpen(actionMenuOpen === procedure.id ? null : procedure.id)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        <AnimatePresence>
                          {actionMenuOpen === procedure.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <button
                                onClick={() => handleEdit(procedure)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" /> Editar
                              </button>
                              <button
                                onClick={() => handleOpenMedia(procedure)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <ImageIcon className="w-4 h-4" /> Contenido
                              </button>
                              <button
                                onClick={() => handleToggleActive(procedure)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                {procedure.isActive ? (
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
                                onClick={() => handleDelete(procedure)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" /> Eliminar
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de creación/edición */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-dark mb-4">
                {editingProcedure ? 'Editar Procedimiento' : 'Nuevo Procedimiento'}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: editingProcedure ? formData.slug : generateSlug(e.target.value),
                      })
                    }}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug {editingProcedure && <span className="text-gray-400 font-normal">(no editable)</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => !editingProcedure && setFormData({ ...formData, slug: e.target.value })}
                    className={`w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm ${
                      editingProcedure
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed'
                        : 'focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none'
                    }`}
                    pattern="[a-z0-9-]+"
                    required
                    readOnly={!!editingProcedure}
                  />
                  {!editingProcedure && (
                    <p className="text-xs text-gray-400 mt-1">Se genera automáticamente desde el nombre</p>
                  )}
                </div>

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
                    {editingProcedure ? 'Guardar' : 'Crear'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Modal de Contenido / Media ── */}
      <AnimatePresence>
        {showMediaModal && mediaProcedure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto"
            onClick={() => setShowMediaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-dark">Contenido</h2>
                  <p className="text-sm text-gray-500">{mediaProcedure.name}</p>
                </div>
                <button onClick={() => setShowMediaModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                {/* ── Imagen "¿Qué es?" ── */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen &quot;¿Qué es?&quot;
                  </label>
                  <p className="text-xs text-gray-400 mb-2">Se muestra en la sección informativa del procedimiento</p>
                  {mediaInfoImage ? (
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <div className="relative h-40">
                        <Image src={mediaInfoImage} alt="Info" fill className="object-cover" />
                      </div>
                      <div className="flex gap-1.5 p-1.5">
                        <label className="flex-1 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            ref={infoImageRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMediaImageSelect(f) }}
                            className="hidden"
                          />
                          {isUploadingInfo ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Crop className="w-3.5 h-3.5" />}
                          Cambiar
                        </label>
                        <button
                          type="button"
                          onClick={() => setMediaInfoImage('')}
                          className="px-2 text-red-500 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <input
                        ref={infoImageRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleMediaImageSelect(f) }}
                        className="hidden"
                      />
                      {isUploadingInfo ? (
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      ) : (
                        <>
                          <Crop className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500 font-medium">Subir imagen</span>
                          <span className="text-xs text-gray-400">Si no se sube, se usa la imagen por defecto</span>
                        </>
                      )}
                    </label>
                  )}
                </div>

                {/* ── Videos ── */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Videos de YouTube
                    </label>
                    <button
                      type="button"
                      onClick={handleAddVideo}
                      className="text-xs text-primary font-medium hover:text-primary/80 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agregar
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Si no se agregan, se usan los videos por defecto</p>

                  {mediaVideos.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
                      Sin videos personalizados
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {mediaVideos.map((video, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              placeholder="Título del video"
                              value={video.title}
                              onChange={(e) => {
                                const updated = [...mediaVideos]
                                updated[idx] = { ...updated[idx], title: e.target.value }
                                setMediaVideos(updated)
                              }}
                              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                            <input
                              type="text"
                              placeholder="ID de YouTube (ej: dQw4w9WgXcQ)"
                              value={video.youtubeId}
                              onChange={(e) => {
                                const updated = [...mediaVideos]
                                updated[idx] = { ...updated[idx], youtubeId: e.target.value }
                                setMediaVideos(updated)
                              }}
                              className="w-full px-3 py-1.5 text-sm font-mono border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(idx)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMediaModal(false)}
                    className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveMedia}
                    disabled={savingMedia || isUploadingInfo}
                    className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {savingMedia && <Loader2 className="w-4 h-4 animate-spin" />}
                    Guardar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de recorte */}
      {imageToCrop && (
        <ImageCropper
          isOpen={cropperOpen}
          imageSrc={imageToCrop}
          onClose={() => { setCropperOpen(false); if (imageToCrop) { URL.revokeObjectURL(imageToCrop); setImageToCrop(null) } }}
          onCropComplete={handleMediaCropped}
          aspectRatio={1}
          title="Recortar imagen ¿Qué es?"
          lockAspectRatio={true}
          aspectRatioLabel="Cuadrada 1:1"
        />
      )}
    </div>
  )
}
