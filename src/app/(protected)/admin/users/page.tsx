'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Search,
  Filter,
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  UserCheck,
  UserX,
  Clock,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  RefreshCw,
  AlertCircle,
  FileDown,
} from 'lucide-react'
import { generateUsersPDF } from '@/lib/pdf-generator'
import { generateUsersExcel } from '@/lib/excel-generator'
import { FileSpreadsheet } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  image: string | null
  role: 'PATIENT' | 'ADMIN'
  status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED'
  emailVerified: string | null
  lastLoginAt: string | null
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const statusConfig = {
  ACTIVE: { label: 'Activo', color: 'bg-green-100 text-green-700', icon: UserCheck },
  PENDING_VERIFICATION: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  SUSPENDED: { label: 'Suspendido', color: 'bg-red-100 text-red-700', icon: UserX },
}

const roleConfig = {
  PATIENT: { label: 'Paciente', color: 'bg-blue-100 text-blue-700' },
  ADMIN: { label: 'Admin', color: 'bg-purple-100 text-purple-700' },
}

export default function UsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [exportPdfLoading, setExportPdfLoading] = useState(false)
  const [exportExcelLoading, setExportExcelLoading] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      if (statusFilter) params.set('status', statusFilter)
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)

      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()

      if (res.ok) {
        setUsers(data.users)
        setPagination(data.pagination)
      } else {
        setError(data.error || 'Error al cargar usuarios')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, search, roleFilter, statusFilter, dateFrom, dateTo])

  const handleExportPDF = async () => {
    setExportPdfLoading(true)
    try {
      // Fetch all users without pagination for PDF
      const params = new URLSearchParams({ limit: '1000' })
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      if (statusFilter) params.set('status', statusFilter)
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)

      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()

      if (res.ok) {
        const dateRange = dateFrom && dateTo
          ? { from: new Date(dateFrom), to: new Date(dateTo) }
          : undefined
        generateUsersPDF(data.users, dateRange)
      } else {
        setError(data.error || 'Error al exportar')
      }
    } catch {
      setError('Error al generar PDF')
    } finally {
      setExportPdfLoading(false)
    }
  }

  const handleExportExcel = async () => {
    setExportExcelLoading(true)
    try {
      // Fetch all users without pagination for Excel
      const params = new URLSearchParams({ limit: '1000' })
      if (search) params.set('search', search)
      if (roleFilter) params.set('role', roleFilter)
      if (statusFilter) params.set('status', statusFilter)
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)

      const res = await fetch(`/api/admin/users?${params}`)
      const data = await res.json()

      if (res.ok) {
        const dateRange = dateFrom && dateTo
          ? { from: new Date(dateFrom), to: new Date(dateTo) }
          : undefined
        await generateUsersExcel(data.users, dateRange)
      } else {
        setError(data.error || 'Error al exportar')
      }
    } catch {
      setError('Error al generar Excel')
    } finally {
      setExportExcelLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleStatusChange = async (userId: string, newStatus: string) => {
    setActionLoading(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        fetchUsers()
      } else {
        const data = await res.json()
        setError(data.error || 'Error al actualizar')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setActionLoading(null)
      setActionMenuOpen(null)
    }
  }

  const handleDelete = async (userId: string) => {
    setActionLoading(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchUsers()
      } else {
        const data = await res.json()
        setError(data.error || 'Error al eliminar')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setActionLoading(null)
      setDeleteConfirm(null)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="container-custom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-800">
                Gestión de Usuarios
              </h1>
              <p className="text-gray-500 text-sm">
                {pagination.total} usuarios registrados
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              disabled={exportExcelLoading || users.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet className={`w-4 h-4 ${exportExcelLoading ? 'animate-pulse' : ''}`} />
              Excel
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exportPdfLoading || users.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileDown className={`w-4 h-4 ${exportPdfLoading ? 'animate-pulse' : ''}`} />
              PDF
            </button>
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </motion.div>
      )}

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"
      >
        <form onSubmit={handleSearch} className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showFilters || roleFilter || statusFilter
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-gray-100 flex gap-4 flex-wrap"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">Rol</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="">Todos</option>
                <option value="PATIENT">Paciente</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              >
                <option value="">Todos</option>
                <option value="ACTIVE">Activo</option>
                <option value="PENDING_VERIFICATION">Pendiente</option>
                <option value="SUSPENDED">Suspendido</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setRoleFilter('')
                setStatusFilter('')
                setDateFrom('')
                setDateTo('')
              }}
              className="self-end px-4 py-2 text-gray-600 hover:text-primary transition-colors"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No se encontraron usuarios</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Usuario</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Contacto</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Rol</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Estado</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Registro</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const StatusIcon = statusConfig[user.status].icon
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt={user.name || ''}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-500 font-medium">
                                {(user.name || user.email)[0].toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {user.name || 'Sin nombre'}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Mail className="w-3.5 h-3.5" />
                            {user.emailVerified ? (
                              <span className="text-green-600">Verificado</span>
                            ) : (
                              <span className="text-yellow-600">No verificado</span>
                            )}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                              <Phone className="w-3.5 h-3.5" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            roleConfig[user.role].color
                          }`}
                        >
                          {user.role === 'ADMIN' && <Shield className="w-3 h-3" />}
                          {roleConfig[user.role].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.id === session?.user?.id ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              statusConfig[user.status].color
                            }`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig[user.status].label}
                          </span>
                        ) : (
                          <select
                            value={user.status}
                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                            disabled={actionLoading === user.id}
                            className={`px-2 py-1 rounded-lg text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-primary/20 outline-none ${
                              statusConfig[user.status].color
                            } ${actionLoading === user.id ? 'opacity-50' : ''}`}
                          >
                            <option value="ACTIVE" className="bg-white text-gray-800">Activo</option>
                            <option value="PENDING_VERIFICATION" className="bg-white text-gray-800">Pendiente</option>
                            <option value="SUSPENDED" className="bg-white text-gray-800">Suspendido</option>
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setActionMenuOpen(
                                actionMenuOpen === user.id ? null : user.id
                              )
                            }
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            disabled={actionLoading === user.id}
                          >
                            {actionLoading === user.id ? (
                              <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                            ) : (
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            )}
                          </button>

                          {/* Action Menu */}
                          {actionMenuOpen === user.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                            >
                              <Link
                                href={`/admin/users/${user.id}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit className="w-4 h-4" />
                                Editar usuario
                              </Link>
                              {user.id !== session?.user?.id && (
                                <button
                                  onClick={() => setDeleteConfirm(user.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Eliminar usuario
                                </button>
                              )}
                            </motion.div>
                          )}

                          {/* Delete Confirmation */}
                          {deleteConfirm === user.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                              onClick={() => setDeleteConfirm(null)}
                            >
                              <motion.div
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                className="bg-white rounded-xl p-6 max-w-sm mx-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                  Confirmar eliminación
                                </h3>
                                <p className="text-gray-600 mb-4">
                                  ¿Estás seguro de que deseas eliminar a{' '}
                                  <strong>{user.name || user.email}</strong>?
                                  Esta acción no se puede deshacer.
                                </p>
                                <div className="flex gap-3 justify-end">
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    onClick={() => handleDelete(user.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Mostrando {(pagination.page - 1) * pagination.limit + 1} -{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
              {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                disabled={pagination.page === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <button
                onClick={() =>
                  setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                }
                disabled={pagination.page === pagination.totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}