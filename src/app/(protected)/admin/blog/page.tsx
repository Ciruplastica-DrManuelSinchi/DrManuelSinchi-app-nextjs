'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ExternalLink,
  Calendar,
  Clock,
  X,
  ImageIcon,
} from 'lucide-react'

const RichTextEditor = dynamic(
  () => import('@/app/components/admin/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="border border-gray-200 rounded-xl p-4 animate-pulse">
        <div className="h-10 bg-gray-100 rounded mb-3"></div>
        <div className="h-64 bg-gray-50 rounded"></div>
      </div>
    )
  }
)

interface Category {
  id: string
  name: string
  slug: string
  color: string | null
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  views: number
  readingTime: number | null
  publishedAt: string | null
  createdAt: string
  category: Category | null
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  DRAFT: { label: 'Borrador', color: 'bg-gray-100 text-gray-700' },
  PUBLISHED: { label: 'Publicado', color: 'bg-green-100 text-green-700' },
  ARCHIVED: { label: 'Archivado', color: 'bg-amber-100 text-amber-700' },
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    coverImageHeight: 400,
    categoryId: '',
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
  })

  const fetchPosts = useCallback(async () => {
    try {
      const params = new URLSearchParams({ admin: 'true' })
      if (statusFilter) params.set('status', statusFilter)

      const response = await fetch(`/api/blog/posts?${params}`)
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [fetchPosts])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title)
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      coverImageHeight: 400,
      categoryId: '',
      status: 'DRAFT',
    })
    setEditingPost(null)
  }

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: '',
        coverImage: post.coverImage || '',
        coverImageHeight: 400,
        categoryId: post.category?.id || '',
        status: post.status,
      })
      fetch(`/api/blog/posts/${post.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.post) {
            setFormData(prev => ({
              ...prev,
              content: data.post.content,
            }))
          }
        })
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5MB')
      return
    }

    setIsUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await response.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, coverImage: data.url }))
      } else {
        alert(data.error || 'Error al subir imagen')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir imagen')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const url = editingPost
        ? `/api/blog/posts/${editingPost.id}`
        : '/api/blog/posts'
      const method = editingPost ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          coverImage: formData.coverImage,
          categoryId: formData.categoryId,
          status: formData.status,
        }),
      })

      if (response.ok) {
        setShowModal(false)
        resetForm()
        fetchPosts()
      } else {
        const data = await response.json()
        alert(data.error || 'Error al guardar')
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error al guardar')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`¿Eliminar "${post.title}"?`)) return

    try {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
      } else {
        alert('Error al eliminar')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const toggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'

    try {
      const response = await fetch(`/api/blog/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (date: string | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const selectedCategory = categories.find(c => c.id === formData.categoryId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Blog</h1>
          <p className="text-gray-500">Administra los artículos del blog</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo Artículo
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="DRAFT">Borradores</option>
          <option value="PUBLISHED">Publicados</option>
          <option value="ARCHIVED">Archivados</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay artículos</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Artículo</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Categoría</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Estado</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-gray-600">Vistas</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Fecha</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.map((post) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-medium text-dark">{post.title}</span>
                        <p className="text-sm text-gray-500">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.category ? (
                      <span
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${post.category.color}20` || '#f3f4f6',
                          color: post.category.color || '#6b7280'
                        }}
                      >
                        {post.category.name}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${STATUS_LABELS[post.status].color}`}>
                      {STATUS_LABELS[post.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{post.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publishedAt || post.createdAt)}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(post)}
                        className={`p-2 rounded-lg transition-colors ${
                          post.status === 'PUBLISHED'
                            ? 'text-green-600 bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title={post.status === 'PUBLISHED' ? 'Despublicar' : 'Publicar'}
                      >
                        {post.status === 'PUBLISHED' ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      {post.status === 'PUBLISHED' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Ver en sitio"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => openModal(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal con vista previa */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-7xl h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <h2 className="text-xl font-bold text-dark">
                  {editingPost ? 'Editar Artículo' : 'Nuevo Artículo'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Editor - Lado izquierdo */}
                <div className="w-[45%] border-r border-gray-200 overflow-y-auto p-6">
                  <form id="blog-form" onSubmit={handleSubmit} className="space-y-5">
                    {/* Título */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        placeholder="Título del artículo"
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL
                      </label>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm mr-2">/blog/</span>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Categoría */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoría *
                        </label>
                        <select
                          value={formData.categoryId}
                          onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          required
                        >
                          <option value="">Seleccionar...</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Estado */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estado
                        </label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        >
                          <option value="DRAFT">Borrador</option>
                          <option value="PUBLISHED">Publicado</option>
                          <option value="ARCHIVED">Archivado</option>
                        </select>
                      </div>
                    </div>

                    {/* Imagen de portada */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagen de portada
                      </label>
                      <div className="space-y-3">
                        {formData.coverImage ? (
                          <div className="relative rounded-xl overflow-hidden border border-gray-200">
                            <div
                              className="relative w-full bg-gray-100"
                              style={{ height: `${formData.coverImageHeight}px` }}
                            >
                              <Image
                                src={formData.coverImage}
                                alt="Portada"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            {isUploading ? (
                              <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            ) : (
                              <>
                                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Haz clic para subir una imagen</span>
                                <span className="text-xs text-gray-400 mt-1">Máximo 5MB (JPG, PNG, WebP, GIF)</span>
                              </>
                            )}
                          </label>
                        )}

                        {formData.coverImage && (
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              Alto de imagen: {formData.coverImageHeight}px
                            </label>
                            <input
                              type="range"
                              min="200"
                              max="600"
                              value={formData.coverImageHeight}
                              onChange={(e) => setFormData(prev => ({ ...prev, coverImageHeight: parseInt(e.target.value) }))}
                              className="w-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Extracto */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Extracto *
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                        placeholder="Breve descripción del artículo..."
                        required
                      />
                    </div>

                    {/* Contenido */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contenido *
                      </label>
                      <RichTextEditor
                        content={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        placeholder="Escribe el contenido del artículo..."
                      />
                    </div>
                  </form>
                </div>

                {/* Vista previa - Lado derecho */}
                <div className="w-[55%] bg-gray-50 overflow-y-auto">
                  <div className="p-4 bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      Vista previa
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Preview del blog */}
                    <article className="bg-white rounded-2xl shadow-card overflow-hidden max-w-3xl mx-auto">
                      {/* Imagen de portada */}
                      {formData.coverImage ? (
                        <div
                          className="relative w-full"
                          style={{ height: `${formData.coverImageHeight}px` }}
                        >
                          <Image
                            src={formData.coverImage}
                            alt=""
                            fill
                            className="object-cover"
                          />
                          {selectedCategory && (
                            <div className="absolute top-4 left-4">
                              <span
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: selectedCategory.color || '#391142' }}
                              >
                                {selectedCategory.name}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-300" />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Categoría (si no hay imagen) */}
                        {!formData.coverImage && selectedCategory && (
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                            style={{
                              backgroundColor: `${selectedCategory.color}20`,
                              color: selectedCategory.color || '#391142'
                            }}
                          >
                            {selectedCategory.name}
                          </span>
                        )}

                        {/* Título */}
                        <h1 className="text-2xl font-bold text-dark mb-3">
                          {formData.title || 'Título del artículo'}
                        </h1>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date().toLocaleDateString('es-PE', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {Math.ceil((formData.content.replace(/<[^>]*>/g, '').length || 0) / 1000)} min de lectura
                          </span>
                        </div>

                        {/* Extracto */}
                        {formData.excerpt && (
                          <p className="text-gray-600 mb-6 font-medium border-l-4 border-primary pl-4">
                            {formData.excerpt}
                          </p>
                        )}

                        {/* Contenido */}
                        <div
                          className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-dark prose-a:text-primary prose-img:rounded-xl"
                          dangerouslySetInnerHTML={{
                            __html: formData.content || '<p class="text-gray-400">El contenido aparecerá aquí...</p>'
                          }}
                        />
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="blog-form"
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
