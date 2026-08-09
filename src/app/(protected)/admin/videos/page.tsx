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
  Youtube,
  Eye,
  Star,
  MoreVertical,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string
  youtubeId: string
  category: string
  views: string
  isFeatured: boolean
  order: number
  isActive: boolean
  createdAt: string
}

const CATEGORIES = [
  { value: 'facial', label: 'Facial' },
  { value: 'corporal', label: 'Corporal' },
  { value: 'estetica', label: 'Estética' },
  { value: 'reconstructiva', label: 'Reconstructiva' },
]

const categoryLabel = (value: string) =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Filtro
  const [filterCategory, setFilterCategory] = useState('')

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    youtubeId: '',
    description: '',
    category: 'facial',
    views: '',
    order: 0,
    isFeatured: false,
    isActive: true,
  })
  const [saving, setSaving] = useState(false)

  // Menu de acciones
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)

  // Cargar datos
  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true)
      const params = filterCategory ? `?category=${filterCategory}` : ''
      const res = await fetch(`/api/admin/videos${params}`)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setVideos(data.videos)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar videos')
    } finally {
      setLoading(false)
    }
  }, [filterCategory])

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos])

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingVideo(null)
    setFormData({
      title: '',
      youtubeId: '',
      description: '',
      category: 'facial',
      views: '',
      order: videos.length + 1,
      isFeatured: false,
      isActive: true,
    })
    setShowModal(true)
  }

  // Abrir modal para editar
  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      youtubeId: video.youtubeId,
      description: video.description || '',
      category: video.category,
      views: video.views || '',
      order: video.order,
      isFeatured: video.isFeatured,
      isActive: video.isActive,
    })
    setShowModal(true)
    setActionMenuOpen(null)
  }

  // Guardar video
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const url = editingVideo
        ? `/api/admin/videos/${editingVideo.id}`
        : '/api/admin/videos'
      const method = editingVideo ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      setSuccess(editingVideo ? 'Video actualizado' : 'Video creado')
      setShowModal(false)
      fetchVideos()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  // Cambiar estado activo/inactivo
  const handleToggleActive = async (video: Video) => {
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !video.isActive }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchVideos()
      setSuccess(`Video ${video.isActive ? 'desactivado' : 'activado'}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
    setActionMenuOpen(null)
  }

  // Cambiar destacado
  const handleToggleFeatured = async (video: Video) => {
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !video.isFeatured }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchVideos()
      setSuccess(`Video ${video.isFeatured ? 'quitado de' : 'marcado como'} destacado`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
    setActionMenuOpen(null)
  }

  // Cambiar orden
  const handleChangeOrder = async (video: Video, direction: 'up' | 'down') => {
    const newOrder = direction === 'up' ? video.order - 1 : video.order + 1
    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reordenar')
    }
    setActionMenuOpen(null)
  }

  // Eliminar video
  const handleDelete = async (video: Video) => {
    if (!confirm(`¿Eliminar "${video.title}"? Esta acción no se puede deshacer.`)) return

    try {
      const res = await fetch(`/api/admin/videos/${video.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      fetchVideos()
      setSuccess('Video eliminado')
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
          <h1 className="text-2xl font-bold text-dark">Videos</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona los videos de YouTube del sitio
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Video
        </button>
      </div>

      {/* Filtro por categoría */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-700">Categoría:</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        >
          <option value="">Todas</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
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

      {/* Tabla de videos */}
      {loading ? (
        <div className="p-12 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-gray-500 mt-2">Cargando...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-gray-100">
          <Youtube className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hay videos</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Video</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Categoría</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Vistas</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Orden</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Destacado</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <motion.tr
                    key={video.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Thumbnail + título */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/default.jpg`}
                          alt={video.title}
                          className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-dark truncate">{video.title}</p>
                          <p className="text-xs text-gray-400 truncate">{video.youtubeId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {categoryLabel(video.category)}
                      </span>
                    </td>

                    {/* Vistas */}
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-gray-600">
                        <Eye className="w-3.5 h-3.5" />
                        {video.views || '0'}
                      </span>
                    </td>

                    {/* Orden */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleChangeOrder(video, 'up')}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Subir"
                        >
                          <ArrowUp className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <span className="text-gray-600 font-medium w-6 text-center">
                          {video.order}
                        </span>
                        <button
                          onClick={() => handleChangeOrder(video, 'down')}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Bajar"
                        >
                          <ArrowDown className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </div>
                    </td>

                    {/* Destacado */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleFeatured(video)}
                        className="inline-flex items-center justify-center"
                        title={video.isFeatured ? 'Quitar destacado' : 'Marcar como destacado'}
                      >
                        <Star
                          className={`w-5 h-5 transition-colors ${
                            video.isFeatured
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          video.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {video.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setActionMenuOpen(actionMenuOpen === video.id ? null : video.id)
                          }
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        <AnimatePresence>
                          {actionMenuOpen === video.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <button
                                onClick={() => handleEdit(video)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit2 className="w-4 h-4" /> Editar
                              </button>
                              <button
                                onClick={() => handleToggleActive(video)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                {video.isActive ? (
                                  <>
                                    <XCircle className="w-4 h-4" /> Desactivar
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4" /> Activar
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleToggleFeatured(video)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Star className="w-4 h-4" />
                                {video.isFeatured ? 'Quitar destacado' : 'Destacar'}
                              </button>
                              <hr className="my-1" />
                              <button
                                onClick={() => handleDelete(video)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" /> Eliminar
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-dark mb-4">
                {editingVideo ? 'Editar Video' : 'Nuevo Video'}
              </h2>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube ID *
                  </label>
                  <input
                    type="text"
                    value={formData.youtubeId}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeId: e.target.value })
                    }
                    placeholder="ej: dQw4w9WgXcQ"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
                  />
                  {formData.youtubeId && (
                    <div className="mt-2">
                      <img
                        src={`https://img.youtube.com/vi/${formData.youtubeId}/mqdefault.jpg`}
                        alt="Vista previa"
                        className="w-40 h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vistas
                    </label>
                    <input
                      type="text"
                      value={formData.views}
                      onChange={(e) =>
                        setFormData({ ...formData, views: e.target.value })
                      }
                      placeholder="ej: 1.2K"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Orden
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">Destacado</span>
                  </label>
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
                    {editingVideo ? 'Guardar' : 'Crear'}
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
